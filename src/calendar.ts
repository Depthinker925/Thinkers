import { App, Modal, setIcon } from "obsidian";
import type { DayRecord, ThinkersSettings } from "./types";
import { t, monthTitle, weekdays } from "./i18n";
import {
  clock,
  formatDuration,
  monthDays,
  monthOffset,
  pomodoroRecords,
  sortRecords,
  sumFocusDuration,
  sumRestDuration,
  todayKey,
  visibleRecords,
  weekDays,
} from "./utils";
import type { DayStore } from "./storage";
import { openDeleteConfirm, openRecordModal } from "./modal";
import type { DailyNotesConfig } from "./diary";
import { diaryPath, openDiaryForDate } from "./diary";

/** The focus/rest ring. Same trick as the timer gauge: one full circle, dash-drawn. */
const RATIO_RADIUS = 52;
const RATIO_LENGTH = 2 * Math.PI * RATIO_RADIUS;
/** Start the sweep at twelve o'clock instead of three. */
const RATIO_ROTATION = "rotate(-90 60 60)";

/** Focus : rest, written as "2.5 : 1". */
function ratioText(focusSec: number, restSec: number): string {
  if (focusSec <= 0) return "0 : 1";
  if (restSec <= 0) return "1 : 0";
  return `${(focusSec / restSec).toFixed(1)} : 1`;
}

/** Draw one arc of the ring: `share` of the circumference, starting at `from`. */
function drawArc(el: Element | null, share: number, from: number): void {
  if (!el) return;
  el.setAttribute("stroke-dasharray", `${RATIO_LENGTH * share} ${RATIO_LENGTH}`);
  el.setAttribute("stroke-dashoffset", String(-RATIO_LENGTH * from));
}

interface CalendarDeps {
  app: App;
  storage: DayStore;
  getSettings: () => ThinkersSettings;
  getDiaryConfig: () => DailyNotesConfig;
  onChanged: () => void;
}

export class CalendarView {
  private renderToken = 0;
  private year: number;
  private month: number;
  /** The day the ring below the focus/rest totals describes. Today until another is picked. */
  private selectedKey: string = todayKey();

  constructor(
    private root: HTMLElement,
    private deps: CalendarDeps,
  ) {
    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth();
  }

  refresh(): void {
    this.render();
  }

  render(): void {
    this.root.empty();
    const settings = this.deps.getSettings();
    this.renderStats();
    this.renderSplitStats();
    this.renderRatio();
    this.renderNav();
    this.renderWeekdayHeader(settings.weekStart);
    this.renderGrid(settings.weekStart);
    void this.fillAsync();
  }

  private renderStats(): void {
    const container = this.root.createDiv({ cls: "thinkers-stats" });
    const card = (labelKey: string) => {
      const el = container.createDiv({ cls: "thinkers-stat" });
      el.createSpan({ cls: "thinkers-stat-value", text: "\u2014" });
      el.createSpan({ cls: "thinkers-stat-label", text: t(labelKey) });
      return el;
    };
    card("stats.today");
    card("stats.week");
    card("stats.month");
    card("stats.streak");
  }

  /** Focus time and rest time, for this week and for this month. */
  private renderSplitStats(): void {
    const panel = this.root.createDiv({ cls: "thinkers-splitstats" });
    panel.createDiv({ cls: "thinkers-splitstats-title", text: t("stats.focusRestHeading") });
    const grid = panel.createDiv({ cls: "thinkers-splitstats-grid" });
    this.buildSplitColumn(grid, "week", t("stats.week"));
    this.buildSplitColumn(grid, "month", t("stats.month"));
  }

