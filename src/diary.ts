import { App, Notice, normalizePath, TFile, TFolder } from "obsidian";
import type { ThinkersSettings } from "./types";
import { currentLocale, t } from "./i18n";
import { parseDateKey } from "./utils";
import { ensureFolder } from "./vault";

export interface DailyNotesConfig {
  folder: string;
  format: string;
  template: string;
}

/** The Daily notes core plugin's own config file, read verbatim and cached by the caller. */
export interface CoreDailyNotesConfig {
  folder: string;
  format: string;
  template: string;
}

const DEFAULT_FORMAT = "YYYY-MM-DD";

const WEEKDAY_FULL: Record<string, string[]> = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  zh: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
};

const WEEKDAY_SHORT: Record<string, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  zh: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
};

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** Read `<configDir>/daily-notes.json`. Missing or malformed reads as "not configured". */
export async function readCoreDailyNotes(app: App): Promise<CoreDailyNotesConfig> {
  const empty: CoreDailyNotesConfig = { folder: "", format: "", template: "" };
  try {
    const raw = await app.vault.adapter.read(`${app.vault.configDir}/daily-notes.json`);
    const cfg = JSON.parse(raw) as { folder?: unknown; format?: unknown; template?: unknown };
    const text = (value: unknown): string => (typeof value === "string" ? value : "");
    return { folder: text(cfg.folder), format: text(cfg.format), template: text(cfg.template) };
  } catch {
    return empty;
  }
}

/**
 * A comparable form of a folder path: case, spaces, `_`/`-` and a trailing plural "s" are
 * all ignored, per segment. `Life/Daily Note` and `life/daily-notes` normalise the same.
 */
function looseKey(path: string): string {
  return path
    .split("/")
    .filter((segment) => segment.length > 0)
    .map((segment) => segment.toLowerCase().replace(/[\s_-]+/g, "").replace(/s$/, ""))
    .join("/");
}

function hasDateTokens(value: string): boolean {
  return fillDateTokens(value, new Date()) !== value;
}

/**
 * The folder the diary notes actually live in.
 *
 * The configured folder is only a hint: it comes from Obsidian's own Daily notes plugin
 * and goes stale the moment the folder is renamed outside Obsidian (a plural "s" is
 * enough). When the configured folder is missing the closest folder that does exist wins,
 * and only when nothing matches is the configured folder returned as-is — in which case
 * {@link openDiaryForDate} creates it rather than failing.
 */
export function matchExistingFolder(app: App, folder: string): string {
  const target = normalizePath(folder);
  if (target.length === 0) return "";
  // A folder carrying date placeholders has no real path until the date is filled in, so
  // there is nothing to match against the vault.
  if (hasDateTokens(target)) return target;

  const exact = app.vault.getFolderByPath(target);
  if (exact) return exact.path;

  const wanted = looseKey(target);
  const hits = app.vault
    .getAllLoadedFiles()
    .filter((file): file is TFolder => file instanceof TFolder)
    .filter((entry) => looseKey(entry.path) === wanted)
    .sort((a, b) => a.path.length - b.path.length || (a.path < b.path ? -1 : 1));
  return hits.length > 0 ? hits[0].path : target;
}

/**
 * Merge the plugin's own overrides with the core plugin's config and resolve the folder
 * against what the vault actually holds.
 *
 * Synchronous on purpose: only reading `daily-notes.json` needs I/O, so the caller can run
 * this lazily on every render and always see the current layout.
 */
export function resolveDiaryConfig(
  app: App,
  settings: ThinkersSettings,
  core: CoreDailyNotesConfig,
): DailyNotesConfig {
  const override = settings.dailyNotesFolder.trim();
  const raw = (override.length > 0 ? override : core.folder).trim().replace(/^\/+|\/+$/g, "");
  return {
    folder: matchExistingFolder(app, raw),
    format: settings.dailyNotesFormat.trim() || core.format || DEFAULT_FORMAT,
    template: core.template,
  };
}

