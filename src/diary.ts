import { App, normalizePath, TFile } from "obsidian";
import type { ThinkersSettings } from "./types";
import { currentLocale } from "./i18n";
import { parseDateKey } from "./utils";

export interface DailyNotesConfig {
  folder: string;
  format: string;
  template: string;
}

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

/** Resolve the daily notes folder/format, preferring user settings then the core plugin config. */
export async function loadDailyNotesConfig(app: App, settings: ThinkersSettings): Promise<DailyNotesConfig> {
  let folder = settings.dailyNotesFolder.trim();
  let format = settings.dailyNotesFormat.trim();
  let template = "";

  try {
    const raw = await app.vault.adapter.read(`${app.vault.configDir}/daily-notes.json`);
    const cfg = JSON.parse(raw) as { folder?: string; format?: string; template?: string };
    if (folder.length === 0) folder = cfg.folder ?? "";
    if (format.length === 0) format = cfg.format ?? "YYYY-MM-DD";
    template = cfg.template ?? "";
  } catch {
    if (format.length === 0) format = "YYYY-MM-DD";
  }

  return { folder: folder.replace(/^\/+|\/+$/g, ""), format, template };
}

/** Fill YYYY/MM/DD/dddd/ddd placeholders in a template string for a date. */
export function fillDateTokens(template: string, date: Date): string {
  const locale = currentLocale();
  const weekdayFull = WEEKDAY_FULL[locale][date.getDay()];
  const weekdayShort = WEEKDAY_SHORT[locale][date.getDay()];
  const map: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    MM: pad2(date.getMonth() + 1),
    M: String(date.getMonth() + 1),
    DD: pad2(date.getDate()),
    D: String(date.getDate()),
    dddd: weekdayFull,
    ddd: weekdayShort,
  };
  return template.replace(/dddd|ddd|YYYY|MM|DD|M|D/g, (m) => map[m] ?? m);
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

/** Open the daily note for a date, creating it from the core template when it is missing. */
export async function openDiaryForDate(app: App, config: DailyNotesConfig, key: string): Promise<void> {
  const path = diaryPath(config, key);
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof TFile) {
    await app.workspace.getLeaf(false).openFile(existing);
    return;
  }

  const content = await templateContent(app, config, key);
  const file = await app.vault.create(path, content);
  await app.workspace.getLeaf(false).openFile(file);
}

async function templateContent(app: App, config: DailyNotesConfig, key: string): Promise<string> {
  if (config.template.length === 0) return "";
  const templateFile = app.vault.getAbstractFileByPath(normalizePath(config.template));
  if (!(templateFile instanceof TFile)) return "";
  const raw = await app.vault.read(templateFile);
  const date = parseDateKey(key);
  return raw
    .replace(/\{\{date\}\}/g, key)
    .replace(/\{\{title\}\}/g, key)
    .replace(/\{\{time\}\}/g, new Date().toLocaleTimeString())
    .replace(/\{\{year\}\}/g, String(date.getFullYear()))
    .replace(/\{\{month\}\}/g, pad2(date.getMonth() + 1))
    .replace(/\{\{day\}\}/g, pad2(date.getDate()));
}