  private buildSplitColumn(grid: HTMLElement, period: "week" | "month", title: string): void {
    const col = grid.createDiv({ cls: "thinkers-splitstats-col" });
    col.createDiv({ cls: "thinkers-splitstats-col-title", text: title });
    const list = col.createDiv({ cls: "thinkers-splitstats-list" });
    for (const kind of ["focus", "rest"] as const) {
      const row = list.createDiv({ cls: `thinkers-splitstats-row thinkers-splitstats-${kind}` });
      row.createSpan({
        cls: "thinkers-splitstats-label",
        text: t(kind === "focus" ? "stats.focusTotal" : "stats.restTotal"),
      });
      const value = row.createSpan({ cls: "thinkers-splitstats-value", text: "\u2014" });
      value.setAttribute("data-kind", `${period}-${kind}`);
    }
  }

  /**
   * The ring under the focus/rest totals. It answers "of the time I logged that day, how
   * much was focus and how much was rest", for the day selected in the grid below.
   */
  private renderRatio(): void {
    const panel = this.root.createDiv({ cls: "thinkers-ratio" });
    const head = panel.createDiv({ cls: "thinkers-ratio-head" });
    head.createSpan({ cls: "thinkers-ratio-title", text: t("ratio.heading") });
    const picked = this.selectedKey === todayKey() ? `${this.selectedKey} \u00B7 ${t("habit.today")}` : this.selectedKey;
    head.createSpan({ cls: "thinkers-ratio-day", text: picked });

    const body = panel.createDiv({ cls: "thinkers-ratio-body" });
    const gauge = body.createDiv({ cls: "thinkers-ratio-gauge" });

    const svg = createSvg("svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("class", "thinkers-ratio-ring");
    const arc = (cls: string): SVGElement => {
      const el = createSvg("circle");
      el.setAttribute("cx", "60");
      el.setAttribute("cy", "60");
      el.setAttribute("r", String(RATIO_RADIUS));
      el.setAttribute("class", cls);
      el.setAttribute("transform", RATIO_ROTATION);
      return el;
    };
    svg.appendChild(arc("thinkers-ratio-track"));
    svg.appendChild(arc("thinkers-ratio-focus"));
    svg.appendChild(arc("thinkers-ratio-rest"));
    gauge.appendChild(svg);

    const center = gauge.createDiv({ cls: "thinkers-ratio-center" });
    center.createSpan({ cls: "thinkers-ratio-percent", text: "\u2014" });
    center.createSpan({ cls: "thinkers-ratio-center-label", text: t("stats.focusTotal") });

    const legend = body.createDiv({ cls: "thinkers-ratio-legend" });
    for (const kind of ["focus", "rest"] as const) {
      const row = legend.createDiv({ cls: "thinkers-ratio-legend-row" });
      row.createSpan({ cls: `thinkers-ratio-swatch thinkers-ratio-swatch-${kind}` });
      row.createSpan({
        cls: "thinkers-ratio-legend-label",
        text: t(kind === "focus" ? "stats.focusTotal" : "stats.restTotal"),
      });
      const value = row.createSpan({ cls: "thinkers-ratio-value", text: "\u2014" });
      value.setAttribute("data-kind", kind);
    }

    panel.createDiv({ cls: "thinkers-ratio-caption", text: t("calendar.empty") });
  }

  private renderNav(): void {
    const nav = this.root.createDiv({ cls: "thinkers-cal-nav" });
    const prev = nav.createEl("button", { cls: "thinkers-cal-btn" });
    prev.setAttribute("aria-label", t("calendar.prev"));
    setIcon(prev, "chevron-left");
    prev.addEventListener("click", () => this.shiftMonth(-1));

    nav.createDiv({ cls: "thinkers-cal-label", text: monthTitle(this.year, this.month) });

    const next = nav.createEl("button", { cls: "thinkers-cal-btn" });
    next.setAttribute("aria-label", t("calendar.next"));
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => this.shiftMonth(1));

    const today = nav.createEl("button", { cls: "thinkers-cal-btn thinkers-cal-today" });
    today.setText(t("calendar.today"));
    today.addEventListener("click", () => this.goToToday());
  }

