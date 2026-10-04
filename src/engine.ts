import type { ThinkersSettings, FocusPhase, FocusRecord, RecordMode, RuntimeState, TimerSnapshot } from "./types";
import { DEFAULT_FOCUS_TAG } from "./types";
import { genId } from "./utils";

export interface EngineHooks {
  onSessionRecorded(record: FocusRecord): void;
  onSessionTooShort(seconds: number): void;
  onPhaseComplete(phase: FocusPhase, next: FocusPhase, autoCycled: boolean): void;
  onStateChange(): void;
}

export class TimerEngine {
  private runtime: RuntimeState | null = null;
  private pendingPhase: FocusPhase = "focus";
  private completedFocusRounds = 0;
  private recoverySec: number | null = null;
  private selectedMode: RecordMode;

  constructor(
    private getSettings: () => ThinkersSettings,
    private hooks: EngineHooks,
  ) {
    this.selectedMode = this.getSettings().defaultMode;
  }

  get mode(): RecordMode {
    return this.runtime?.mode ?? this.selectedMode;
  }

  get isActive(): boolean {
    return this.runtime !== null;
  }

  get isRunning(): boolean {
    return this.runtime?.state === "running";
  }

  get hasRecovery(): boolean {
    return this.recoverySec !== null;
  }

  setMode(mode: RecordMode): void {
    if (this.runtime) return;
    this.selectedMode = mode;
    this.pendingPhase = "focus";
    this.hooks.onStateChange();
  }

  exportRuntime(): RuntimeState | null {
    return this.runtime;
  }

  snapshot(now = Date.now()): TimerSnapshot {
    const runtime = this.runtime;
    const phase = runtime?.phase ?? this.pendingPhase;
    const mode = this.mode;

    if (!runtime) {
      const targetMs = mode === "stopwatch" ? 0 : this.phaseDurationMs(phase);
      return {
        state: "idle",
        mode,
        phase,
        elapsedSec: 0,
        remainingSec: Math.round(targetMs / 1000),
        targetSec: Math.round(targetMs / 1000),
        progress: 0,
        round: this.completedFocusRounds + 1,
        nextPhase: this.pendingPhase,
        recoverySec: this.recoverySec,
      };
    }

    const elapsed = this.elapsedMs(now);
    const targetMs = runtime.targetMs;
    return {
      state: runtime.state,
      mode: runtime.mode,
      phase: runtime.phase,
      elapsedSec: Math.floor(elapsed / 1000),
      remainingSec: targetMs > 0 ? Math.max(0, Math.ceil((targetMs - elapsed) / 1000)) : 0,
      targetSec: Math.round(targetMs / 1000),
      progress: targetMs > 0 ? Math.min(1, elapsed / targetMs) : 0,
      round: runtime.phase === "focus" ? this.completedFocusRounds + 1 : this.completedFocusRounds,
      nextPhase: this.pendingPhase,
      recoverySec: this.recoverySec,
    };
  }

  start(phase?: FocusPhase): void {
    this.recoverySec = null;
    const mode = this.selectedMode;
    const actualPhase = mode === "stopwatch" ? "focus" : phase ?? this.pendingPhase;
    const targetMs = mode === "stopwatch" ? 0 : this.phaseDurationMs(actualPhase);
    this.runtime = {
      sessionId: genId(),
      mode,
      phase: actualPhase,
      state: "running",
      startedAt: Date.now(),
      accumulatedPausedMs: 0,
      pausedAt: null,
      targetMs,
      pomodoroIndex: this.completedFocusRounds,
    };
    this.hooks.onStateChange();
  }

  pause(): void {
    const rt = this.runtime;
    if (!rt || rt.state !== "running") return;
    rt.state = "paused";
    rt.pausedAt = Date.now();
    this.hooks.onStateChange();
  }

  resume(): void {
    const rt = this.runtime;
    if (!rt || rt.state !== "paused") return;
    if (rt.pausedAt !== null) rt.accumulatedPausedMs += Date.now() - rt.pausedAt;
    rt.pausedAt = null;
    rt.state = "running";
    this.recoverySec = null;
    this.hooks.onStateChange();
  }

  toggle(): void {
    if (!this.runtime) {
      this.start();
      return;
    }
    this.runtime.state === "running" ? this.pause() : this.resume();
  }

  stop(): void {
    const rt = this.runtime;
    if (!rt) return;
    const now = Date.now();
    const sec = Math.round(this.elapsedMs(now) / 1000);
    if (rt.mode === "stopwatch" || rt.phase === "focus") {
      this.store(rt, now, sec, rt.mode === "stopwatch");
    }
    this.runtime = null;
    this.pendingPhase = "focus";
    this.recoverySec = null;
    this.hooks.onStateChange();
  }

