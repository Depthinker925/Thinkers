import type { DayRecord, FocusRecord, RestRecord } from "./types";
import { DEFAULT_REST_TAG } from "./types";

export function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function genId(): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}-${rand}`;
}

export function dateKey(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const dateKeyOf = dateKey;

export function todayKey(): string {
  return dateKey(Date.now());
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map((n) => Number.parseInt(n, 10));
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

export function isDateKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function addDays(key: string, delta: number): string {
  const d = parseDateKey(key);
  d.setDate(d.getDate() + delta);
  return dateKey(d.getTime());
}

export function monthDays(year: number, month: number): string[] {
  const out: string[] = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    out.push(dateKey(d.getTime()));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export function weekDays(key: string, weekStart: number): string[] {
  const offset = (parseDateKey(key).getDay() - weekStart + 7) % 7;
  const first = addDays(key, -offset);
  return Array.from({ length: 7 }, (_, i) => addDays(first, i));
}

export function monthOffset(year: number, month: number, weekStart: number): number {
  return (new Date(year, month, 1).getDay() - weekStart + 7) % 7;
}

export function clock(ms: number): string {
  const d = new Date(ms);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatClock(totalSec: number): string {
  const t = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function formatDuration(totalSec: number): string {
  const t = Math.max(0, Math.floor(totalSec));
  if (t < 60) return `${t}s`;
  const h = Math.floor(t / 3600);
  const m = Math.round((t % 3600) / 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function toMinutes(totalSec: number): number {
  return Math.round(totalSec / 60);
}

export function dateAtMinutes(key: string, minutes: number): number {
  const d = parseDateKey(key);
  d.setMinutes(minutes);
  return d.getTime();
}

export function sumFocusDuration(records: DayRecord[]): number {
  return records.reduce((sum, r) => (r.kind === "focus" ? sum + r.durationSec : sum), 0);
}

export function sumRestDuration(records: DayRecord[]): number {
  return records.reduce((sum, r) => (r.kind === "rest" && !r.deleted ? sum + r.durationSec : sum), 0);
}

export function focusRecords(records: DayRecord[]): FocusRecord[] {
  return records.filter((r): r is FocusRecord => r.kind === "focus");
}

/** Live rest records. Tombstones stay out of every total and every list. */
export function restRecords(records: DayRecord[]): RestRecord[] {
  return records.filter((r): r is RestRecord => r.kind === "rest" && !r.deleted);
}

/** Every rest record, tombstones included — only the sync pass needs these. */
function allRestRecords(records: DayRecord[]): RestRecord[] {
  return records.filter((r): r is RestRecord => r.kind === "rest");
}

/** What the calendar lists and counts: records that were not deleted. */
export function visibleRecords(records: DayRecord[]): DayRecord[] {
  return records.filter((r) => !(r.kind === "rest" && r.deleted));
}

/**
 * Delete one record.
 *
 * A focus record is dropped outright. A rest record only gets flagged, because the gap it
 * fills is recomputed from the focus sessions on every write: drop it and the next sync
 * would put it straight back, which is exactly why deleting rest time used to do nothing.
 */
export function removeRecord(records: DayRecord[], id: string): DayRecord[] {
  const target = records.find((r) => r.id === id);
  if (!target) return records;
  if (target.kind !== "rest") return records.filter((r) => r.id !== id);
  const tombstone: RestRecord = { ...target, deleted: true, updatedAt: Date.now() };
  return records.map((r) => (r.id === id ? tombstone : r));
}

export function sortRecords(records: DayRecord[]): DayRecord[] {
  return [...records].sort((a, b) => a.start - b.start);
}

/** Pomodoro sessions only: stopwatch runs are not counted as pomodoros. */
export function pomodoroRecords(records: DayRecord[]): FocusRecord[] {
  return focusRecords(records).filter((r) => r.mode === "pomodoro");
}

export function upsertRecord(records: DayRecord[], record: DayRecord): DayRecord[] {
  const idx = records.findIndex((r) => r.id === record.id);
  if (idx === -1) return [...records, record];
  const existing = records[idx];
  const chosen = record.updatedAt >= existing.updatedAt ? record : existing;
  const copy = [...records];
  copy[idx] = chosen;
  return copy;
}

export function makeRestRecord(start: number, end: number, tag: string = DEFAULT_REST_TAG): RestRecord {
  const now = Date.now();
  return {
    id: genId(),
    kind: "rest",
    tag: tag.trim().length > 0 ? tag.trim() : DEFAULT_REST_TAG,
    start,
    end,
    durationSec: Math.max(0, Math.round((end - start) / 1000)),
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Ensure every gap between two consecutive focus sessions has a rest record.
 *
 * Existing rest records are never removed or edited, so user tags survive. Deleted ones
 * count as existing: their gap is already accounted for, so it is not filled in again.
 */
export function syncRestRecords(records: DayRecord[]): DayRecord[] {
  const focus = focusRecords(records).sort((a, b) => a.start - b.start);
  const rest = allRestRecords(records);
  const out: DayRecord[] = [...focus, ...rest];

  for (let i = 0; i < focus.length - 1; i++) {
    const start = focus[i].end;
    const end = focus[i + 1].start;
    if (end <= start) continue;
    const exists = out.some((r) => r.kind === "rest" && r.start === start && r.end === end);
    if (!exists) out.push(makeRestRecord(start, end));
  }

  return sortRecords(out);
}