  private shiftMonth(delta: number): void {
    const d = new Date(this.year, this.month + delta, 1);
    this.year = d.getFullYear();
    this.month = d.getMonth();
    this.render();
  }

  private goToToday(): void {
    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth();
    this.selectedKey = todayKey();
    this.render();
  }

  private renderWeekdayHeader(weekStart: number): void {
    const row = this.root.createDiv({ cls: "thinkers-cal-weekdays" });
    const names = weekdays();
    for (let i = 0; i < 7; i++) {
      row.createSpan({ cls: "thinkers-cal-weekday", text: names[(weekStart + i) % 7] });
    }
  }

  /** Date plus a dot; the dot is the only place the amount of focus shows. */
  private renderGrid(weekStart: number): void {
    const grid = this.root.createDiv({ cls: "thinkers-cal-grid" });
    const offset = monthOffset(this.year, this.month, weekStart);
    for (let i = 0; i < offset; i++) grid.createDiv({ cls: "thinkers-day thinkers-day-blank" });

    const days = monthDays(this.year, this.month);
    const today = todayKey();
    for (const key of days) {
      const cell = grid.createDiv({ cls: "thinkers-day" });
      cell.setAttribute("data-day", key);
      if (key === today) cell.addClass("thinkers-day-today");
      if (key === this.selectedKey) cell.addClass("thinkers-day-selected");
      cell.createSpan({ cls: "thinkers-day-num", text: String(Number.parseInt(key.slice(8, 10), 10)) });
      cell.createSpan({ cls: "thinkers-day-dot" });
      cell.addEventListener("click", () => this.openDay(key));
    }
  }

  /** Pressing a day both picks it — the ring follows — and opens its records. */
  private openDay(key: string): void {
    this.selectedKey = key;
    this.render();
    new DayDetailModal(this.deps.app, key, {
      storage: this.deps.storage,
      getSettings: this.deps.getSettings,
      getDiaryConfig: this.deps.getDiaryConfig,
      onChanged: () => {
        this.deps.onChanged();
        this.render();
      },
    }).open();
  }

  private async fillAsync(): Promise<void> {
    const token = ++this.renderToken;
    const settings = this.deps.getSettings();
    const monthKeys = monthDays(this.year, this.month);
    const weekKeys = weekDays(todayKey(), settings.weekStart);

    // The selected day is fetched on its own: after paging to another month it no longer
    // belongs to the grid on screen.
    const [monthMap, weekMap, selected] = await Promise.all([
      this.deps.storage.getDays(monthKeys),
      this.deps.storage.getDays(weekKeys),
      this.deps.storage.getDay(this.selectedKey),
    ]);
    if (token !== this.renderToken) return;

    const goal = Math.max(1, settings.dailyGoalMinutes * 60);
    for (const key of monthKeys) {
      const cell = this.root.querySelector(`.thinkers-day[data-day="${key}"]`);
      if (!cell) continue;
      const records = monthMap.get(key) ?? [];
      const focusSec = sumFocusDuration(records);
      const level = focusSec === 0 ? 0 : Math.min(4, Math.ceil((focusSec / goal) * 4));
      cell.addClass(`thinkers-heat-${level}`);
      cell.setAttribute("aria-label", focusSec > 0 ? formatDuration(focusSec) : key);
    }

    void this.fillStats(token, monthMap, weekMap);
    this.fillSplitStats(token, monthMap, weekMap);
    this.fillRatio(token, selected);
  }

