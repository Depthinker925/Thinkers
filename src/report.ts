import type { ThinkersSettings } from "./types";
import type { DayStore } from "./storage";
import { t, weekdays } from "./i18n";
import { formatDuration, parseDateKey, pomodoroRecords, sumFocusDuration, todayKey, weekDays } from "./utils";

interface ReportDeps {
  storage: DayStore;
  getSettings: () => ThinkersSettings;
}

export class ReportView {
  constructor(
    private root: HTMLElement,
    private deps: ReportDeps,
  ) {}

  refresh(): void {
    void this.render();
  }

  private async render(): Promise<void> {
    const root = this.root;
    root.empty();
    root.addClass("thinkers-report");

    // The seven columns are the current week, starting on whichever day the settings say.
    // Reading that setting here as well as in the calendar is the whole point: otherwise
    // this chart was a rolling window, and the two panels disagreed about what "this week"
    // even means.
    const days = weekDays(todayKey(), this.deps.getSettings().weekStart);
    const map = await this.deps.storage.getDays(days);
    const values = days.map((d) => sumFocusDuration(map.get(d) ?? []));
    // Stopwatch runs are not pomodoros, so they stay out of the count.
    const sessionCount = days.reduce((sum, d) => sum + pomodoroRecords(map.get(d) ?? []).length, 0);
    const max = Math.max(1, ...values);
    const weekTotal = values.reduce((a, b) => a + b, 0);

    root.createDiv({ cls: "thinkers-report-title", text: t("report.heading") });
    root.createDiv({ cls: "thinkers-report-range", text: t("report.range", { from: days[0], to: days[6] }) });

    this.renderStats(root, weekTotal, sessionCount);
    this.renderChart(root, days, values, max);
  }

  private renderStats(root: HTMLElement, weekTotal: number, sessionCount: number): void {
    const stats = root.createDiv({ cls: "thinkers-report-stats" });
    const cards: Array<{ label: string; value: string }> = [
      { label: t("report.totalWeek"), value: formatDuration(weekTotal) },
      { label: t("report.sessions"), value: String(sessionCount) },
      { label: t("report.avg"), value: formatDuration(Math.round(weekTotal / 7)) },
    ];
    for (const card of cards) {
      const el = stats.createDiv({ cls: "thinkers-report-stat" });
      el.createDiv({ cls: "thinkers-report-stat-value", text: card.value });
      el.createDiv({ cls: "thinkers-report-stat-label", text: card.label });
    }
  }

  private renderChart(root: HTMLElement, days: string[], values: number[], max: number): void {
    const chart = root.createDiv({ cls: "thinkers-report-chart" });
    const weekName = weekdays();
    const today = todayKey();

    for (let i = 0; i < 7; i++) {
      const col = chart.createDiv({ cls: "thinkers-report-col" });
      const valueText = values[i] > 0 ? formatDuration(values[i]) : "";
      col.createDiv({ cls: "thinkers-report-value", text: valueText });

      const barWrap = col.createDiv({ cls: "thinkers-report-bar-wrap" });
      const bar = barWrap.createDiv({ cls: "thinkers-report-bar" });
      const pct = values[i] > 0 ? Math.max(6, Math.round((values[i] / max) * 100)) : 0;
      bar.style.setProperty("--thinkers-report-bar-height", `${pct}%`);
      if (days[i] === today) bar.addClass("thinkers-report-bar-today");

      const d = parseDateKey(days[i]);
      const label = days[i] === today ? t("habit.today") : weekName[d.getDay()];
      col.createDiv({ cls: "thinkers-report-day", text: label });
    }
  }
}