  reset(): void {
    this.runtime = null;
    this.pendingPhase = "focus";
    this.recoverySec = null;
    this.hooks.onStateChange();
  }

  skipBreak(): void {
    const rt = this.runtime;
    if (!rt || rt.mode !== "pomodoro" || rt.phase === "focus") return;
    this.runtime = null;
    this.pendingPhase = "focus";
    this.start("focus");
  }

  /** Returns true when a running phase completed during this tick. */
  tick(now = Date.now()): boolean {
    const rt = this.runtime;
    if (!rt || rt.state !== "running" || rt.targetMs <= 0) return false;
    if (this.elapsedMs(now) < rt.targetMs) return false;
    this.completePhase(true);
    return true;
  }

  restore(runtime: RuntimeState | null): "none" | "completed" | "pending" {
    if (!runtime) return "none";
    this.selectedMode = runtime.mode;
    this.completedFocusRounds = runtime.pomodoroIndex;
    this.runtime = runtime;
    const now = Date.now();
    if (runtime.targetMs > 0 && this.elapsedMs(now) >= runtime.targetMs) {
      this.completePhase(false);
      return "completed";
    }
    if (runtime.state === "running") {
      runtime.state = "paused";
      runtime.pausedAt = now;
      this.recoverySec = Math.round(this.elapsedMs(now) / 1000);
      this.hooks.onStateChange();
      return "pending";
    }
    this.hooks.onStateChange();
    return "none";
  }

  resolveRecovery(action: "resume" | "save" | "discard"): void {
    this.recoverySec = null;
    if (action === "resume") {
      this.resume();
    } else if (action === "save") {
      this.stop();
    } else {
      this.reset();
    }
    // Always notify. The guards inside resume/stop can return early, and every timer on
    // screen still has to drop the recovery banner.
    this.hooks.onStateChange();
  }

  dismissRecovery(): void {
    this.recoverySec = null;
  }

  private elapsedMs(now: number): number {
    const rt = this.runtime;
    if (!rt) return 0;
    const end = rt.state === "paused" && rt.pausedAt !== null ? rt.pausedAt : now;
    return Math.max(0, end - rt.startedAt - rt.accumulatedPausedMs);
  }

  private phaseDurationMs(phase: FocusPhase): number {
    const s = this.getSettings();
    const minutes = phase === "focus" ? s.focusMinutes : phase === "short" ? s.shortBreakMinutes : s.longBreakMinutes;
    return Math.max(1, Math.round(minutes * 60)) * 1000;
  }

  private completePhase(autoCycled: boolean): void {
    const rt = this.runtime;
    if (!rt) return;
    const s = this.getSettings();
    const end = rt.startedAt + rt.accumulatedPausedMs + rt.targetMs;
    const durationSec = Math.round(rt.targetMs / 1000);
    const finishedPhase = rt.phase;

    if (finishedPhase === "focus") {
      this.store(rt, end, durationSec, true);
      this.completedFocusRounds++;
    }

    let next: FocusPhase;
    if (finishedPhase === "focus") {
      const interval = Math.max(1, Math.round(s.longBreakInterval));
      next = this.completedFocusRounds % interval === 0 ? "long" : "short";
    } else {
      next = "focus";
      if (finishedPhase === "long") this.completedFocusRounds = 0;
    }

    this.runtime = null;
    this.pendingPhase = next;
    if (autoCycled && s.autoCycle) this.start(next);
    this.hooks.onPhaseComplete(finishedPhase, next, autoCycled && s.autoCycle);
    this.hooks.onStateChange();
  }

  private store(rt: RuntimeState, end: number, durationSec: number, completed: boolean): void {
    const min = Math.max(0, Math.round(this.getSettings().minSessionSeconds));
    if (durationSec < min || durationSec <= 0) {
      this.hooks.onSessionTooShort(durationSec);
      return;
    }
    const now = Date.now();
    const record: FocusRecord = {
      id: rt.sessionId,
      kind: "focus",
      mode: rt.mode,
      phase: rt.mode === "pomodoro" ? rt.phase : undefined,
      tag: DEFAULT_FOCUS_TAG,
      start: rt.startedAt,
      end,
      durationSec,
      completed,
      createdAt: now,
      updatedAt: now,
    };
    this.hooks.onSessionRecorded(record);
  }
}