  private async fillStats(token: number, monthMap: Map<string, DayRecord[]>, weekMap: Map<string, DayRecord[]>): Promise<void> {
    const todayFocus = sumFocusDuration(weekMap.get(todayKey()) ?? []);
    const weekFocus = [...weekMap.values()].reduce((sum, records) => sum + sumFocusDuration(records), 0);
    const monthFocus = [...monthMap.values()].reduce((sum, records) => sum + sumFocusDuration(records), 0);
    const streak = await this.deps.storage.getStreak();
    if (token !== this.renderToken) return;

    const values = this.root.querySelectorAll(".thinkers-stat-value");
    if (values.length >= 4) {
      values[0].textContent = formatDuration(todayFocus);
      values[1].textContent = formatDuration(weekFocus);
      values[2].textContent = formatDuration(monthFocus);
      values[3].textContent = t("stats.streakValue", { days: streak });
    }
  }

  private fillSplitStats(token: number, monthMap: Map<string, DayRecord[]>, weekMap: Map<string, DayRecord[]>): void {
    const total = (map: Map<string, DayRecord[]>, sum: (records: DayRecord[]) => number): number => {
      let result = 0;
      for (const records of map.values()) result += sum(records);
      return result;
    };
    const values: Array<[string, number]> = [
      ["week-focus", total(weekMap, sumFocusDuration)],
      ["week-rest", total(weekMap, sumRestDuration)],
      ["month-focus", total(monthMap, sumFocusDuration)],
      ["month-rest", total(monthMap, sumRestDuration)],
    ];
    if (token !== this.renderToken) return;

    for (const [kind, sec] of values) {
      const el = this.root.querySelector(`.thinkers-splitstats-value[data-kind="${kind}"]`);
      if (el) el.textContent = formatDuration(sec);
    }
  }

  /** The day's focus and rest, as the two arcs of the ring and the ratio under it. */
  private fillRatio(token: number, records: DayRecord[]): void {
    if (token !== this.renderToken) return;
    const focusSec = sumFocusDuration(records);
    const restSec = sumRestDuration(records);
    const total = focusSec + restSec;
    const focusShare = total > 0 ? focusSec / total : 0;

    drawArc(this.root.querySelector(".thinkers-ratio-focus"), focusShare, 0);
    drawArc(this.root.querySelector(".thinkers-ratio-rest"), total > 0 ? restSec / total : 0, focusShare);

    const setText = (selector: string, text: string): void => {
      const el = this.root.querySelector(selector);
      if (el) el.textContent = text;
    };
    setText('.thinkers-ratio-value[data-kind="focus"]', formatDuration(focusSec));
    setText('.thinkers-ratio-value[data-kind="rest"]', formatDuration(restSec));
    setText(".thinkers-ratio-percent", total > 0 ? `${Math.round(focusShare * 100)}%` : "\u2014");
    setText(
      ".thinkers-ratio-caption",
      total > 0 ? t("ratio.caption", { ratio: ratioText(focusSec, restSec) }) : t("calendar.empty"),
    );
  }
}

interface DayDetailDeps {
  storage: DayStore;
  getSettings: () => ThinkersSettings;
  getDiaryConfig: () => DailyNotesConfig;
  onChanged: () => void;
}

/** What a day holds: its records, plus a way into that day's diary note. */
class DayDetailModal extends Modal {
  private token = 0;

  constructor(
    app: App,
    private dayKey: string,
    private deps: DayDetailDeps,
  ) {
    super(app);
  }

  onOpen(): void {
    void this.render();
  }

