/**
 * Thinkers — the whole type surface.
 *
 * 3.0 is a timer-only plugin: the workbench, the task tree, the notes panel, the focus
 * statistics and the background counter are gone, so the settings and the data file only
 * describe the timer and the sessions it writes.
 */
export interface ThinkersSettings {
  // —— 时长 ——
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  autoCycle: boolean;
  defaultMode: "pomodoro" | "stopwatch";
  minSessionSeconds: number;
  dailyGoalMinutes: number;
  // —— 提醒 ——
  playSound: boolean;
  vibrate: boolean;
  showNotice: boolean;
  // —— 记录 ——
  dataFolder: string;
  /** Calendar week starts on Sunday (0) or Monday (1). */
  weekStart: 0 | 1;
  // —— 日记 ——
  /** Overrides the core Daily notes folder. Empty = follow the core plugin. */
  dailyNotesFolder: string;
  /** Overrides the core Daily notes date format. Empty = follow the core plugin. */
  dailyNotesFormat: string;
  // —— 启动 ——
  /** Open the timer panel in the right sidebar when Obsidian starts. */
  openOnStartup: boolean;
  // —— 记录 ——
  /** Ask what a session was about once a focus session has been saved. */
  promptAfterFocus: boolean;
}

export const DEFAULT_SETTINGS: ThinkersSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  autoCycle: true,
  defaultMode: "pomodoro",
  minSessionSeconds: 60,
  dailyGoalMinutes: 120,
  playSound: true,
  vibrate: true,
  showNotice: true,
  dataFolder: "FocusLog",
  weekStart: 1,
  dailyNotesFolder: "",
  dailyNotesFormat: "",
  openOnStartup: true,
  promptAfterFocus: true,
};

export type FocusPhase = "focus" | "short" | "long";
export type RecordMode = "stopwatch" | "pomodoro";

export interface FocusRecord {
  id: string;
  kind: "focus";
  mode: RecordMode;
  /** Only present for pomodoro records. */
  phase?: FocusPhase;
  /** What the session was about. Defaults to the generic focus tag. */
  tag: string;
  start: number;
  end: number;
  durationSec: number;
  completed: boolean;
  note?: string;
  createdAt: number;
  updatedAt: number;
}

export interface RestRecord {
  id: string;
  kind: "rest";
  tag: string;
  start: number;
  end: number;
  durationSec: number;
  note?: string;
  createdAt: number;
  updatedAt: number;
  /**
   * Tombstone. Breaks are filled in automatically from the gap between two consecutive
   * focus sessions, so a rest record that is simply dropped from the file would come
   * straight back on the next write. Deleting one keeps it here, flagged, and
   * `syncRestRecords` reads the flag as "this gap has already been accounted for".
   */
  deleted?: boolean;
}

export type DayRecord = FocusRecord | RestRecord;

export const DEFAULT_REST_TAG = "\u4F11\u606F"; // 休息
export const DEFAULT_FOCUS_TAG = "\u4E13\u6CE8"; // 专注

export interface RuntimeState {
  sessionId: string;
  mode: RecordMode;
  phase: FocusPhase;
  state: "running" | "paused";
  startedAt: number;
  accumulatedPausedMs: number;
  pausedAt: number | null;
  targetMs: number;
  pomodoroIndex: number;
}

export interface TimerSnapshot {
  state: "idle" | "running" | "paused";
  mode: RecordMode;
  phase: FocusPhase;
  elapsedSec: number;
  remainingSec: number;
  targetSec: number;
  progress: number;
  round: number;
  nextPhase: FocusPhase;
  recoverySec: number | null;
}

export interface ThinkersPluginData {
  settings: ThinkersSettings;
  /** A session that was still running when Obsidian closed, so it can be recovered. */
  runtime: RuntimeState | null;
}
