import { App, Plugin, PluginSettingTab } from "obsidian";
import type { SettingDefinition, SettingDefinitionItem, SettingGroupItem } from "obsidian";
import type { ThinkersSettings } from "./types";
import { t } from "./i18n";

interface SettingsTabDeps {
  getSettings: () => ThinkersSettings;
  saveSettings: () => Promise<void>;
  /** Repaints the open timer panel so a new length shows up straight away. */
  refreshTimer: () => void;
  /** Repaints the statistics panel, which the week start and the daily goal both change. */
  refreshFocus: () => void;
  samplePath: () => string;
}

/** Fields the controls show as text but keep as numbers. */
const NUMERIC_KEYS = new Set(["weekStart"]);

function readPath(settings: ThinkersSettings, key: string): unknown {
  const root = settings as unknown as Record<string, unknown>;
  const parts = key.split(".");
  let current: unknown = root;
  for (const part of parts) {
    if (typeof current !== "object" || current === null) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return NUMERIC_KEYS.has(key) ? String(current) : current;
}

function writePath(settings: ThinkersSettings, key: string, value: unknown): void {
  const root = settings as unknown as Record<string, unknown>;
  const parts = key.split(".");
  let current: Record<string, unknown> = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const next = current[parts[i]];
    if (typeof next !== "object" || next === null) return;
    current = next as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = NUMERIC_KEYS.has(key) ? Number.parseInt(String(value), 10) || 0 : value;
}

/**
 * The settings tab renders from declarative definitions, which is what Obsidian 1.13+
 * expects (and what makes the entries show up in the settings search).
 *
 * Option lists are built when the page is rendered, never at module load: a module-level
 * `t()` would run before initLocale(), which freezes the labels in whatever language
 * happened to be the default.
 */
export class ThinkersSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    plugin: Plugin,
    private deps: SettingsTabDeps,
  ) {
    super(app, plugin);
  }

  getControlValue(key: string): unknown {
    return readPath(this.deps.getSettings(), key);
  }

  setControlValue(key: string, value: unknown): void {
    writePath(this.deps.getSettings(), key, value);
    void this.deps.saveSettings();
    this.deps.refreshTimer();
    // Without this, the week start, the daily goal and the data folder only reached the
    // statistics panel after it had been closed and reopened.
    this.deps.refreshFocus();
  }

  getSettingDefinitions(): SettingDefinitionItem[] {
    return [
      this.group("settings.timerHeading", [
        this.number("settings.focusLength", "settings.focusLengthDesc", "focusMinutes", 1, 180),
        this.number("settings.shortBreak", "settings.shortBreakDesc", "shortBreakMinutes", 1, 120),
        this.number("settings.longBreak", "settings.longBreakDesc", "longBreakMinutes", 1, 240),
        this.number("settings.longBreakInterval", "settings.longBreakIntervalDesc", "longBreakInterval", 1, 12),
        this.number("settings.minSession", "settings.minSessionDesc", "minSessionSeconds", 0, 3600),
        this.number("settings.dailyGoal", "settings.dailyGoalDesc", "dailyGoalMinutes", 0, 1440),
        this.toggle("settings.autoCycle", "settings.autoCycleDesc", "autoCycle"),
        this.toggle("settings.promptFocus", "settings.promptFocusDesc", "promptAfterFocus"),
        this.dropdown("settings.defaultMode", "settings.defaultModeDesc", "defaultMode", {
          pomodoro: t("mode.pomodoro"),
          stopwatch: t("mode.stopwatch"),
        }),
      ]),

      this.group("settings.notificationsHeading", [
        this.toggle("settings.sound", "settings.soundDesc", "playSound"),
        this.toggle("settings.vibrate", "settings.vibrateDesc", "vibrate"),
        this.toggle("settings.notice", "settings.notice", "showNotice"),
      ]),

      this.group("settings.storageHeading", [
        this.text("settings.dataFolder", "settings.dataFolderDesc", "dataFolder"),
        this.dropdown("settings.weekStart", "settings.weekStartDesc", "weekStart", {
          "0": t("settings.weekStartSunday"),
          "1": t("settings.weekStartMonday"),
        }),
        this.toggle("settings.openOnStartup", "settings.openOnStartupDesc", "openOnStartup"),
      ]),

      this.group("settings.diaryHeading", [
        this.text("settings.diaryFolder", "settings.diaryFolderDesc", "dailyNotesFolder"),
        this.text("settings.diaryFormat", "settings.diaryFormatDesc", "dailyNotesFormat"),
      ]),

      this.group("settings.aboutHeading", [
        {
          name: t("settings.dataLocation"),
          desc: t("settings.dataLocationDesc", { path: this.deps.samplePath() }),
        },
      ]),
    ];
  }

  private group(headingKey: string, items: SettingGroupItem[]): SettingDefinitionItem {
    return { type: "group", heading: t(headingKey), items };
  }

  private toggle(nameKey: string, descKey: string, key: string): SettingDefinition {
    return {
      name: t(nameKey),
      desc: descKey.length > 0 ? t(descKey) : undefined,
      control: { type: "toggle", key },
    };
  }

  private text(nameKey: string, descKey: string, key: string): SettingDefinition {
    return {
      name: t(nameKey),
      desc: t(descKey),
      control: { type: "text", key },
    };
  }

  private number(nameKey: string, descKey: string, key: string, min: number, max: number): SettingDefinition {
    return {
      name: t(nameKey),
      desc: t(descKey),
      control: { type: "number", key, min, max, step: 1 },
    };
  }

  private dropdown(nameKey: string, descKey: string, key: string, options: Record<string, string>): SettingDefinition {
    return {
      name: t(nameKey),
      desc: t(descKey),
      control: { type: "dropdown", key, options },
    };
  }
}
