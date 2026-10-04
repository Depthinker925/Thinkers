import { App, Notice, normalizePath, TFile } from "obsidian";
import type { DayRecord, ThinkersSettings } from "./types";
import { DEFAULT_FOCUS_TAG, DEFAULT_SETTINGS } from "./types";
import { t } from "./i18n";
import {
  dateKey,
  focusRecords,
  isDateKey,
  parseDateKey,
  removeRecord,
  restRecords,
  sortRecords,
  sumFocusDuration,
  sumRestDuration,
  syncRestRecords,
  toMinutes,
  todayKey,
  upsertRecord,
} from "./utils";

const CODE_FENCE = "```";
const JSON_RE = /```json\s*([\s\S]*?)```/;

interface DayCache {
  records: DayRecord[];
  mtime: number;
}

function parent(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx <= 0 ? "" : path.slice(0, idx);
}

function parseRecord(raw: unknown): DayRecord | null {
  if (typeof raw !== "object" || raw === null) return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id : null;
  const start = typeof o.start === "number" ? o.start : null;
  const end = typeof o.end === "number" ? o.end : null;
  if (id === null || start === null || end === null) return null;

  const durationSec =
    typeof o.durationSec === "number" && o.durationSec >= 0
      ? Math.round(o.durationSec)
      : Math.max(0, Math.round((end - start) / 1000));
  const createdAt = typeof o.createdAt === "number" ? o.createdAt : start;
  const updatedAt = typeof o.updatedAt === "number" ? o.updatedAt : start;

  if (o.kind === "rest") {
    const tag = typeof o.tag === "string" && o.tag.trim().length > 0 ? o.tag.trim() : "\u4F11\u606F";
    // `deleted` is a tombstone, not a record: it is what keeps a deleted break from being
    // filled in again, so it has to survive the round trip through the note.
    const deleted = o.deleted === true ? true : undefined;
    return { id, kind: "rest", tag, start, end, durationSec, createdAt, updatedAt, deleted };
  }

  const mode = o.mode === "stopwatch" ? "stopwatch" : "pomodoro";
  const phase = o.phase === "short" || o.phase === "long" ? o.phase : "focus";
  const tag = typeof o.tag === "string" && o.tag.trim().length > 0 ? o.tag.trim() : DEFAULT_FOCUS_TAG;
  return {
    id,
    kind: "focus",
    mode,
    phase: mode === "pomodoro" ? phase : undefined,
    tag,
    start,
    end,
    durationSec,
    completed: o.completed !== false,
    note: typeof o.note === "string" ? o.note : undefined,
    createdAt,
    updatedAt,
  };
}

export class DayStore {
  private cache = new Map<string, DayCache>();
  private queues = new Map<string, Promise<unknown>>();
  private lastSelfWrite = new Map<string, number>();

  constructor(
    private app: App,
    private getSettings: () => ThinkersSettings,
  ) {}

  folderPath(): string {
    const raw = this.getSettings().dataFolder.trim();
    return normalizePath(raw.length > 0 ? raw : DEFAULT_SETTINGS.dataFolder);
  }

  dayFilePath(key: string): string {
    return normalizePath(`${this.folderPath()}/${key.slice(0, 4)}/${key}.md`);
  }

  samplePath(): string {
    return this.dayFilePath(dateKey(Date.now()));
  }

  clearCache(): void {
    this.cache.clear();
  }

  /** Returns false when the change came from our own write (avoid re-render loop). */
  handleFileChange(path: string): boolean {
    const prefix = `${this.folderPath()}/`;
    if (!path.startsWith(prefix) || !path.endsWith(".md")) return false;
    const selfWrite = this.lastSelfWrite.get(path) ?? 0;
    const isSelf = Date.now() - selfWrite < 2000;
    const name = (path.split("/").pop() ?? "").slice(0, -3);
    if (isDateKey(name)) this.cache.delete(name);
    else this.cache.clear();
    return !isSelf;
  }

  async getDay(key: string): Promise<DayRecord[]> {
    const file = this.app.vault.getFileByPath(this.dayFilePath(key));
    if (!file) {
      this.cache.delete(key);
      return [];
    }
    const cached = this.cache.get(key);
    if (cached && cached.mtime === file.stat.mtime) return cached.records;
    const content = await this.app.vault.cachedRead(file);
    const parsed = this.parse(content);
    if (parsed.ok) {
      this.cache.set(key, { records: parsed.records, mtime: file.stat.mtime });
      return parsed.records;
    }
    new Notice(t("notice.parseFailed", { day: key }));
    return [];
  }

  async getDays(keys: string[]): Promise<Map<string, DayRecord[]>> {
    const entries = await Promise.all(keys.map(async (k) => [k, await this.getDay(k)] as const));
    return new Map(entries);
  }

