import type { ThinkersSettings } from "./types";
import type { TimerEngine } from "./engine";
import { t } from "./i18n";
import { unlockAudio } from "./audio";
import { formatClock, formatDuration } from "./utils";

const RING_RADIUS = 52;
/** A full circle, so the length of the stroke is the whole circumference. */
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
/** Start the sweep at twelve o'clock instead of three. */
const RING_ROTATION = "rotate(-90 60 60)";

interface TimerPanelDeps {
  engine: TimerEngine;
  getSettings: () => ThinkersSettings;
}

/**
 * The timer panel.
 *
 * A full circle with the time in the middle, and the mode written small underneath. There
 * is no button: pressing the time starts a session, and pressing it again ends one. The
 * mode label swaps Pomodoro for stopwatch, but only while nothing runs.
 *
 * Both states render the same two elements in the same order — nothing appears or
 * disappears when a session starts, so the circle never moves.
 */
export class TimerPanel {
  private timeText: HTMLElement | null = null;
  private ringProgress: SVGElement | null = null;
  private phaseText: HTMLElement | null = null;

  constructor(
    private root: HTMLElement,
    private deps: TimerPanelDeps,
  ) {}

  refresh(): void {
    this.render();
  }

  onTick(): void {
    if (!this.deps.engine.isActive) return;
    this.updateTimerDisplay();
  }

  private render(): void {
    const panel = this.root;
    panel.empty();
    panel.addClass("thinkers-view");

    const active = this.deps.engine.isActive;
    panel.toggleClass("thinkers-idle", !active);
    panel.toggleClass("thinkers-active", active);

    this.renderGauge(panel);
    this.renderModeLabel(panel);
    // The recovery banner goes last on purpose: it only shows up on a restart with an
    // unfinished session, and putting it below the circle keeps the circle in place.
    if (this.deps.engine.hasRecovery) this.renderRecovery(panel);

    this.updateTimerDisplay();
  }

  /**
   * The circle and the clock inside it. The clock is the only control: press it to start,
   * press it again to end.
   */
  private renderGauge(panel: HTMLElement): void {
    const wrap = panel.createDiv({ cls: "thinkers-gauge" });
    const svg = createSvg("svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("class", "thinkers-ring");

    const track = createSvg("circle");
    track.setAttribute("cx", "60");
    track.setAttribute("cy", "60");
    track.setAttribute("r", String(RING_RADIUS));
    track.setAttribute("class", "thinkers-ring-track");

    const progress = createSvg("circle");
    progress.setAttribute("cx", "60");
    progress.setAttribute("cy", "60");
    progress.setAttribute("r", String(RING_RADIUS));
    progress.setAttribute("class", "thinkers-ring-progress");
    progress.setAttribute("transform", RING_ROTATION);
    progress.setAttribute("stroke-dasharray", String(RING_LENGTH));
    progress.setAttribute("stroke-dashoffset", String(RING_LENGTH));

    svg.appendChild(track);
    svg.appendChild(progress);
    wrap.appendChild(svg);

    const time = wrap.createDiv({ cls: "thinkers-time" });
    time.setAttribute("role", "button");
    time.setAttribute("tabindex", "0");
    // No title and no aria-label on purpose: both make a tooltip pop up over the digits,
    // and the clock is meant to be read, not covered.
    time.addEventListener("click", () => this.toggleSession());
    time.addEventListener("keydown", (evt: KeyboardEvent) => {
      if (evt.key === "Enter" || evt.key === " ") {
        evt.preventDefault();
        this.toggleSession();
      }
    });

    this.timeText = time;
    this.ringProgress = progress;
  }

  /** The mode, written small under the circle. Pressing it swaps the two modes. */
  private renderModeLabel(panel: HTMLElement): void {
    const wrap = panel.createDiv({ cls: "thinkers-modelabel" });
    const label = wrap.createDiv({ cls: "thinkers-phase" });
    this.phaseText = label;
    if (this.deps.engine.isActive) return;

    label.addClass("thinkers-phase-switch");
    label.setAttribute("role", "button");
    label.setAttribute("tabindex", "0");
    label.setAttribute("title", t("timer.switchMode"));
    const toggleMode = (): void => {
      const next = this.deps.engine.mode === "pomodoro" ? "stopwatch" : "pomodoro";
      this.deps.engine.setMode(next);
    };
    label.addEventListener("click", toggleMode);
    label.addEventListener("keydown", (evt: KeyboardEvent) => {
      if (evt.key === "Enter" || evt.key === " ") {
        evt.preventDefault();
        toggleMode();
      }
    });
  }

  private renderRecovery(panel: HTMLElement): void {
    const banner = panel.createDiv({ cls: "thinkers-recovery" });
    const sec = this.deps.engine.snapshot().recoverySec ?? 0;
    banner.createDiv({ cls: "thinkers-recovery-title", text: t("restore.heading") });
    banner.createDiv({
      cls: "thinkers-recovery-body",
      text: t("restore.body", { duration: formatDuration(sec) }),
    });
    const actions = banner.createDiv({ cls: "thinkers-recovery-actions" });
    this.makeButton(actions, t("restore.resume"), "thinkers-btn-primary", () => {
      unlockAudio();
      this.deps.engine.resolveRecovery("resume");
    });
    this.makeButton(actions, t("restore.save"), "", () => this.deps.engine.resolveRecovery("save"));
    this.makeButton(actions, t("restore.discard"), "thinkers-btn-danger", () => this.deps.engine.resolveRecovery("discard"));
  }

  /** Start while idle, end while a session runs. A pending recovery is answered above. */
  private toggleSession(): void {
    if (this.deps.engine.hasRecovery) return;
    if (this.deps.engine.isActive) {
      this.deps.engine.stop();
      return;
    }
    unlockAudio();
    this.deps.engine.start();
  }

  private makeButton(parent: HTMLElement, label: string, cls: string, onClick: () => void): void {
    const btn = parent.createEl("button", { cls: `thinkers-btn ${cls}`.trim() });
    btn.setText(label);
    btn.addEventListener("click", onClick);
  }

  private updateTimerDisplay(): void {
    const snapshot = this.deps.engine.snapshot();
    const value =
      snapshot.mode === "stopwatch" ? snapshot.elapsedSec : snapshot.state === "idle" ? snapshot.targetSec : snapshot.remainingSec;

    this.timeText?.setText(formatClock(value));

    if (this.ringProgress) {
      const offset = RING_LENGTH * (1 - snapshot.progress);
      this.ringProgress.setAttribute("stroke-dashoffset", String(offset));
    }

    if (this.phaseText) {
      this.phaseText.setText(snapshot.mode === "stopwatch" ? t("mode.stopwatch") : t("mode.pomodoro"));
    }
  }
}