/** Fill YYYY/MM/DD/dddd/ddd placeholders in a template string for a date. */
export function fillDateTokens(template: string, date: Date): string {
  const locale = currentLocale();
  const map: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    MM: pad2(date.getMonth() + 1),
    M: String(date.getMonth() + 1),
    DD: pad2(date.getDate()),
    D: String(date.getDate()),
    dddd: WEEKDAY_FULL[locale][date.getDay()],
    ddd: WEEKDAY_SHORT[locale][date.getDay()],
  };

  // Two passes, in this order, so `YYYYMMDD` keeps working while a lone `M`/`D` no longer
  // eats a real letter. A bare "D" is what sits inside "Life/Daily Notes": substituting it
  // turns the folder into "Life/8aily Notes" and files the note somewhere nobody looks.
  const long = template.replace(/(dddd|ddd|YYYY|MM|DD)/g, (token) => map[token]);
  return long.replace(
    /(^|[^A-Za-z])([MD])(?![A-Za-z])/g,
    (_match, lead: string, token: string) => `${lead}${map[token]}`,
  );
}

/** Vault path of the daily note for a date key. */
export function diaryPath(config: DailyNotesConfig, key: string): string {
  const date = parseDateKey(key);
  const folder = fillDateTokens(config.folder, date);
  const name = fillDateTokens(config.format, date);
  const base = folder.length > 0 ? `${folder}/${name}` : name;
  return normalizePath(`${base}.md`);
}

export function diaryExists(app: App, config: DailyNotesConfig, key: string): boolean {
  return app.vault.getAbstractFileByPath(diaryPath(config, key)) instanceof TFile;
}

function parentPath(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx <= 0 ? "" : path.slice(0, idx);
}

/** Open the daily note for a date, creating it (and its folder) when it is missing. */
export async function openDiaryForDate(app: App, config: DailyNotesConfig, key: string): Promise<void> {
  const path = diaryPath(config, key);
  try {
    const existing = app.vault.getAbstractFileByPath(path);
    if (existing instanceof TFile) {
      await app.workspace.getLeaf(false).openFile(existing);
      return;
    }

    // `vault.create` does not create parent folders, so a diary note pointing at a folder
    // that was never made used to fail outright. Create the chain first.
    await ensureFolder(app, parentPath(path));
    const content = await templateContent(app, config, key);
    const file = await app.vault.create(path, content);
    await app.workspace.getLeaf(false).openFile(file);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    new Notice(t("notice.diaryFailed", { message }));
  }
}

/**
 * The core plugin's template path is stale just as often as its folder, so the template is
 * looked up beside the diary note it belongs to before the configured path is trusted.
 */
function findTemplate(app: App, config: DailyNotesConfig, date: Date): TFile | null {
  const folder = fillDateTokens(config.folder, date);
  const name = config.template.split("/").pop() ?? "";
  const candidates: string[] = [];
  if (folder.length > 0 && name.length > 0) candidates.push(`${folder}/${name}`);
  if (folder.length > 0) candidates.push(`${folder}/Template.md`);
  if (config.template.length > 0) candidates.push(config.template);

  for (const candidate of candidates) {
    const file = app.vault.getAbstractFileByPath(normalizePath(candidate));
    if (file instanceof TFile) return file;
  }
  return null;
}

async function templateContent(app: App, config: DailyNotesConfig, key: string): Promise<string> {
  const date = parseDateKey(key);
  const templateFile = findTemplate(app, config, date);
  if (!templateFile) return "";
  const raw = await app.vault.read(templateFile);
  return raw
    .replace(/\{\{date\}\}/g, key)
    .replace(/\{\{title\}\}/g, key)
    .replace(/\{\{time\}\}/g, new Date().toLocaleTimeString())
    .replace(/\{\{year\}\}/g, String(date.getFullYear()))
    .replace(/\{\{month\}\}/g, pad2(date.getMonth() + 1))
    .replace(/\{\{day\}\}/g, pad2(date.getDate()));
}