  async addRecord(record: DayRecord): Promise<void> {
    const day = dateKey(record.start);
    await this.mutate(day, (records) => upsertRecord(records, record));
  }

  async updateRecord(previousDay: string, record: DayRecord): Promise<void> {
    const day = dateKey(record.start);
    if (day !== previousDay) {
      await this.mutate(previousDay, (records) => records.filter((r) => r.id !== record.id));
    }
    await this.mutate(day, (records) => upsertRecord(records, record));
  }

  async deleteRecord(day: string, id: string): Promise<void> {
    await this.mutate(day, (records) => removeRecord(records, id));
  }

  async getStreak(): Promise<number> {
    const today = todayKey();
    let cursor = today;
    if (sumFocusDuration(await this.getDay(today)) === 0) cursor = dateKey(parseDateKey(today).getTime() - 86400000);
    let streak = 0;
    for (let i = 0; i < 400; i++) {
      const records = await this.getDay(cursor);
      if (sumFocusDuration(records) === 0) break;
      streak++;
      cursor = dateKey(parseDateKey(cursor).getTime() - 86400000);
    }
    return streak;
  }

  private async mutate(day: string, fn: (records: DayRecord[]) => DayRecord[]): Promise<void> {
    await this.enqueue(day, async () => {
      const path = this.dayFilePath(day);
      let file = this.app.vault.getFileByPath(path);
      if (file) {
        const raw = await this.app.vault.read(file);
        if (!this.parse(raw).ok) {
          await this.backupCorrupted(file, day);
          file = null;
        }
      }
      try {
        if (!file) {
          await this.ensureFolder(parent(path));
          const records = syncRestRecords(sortRecords(fn([])));
          this.lastSelfWrite.set(path, Date.now());
          const created = await this.app.vault.create(path, this.serialize(day, records));
          this.cache.set(day, { records, mtime: created.stat.mtime });
          return;
        }
        let records: DayRecord[] = [];
        this.lastSelfWrite.set(path, Date.now());
        await this.app.vault.process(file, (raw) => {
          const parsed = this.parse(raw);
          records = syncRestRecords(sortRecords(fn(parsed.ok ? parsed.records : [])));
          return this.serialize(day, records);
        });
        this.cache.set(day, { records, mtime: file.stat.mtime });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        new Notice(t("notice.writeFailed", { message }));
        this.cache.delete(day);
        throw err;
      }
    });
  }

  private enqueue<T>(day: string, task: () => Promise<T>): Promise<T> {
    const previous = this.queues.get(day) ?? Promise.resolve();
    const next = previous.then(task, task);
    this.queues.set(day, next.catch(() => {}));
    return next;
  }

  private async ensureFolder(path: string): Promise<void> {
    if (path.length === 0) return;
    const parts = path.split("/").filter((p) => p.length > 0);
    let current = "";
    for (const part of parts) {
      current = current.length > 0 ? `${current}/${part}` : part;
      if (!this.app.vault.getFolderByPath(current)) {
        try {
          await this.app.vault.createFolder(current);
        } catch (err) {
          if (!this.app.vault.getFolderByPath(current)) throw err;
        }
      }
    }
  }

  private async backupCorrupted(file: TFile, day: string): Promise<void> {
    const stamp = String(Date.now());
    const target = normalizePath(`${parent(file.path)}/${day}.corrupted-${stamp}.md`);
    try {
      await this.app.vault.rename(file, target);
      new Notice(t("notice.corrupted", { day, file: target }));
    } catch (err) {
      new Notice(t("notice.parseFailed", { day }));
      throw err;
    }
  }

  serialize(day: string, records: DayRecord[]): string {
    const focusCount = focusRecords(records).length;
    const restCount = restRecords(records).length;
    const body = records.map((r) => `\t${JSON.stringify(r)}`).join(",\n");
    const header = [
      "---",
      "thinkers: log",
      `date: ${day}`,
      `focus-minutes: ${toMinutes(sumFocusDuration(records))}`,
      `session-count: ${focusCount}`,
      `rest-minutes: ${toMinutes(sumRestDuration(records))}`,
      `rest-count: ${restCount}`,
      "---",
    ].join("\n");
    const array = records.length > 0 ? `[\n${body}\n]` : "[]";
    return `${header}\n\n${CODE_FENCE}json\n${array}\n${CODE_FENCE}\n`;
  }

  parse(content: string): { ok: boolean; records: DayRecord[] } {
    const match = JSON_RE.exec(content);
    const body = match ? match[1] : content.trim().startsWith("[") ? content : null;
    if (body === null) return { ok: true, records: [] };
    try {
      const parsed: unknown = JSON.parse(body.trim());
      if (!Array.isArray(parsed)) return { ok: false, records: [] };
      return { ok: true, records: parsed.map(parseRecord).filter((r): r is DayRecord => r !== null) };
    } catch {
      return { ok: false, records: [] };
    }
  }
}
