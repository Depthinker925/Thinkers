import { ItemView, WorkspaceLeaf } from "obsidian";
import type { App } from "obsidian";
import type { ThinkersSettings } from "./types";
import type { DayStore } from "./storage";
import type { DailyNotesConfig } from "./diary";
import { CalendarView } from "./calendar";
import { ReportView } from "./report";
import { t } from "./i18n";

/** The focus statistics panel. */
export const FOCUS_VIEW_TYPE = "thinkers-focus-view";
/**
 * What this panel was called before the plugin was renamed. Still registered, so a sidebar
 * tab saved back then resolves to a live view instead of coming up empty.
 */
export const LEGACY_FOCUS_VIEW_TYPES = ["depthinker-focus-view"];
export const FOCUS_VIEW_TYPES = [FOCUS_VIEW_TYPE, ...LEGACY_FOCUS_VIEW_TYPES];

export interface FocusDeps {
  app: App;
  storage: DayStore;
  getSettings: () => ThinkersSettings;
  getDiaryConfig: () => DailyNotesConfig;
}

/**
 * The focus statistics, on their own in the right sidebar.
 *
 * Every widget is one the plugin already had: the current week as a bar chart, the month
 * calendar where a day shows how much was focused and opens that day's records, and the
 * focus/rest ring for whichever day is selected in that calendar.
 */
export class FocusStatsSidebarView extends ItemView {
  private report: ReportView | null = null;
  private calendar: CalendarView | null = null;

  constructor(
    leaf: WorkspaceLeaf,
    private deps: FocusDeps,
  ) {
    super(leaf);
  }

  getViewType(): string {
    return FOCUS_VIEW_TYPE;
  }

  getDisplayText(): string {
    return t("stats.title");
  }

  getIcon(): string {
    return "target";
  }

  async onOpen(): Promise<void> {
    this.build();
  }

  refresh(): void {
    this.build();
  }

  async onClose(): Promise<void> {
    this.report = null;
    this.calendar = null;
    this.containerEl.empty();
  }

  private build(): void {
    const root = this.containerEl;
    root.addClass("thinkers-sidebar-view");

    // A refresh reuses both widgets rather than rebuilding them: rebuilding threw away
    // which month the calendar was showing and which day its ring described, which made
    // changing a setting feel like the panel had been reset.
    if (this.report && this.calendar) {
      this.report.refresh();
      this.calendar.refresh();
      return;
    }

    root.empty();
    const section = root.createDiv({ cls: "thinkers-sidebar-section" });
    const body = section.createDiv({ cls: "thinkers-sidebar-body" });

    const reportBox = body.createDiv({ cls: "thinkers-report-box" });
    this.report = new ReportView(reportBox, {
      storage: this.deps.storage,
      getSettings: this.deps.getSettings,
    });
    this.report.refresh();

    const calendarBox = body.createDiv({ cls: "thinkers-calendar-box" });
    this.calendar = new CalendarView(calendarBox, {
      app: this.deps.app,
      storage: this.deps.storage,
      getSettings: this.deps.getSettings,
      getDiaryConfig: this.deps.getDiaryConfig,
      onChanged: () => this.refresh(),
    });
    this.calendar.refresh();
  }
}
