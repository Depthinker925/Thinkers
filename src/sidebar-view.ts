import { ItemView, WorkspaceLeaf } from "obsidian";
import type { ThinkersSettings } from "./types";
import type { TimerEngine } from "./engine";
import { TimerPanel } from "./timer-panel";
import { t } from "./i18n";

/** The timer panel. */
export const TIMER_VIEW_TYPE = "thinkers-timer-view";
/**
 * The names this panel answered to before the plugin was renamed — the 3.x timer and the
 * single merged panel from 1.x. Both stay registered so a sidebar tab that was saved back
 * then still resolves to a live view instead of coming up empty.
 */
export const LEGACY_TIMER_VIEW_TYPES = ["depthinker-timer-view", "depthinker-sidebar-view"];
export const TIMER_VIEW_TYPES = [TIMER_VIEW_TYPE, ...LEGACY_TIMER_VIEW_TYPES];

export interface SidebarDeps {
  engine: TimerEngine;
  getSettings: () => ThinkersSettings;
}

/**
 * The timer, on its own, in the right sidebar.
 *
 * A circle with the time in the middle and the mode written small underneath. There is no
 * button: pressing the time starts a session, pressing it again ends one.
 */
export class TimerSidebarView extends ItemView {
  private timerPanel: TimerPanel | null = null;

  constructor(
    leaf: WorkspaceLeaf,
    private deps: SidebarDeps,
  ) {
    super(leaf);
  }

  getViewType(): string {
    return TIMER_VIEW_TYPE;
  }

  getDisplayText(): string {
    return t("view.timer");
  }

  getIcon(): string {
    return "timer";
  }

  async onOpen(): Promise<void> {
    this.build();
  }

  /** Full rebuild — used when a setting that changes the panel changes. */
  refresh(): void {
    this.build();
  }

  /** Only the numbers change while the clock runs. */
  refreshTimer(): void {
    this.timerPanel?.refresh();
  }

  onTick(): void {
    this.timerPanel?.onTick();
  }

  async onClose(): Promise<void> {
    this.timerPanel = null;
    this.containerEl.empty();
  }

  private build(): void {
    const root = this.containerEl;
    root.empty();
    root.addClass("thinkers-sidebar-view");

    const section = root.createDiv({ cls: "thinkers-sidebar-section" });
    const body = section.createDiv({ cls: "thinkers-sidebar-body" });
    this.timerPanel = new TimerPanel(body, {
      engine: this.deps.engine,
      getSettings: this.deps.getSettings,
    });
    this.timerPanel.refresh();
  }
}