  private async render(): Promise<void> {
    const token = ++this.token;
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("thinkers-day-modal");
    this.titleEl.setText(this.dayKey);

    // Deleted rest records stay in the note as tombstones, so they are filtered out here.
    const records = visibleRecords(await this.deps.storage.getDay(this.dayKey));
    if (token !== this.token) return;

    const actions = contentEl.createDiv({ cls: "thinkers-day-actions" });
    const addFocus = actions.createEl("button", { cls: "thinkers-day-btn" });
    addFocus.setText(t("calendar.add"));
    addFocus.addEventListener("click", () => this.openModal({ defaultType: "focus" }));

    const addRest = actions.createEl("button", { cls: "thinkers-day-btn" });
    addRest.setText(t("calendar.addRest"));
    addRest.addEventListener("click", () => this.openModal({ defaultType: "rest" }));

    const diaryBtn = actions.createEl("button", { cls: "thinkers-day-btn thinkers-day-btn-diary" });
    const config = this.deps.getDiaryConfig();
    const path = diaryPath(config, this.dayKey);
    const exists = this.app.vault.getAbstractFileByPath(path) !== null;
    diaryBtn.setText(exists ? t("calendar.openDiary") : t("calendar.createDiary"));
    diaryBtn.addEventListener("click", () => {
      void openDiaryForDate(this.app, config, this.dayKey);
      this.close();
    });

    if (records.length === 0) {
      contentEl.createDiv({ cls: "thinkers-detail-empty", text: t("calendar.empty") });
      return;
    }

    const focusSec = sumFocusDuration(records);
    const restSec = sumRestDuration(records);
    const total = contentEl.createDiv({ cls: "thinkers-detail-total" });
    total.setText(t("calendar.dayTotal", { duration: formatDuration(focusSec) }));
    const pomodoros = pomodoroRecords(records).length;
    total.createSpan({ cls: "thinkers-detail-rest-total", text: `\u00B7 ${t("stats.pomodoros", { count: pomodoros })}` });
    if (restSec > 0) {
      total.createSpan({ cls: "thinkers-detail-rest-total", text: `\u00B7 ${t("record.rest")} ${formatDuration(restSec)}` });
    }

    const list = contentEl.createDiv({ cls: "thinkers-session-list" });
    for (const record of sortRecords(records)) this.renderRow(list, record);
  }

  private renderRow(container: HTMLElement, record: DayRecord): void {
    const row = container.createDiv({ cls: record.kind === "rest" ? "thinkers-session thinkers-session-rest" : "thinkers-session" });
    const info = row.createDiv({ cls: "thinkers-session-info" });
    info.createSpan({ cls: "thinkers-session-range" }).setText(`${clock(record.start)} \u2013 ${clock(record.end)}`);

    const meta = info.createSpan({ cls: "thinkers-session-meta" });
    if (record.kind === "rest") {
      meta.setText(`${t("record.rest")} \u00B7 ${record.tag} \u00B7 ${formatDuration(record.durationSec)}`);
    } else {
      const label = record.mode === "stopwatch" ? t("mode.stopwatch") : t(`phase.${record.phase ?? "focus"}`);
      const parts = [formatDuration(record.durationSec), label, record.tag];
      if (!record.completed) parts.push(t("calendar.incomplete"));
      if (record.note && record.note.trim().length > 0) parts.push(record.note.trim());
      meta.setText(parts.join(" \u00B7 "));
    }

    const actions = row.createDiv({ cls: "thinkers-session-actions" });
    const edit = actions.createEl("button", { cls: "thinkers-icon-btn" });
    edit.setAttribute("aria-label", t("calendar.editAria"));
    setIcon(edit, "pencil");
    edit.addEventListener("click", () => this.openModal({ existing: record, defaultType: record.kind }));

    const del = actions.createEl("button", { cls: "thinkers-icon-btn thinkers-icon-danger" });
    del.setAttribute("aria-label", t("calendar.deleteAria"));
    setIcon(del, "trash");
    del.addEventListener("click", () => {
      openDeleteConfirm(this.app, this.dayKey, record, () => {
        this.deps.storage.deleteRecord(this.dayKey, record.id).then(
          () => {
            this.deps.onChanged();
            void this.render();
          },
          (err) => console.error(err),
        );
      });
    });
  }

  private openModal(options: { existing?: DayRecord; defaultType: "focus" | "rest" }): void {
    openRecordModal({
      app: this.app,
      storage: this.deps.storage,
      getSettings: this.deps.getSettings,
      existing: options.existing,
      dayKey: this.dayKey,
      defaultType: options.defaultType,
      onChanged: () => {
        this.deps.onChanged();
        void this.render();
      },
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
