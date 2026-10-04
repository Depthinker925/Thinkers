import { App, Modal, Notice, Setting } from "obsidian";
import type { TextComponent } from "obsidian";
import type { DayRecord, ThinkersSettings, FocusPhase, RecordMode } from "./types";
import { DEFAULT_FOCUS_TAG, DEFAULT_REST_TAG } from "./types";
import { t } from "./i18n";
import { dateAtMinutes, dateKeyOf, formatDuration, genId, todayKey } from "./utils";
import type { DayStore } from "./storage";

const MINUTES_PER_DAY = 1440;

interface ModalDeps {
  app: App;
  storage: DayStore;
  getSettings: () => ThinkersSettings;
  existing?: DayRecord;
  dayKey: string | null;
  defaultType: "focus" | "rest";
  onChanged: () => void;
}

export function openRecordModal(deps: ModalDeps): void {
  new RecordModal(deps.app, deps).open();
}

export function openDeleteConfirm(app: App, dayKey: string, record: DayRecord, onConfirmed: () => void): void {
  new ConfirmDeleteModal(app, dayKey, record, onConfirmed).open();
}

class RecordModal extends Modal {
  private storage: DayStore;
  private getSettings: () => ThinkersSettings;
  private existing?: DayRecord;
  private onChanged: () => void;

  private type: "focus" | "rest";
  private mode: RecordMode = "pomodoro";
  private phase: FocusPhase = "focus";
  private dayKey: string;
  private startMins: number;
  private durationMin: number;
  private completed = true;
  private tag: string = DEFAULT_REST_TAG;
  private note = "";

  private modeSetting: Setting | null = null;
  private phaseSetting: Setting | null = null;
  private completedSetting: Setting | null = null;
  private tagText: TextComponent | null = null;
  private endText: TextComponent | null = null;
  private durationText: TextComponent | null = null;

  constructor(app: App, deps: ModalDeps) {
    super(app);
    this.storage = deps.storage;
    this.getSettings = deps.getSettings;
    this.existing = deps.existing;
    this.onChanged = deps.onChanged;

    if (deps.existing) {
      this.type = deps.existing.kind;
      this.tag = deps.existing.tag;
      this.note = deps.existing.note ?? "";
      if (deps.existing.kind === "focus") {
        this.mode = deps.existing.mode;
        this.phase = deps.existing.phase ?? "focus";
        this.completed = deps.existing.completed;
      }
      this.dayKey = dateKeyOf(deps.existing.start);
      const d = new Date(deps.existing.start);
      this.startMins = d.getHours() * 60 + d.getMinutes();
      this.durationMin = Math.max(1, Math.round(deps.existing.durationSec / 60));
    } else {
      this.type = deps.defaultType;
      this.mode = this.getSettings().defaultMode;
      this.phase = "focus";
      this.dayKey = deps.dayKey ?? todayKey();
      const d = new Date();
      this.startMins = d.getHours() * 60 + d.getMinutes();
      this.durationMin =
        this.type === "rest"
          ? Math.max(1, Math.round(this.getSettings().shortBreakMinutes))
          : Math.max(1, Math.round(this.getSettings().focusMinutes));
      this.completed = true;
      this.tag = this.defaultTag();
    }
  }

  private defaultTag(): string {
    return this.type === "rest" ? DEFAULT_REST_TAG : DEFAULT_FOCUS_TAG;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    this.titleEl.setText(this.existing ? t("modal.editTitle") : this.type === "rest" ? t("modal.addRestTitle") : t("modal.addTitle"));
    this.buildForm(contentEl);
    new Setting(contentEl)
      .addButton((btn) => btn.setButtonText(t("modal.save")).setCta().onClick(() => void this.save()))
      .addButton((btn) => btn.setButtonText(t("modal.cancel")).onClick(() => this.close()));
  }

  private buildForm(contentEl: HTMLElement): void {
    if (!this.existing) {
      new Setting(contentEl).setName(t("modal.mode")).addDropdown((dd) => {
        dd.addOption("focus", t("modal.addTitle"));
        dd.addOption("rest", t("modal.addRestTitle"));
        dd.setValue(this.type);
        dd.onChange((value) => {
          const previousDefault = this.defaultTag();
          this.type = value === "rest" ? "rest" : "focus";
          const nextDefault = this.defaultTag();
          if (this.tag.trim() === "" || this.tag === previousDefault) {
            this.tag = nextDefault;
            this.tagText?.setValue(nextDefault);
          }
          this.updateVisibility();
        });
      });
    }

    this.modeSetting = new Setting(contentEl).setName(t("modal.mode")).addDropdown((dd) => {
      dd.addOption("pomodoro", t("mode.pomodoro"));
      dd.addOption("stopwatch", t("mode.stopwatch"));
      dd.setValue(this.mode);
      dd.onChange((value) => {
        this.mode = value === "stopwatch" ? "stopwatch" : "pomodoro";
        this.updateVisibility();
      });
    });

    this.phaseSetting = new Setting(contentEl).setName(t("phase.focus")).addDropdown((dd) => {
      dd.addOption("focus", t("phase.focus"));
      dd.addOption("short", t("phase.short"));
      dd.addOption("long", t("phase.long"));
      dd.setValue(this.phase);
      dd.onChange((value) => {
        this.phase = value as FocusPhase;
      });
    });

    new Setting(contentEl).setName(t("modal.tag")).addText((txt) => {
      txt.setPlaceholder(t("modal.tagPlaceholder"));
      txt.setValue(this.tag);
      txt.onChange((value) => {
        this.tag = value;
      });
      this.tagText = txt;
    });

    new Setting(contentEl).setName(t("modal.note")).addTextArea((area) => {
      area.setPlaceholder(t("prompt.notePlaceholder"));
      area.setValue(this.note);
      area.inputEl.rows = 3;
      area.onChange((value) => {
        this.note = value;
      });
    });

    new Setting(contentEl).setName(t("modal.day")).addText((txt) => {
      txt.inputEl.type = "date";
      txt.setValue(this.dayKey);
      txt.onChange((value) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) this.dayKey = value;
      });
    });

    new Setting(contentEl).setName(t("modal.startTime")).addText((txt) => {
      txt.inputEl.type = "time";
      txt.setValue(this.minutesToClock(this.startMins));
      txt.onChange((value) => this.onStartChanged(value));
    });

    new Setting(contentEl).setName(t("modal.endTime")).addText((txt) => {
      txt.inputEl.type = "time";
      txt.setValue(this.minutesToClock(this.startMins + this.durationMin));
      txt.onChange((value) => this.onEndChanged(value));
      this.endText = txt;
    });

    new Setting(contentEl).setName(t("modal.duration")).addText((txt) => {
      txt.inputEl.type = "number";
      txt.inputEl.min = "1";
      txt.setValue(String(this.durationMin));
      txt.onChange((value) => this.onDurationChanged(value));
      this.durationText = txt;
    });

    this.completedSetting = new Setting(contentEl).setName(t("modal.completed")).addToggle((tgl) => {
      tgl.setValue(this.completed);
      tgl.onChange((value) => {
        this.completed = value;
      });
    });

    if (this.existing) {
      new Setting(contentEl).addButton((btn) => btn.setButtonText(t("modal.delete")).setDestructive().onClick(() => this.confirmDelete()));
    }

    this.updateVisibility();
  }

  private updateVisibility(): void {
    const isRest = this.type === "rest";
    this.modeSetting?.settingEl.toggleClass("thinkers-hidden", isRest);
    this.completedSetting?.settingEl.toggleClass("thinkers-hidden", isRest);
    const hidePhase = isRest || this.mode !== "pomodoro";
    this.phaseSetting?.settingEl.toggleClass("thinkers-hidden", hidePhase);
  }

  private minutesToClock(mins: number): string {
    const m = ((mins % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return `${h < 10 ? "0" : ""}${h}:${mm < 10 ? "0" : ""}${mm}`;
  }

  private onStartChanged(value: string): void {
    const mins = this.parseClock(value);
    if (mins === null) return;
    this.startMins = mins;
    this.endText?.setValue(this.minutesToClock(this.startMins + this.durationMin));
  }

  private onEndChanged(value: string): void {
    const mins = this.parseClock(value);
    if (mins === null) return;
    let end = mins;
    if (end < this.startMins) end += MINUTES_PER_DAY;
    this.durationMin = Math.max(1, end - this.startMins);
    this.durationText?.setValue(String(this.durationMin));
  }

  private onDurationChanged(value: string): void {
    const mins = Number.parseInt(value, 10);
    if (Number.isNaN(mins) || mins < 1) return;
    this.durationMin = mins;
    this.endText?.setValue(this.minutesToClock(this.startMins + this.durationMin));
  }

  private parseClock(value: string): number | null {
    const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
    if (!match) return null;
    const h = Number.parseInt(match[1], 10);
    const m = Number.parseInt(match[2], 10);
    if (h > 23 || m > 59) return null;
    return h * 60 + m;
  }

  /** An empty note is stored as nothing at all, so the file stays readable. */
  private noteValue(): string | undefined {
    const note = this.note.trim();
    return note.length > 0 ? note : undefined;
  }

  private async save(): Promise<void> {
    const start = dateAtMinutes(this.dayKey, this.startMins);
    const end = start + this.durationMin * 60000;
    const durationSec = Math.round((end - start) / 1000);
    if (durationSec <= 0) {
      new Notice(t("modal.invalidRange"));
      return;
    }

    const now = Date.now();
    let record: DayRecord;
    if (this.type === "rest") {
      record = {
        id: this.existing?.id ?? genId(),
        kind: "rest",
        tag: this.tag.trim().length > 0 ? this.tag.trim() : DEFAULT_REST_TAG,
        start,
        end,
        durationSec,
        note: this.noteValue(),
        createdAt: this.existing?.createdAt ?? now,
        updatedAt: now,
      };
    } else {
      record = {
        id: this.existing?.id ?? genId(),
        kind: "focus",
        mode: this.mode,
        phase: this.mode === "pomodoro" ? this.phase : undefined,
        tag: this.tag.trim().length > 0 ? this.tag.trim() : DEFAULT_FOCUS_TAG,
        start,
        end,
        durationSec,
        completed: this.completed,
        note: this.noteValue(),
        createdAt: this.existing?.createdAt ?? now,
        updatedAt: now,
      };
    }

    try {
      if (this.existing) {
        await this.storage.updateRecord(dateKeyOf(this.existing.start), record);
      } else {
        await this.storage.addRecord(record);
      }
    } catch {
      return;
    }
    this.onChanged();
    this.close();
  }

  private confirmDelete(): void {
    if (!this.existing) return;
    const day = dateKeyOf(this.existing.start);
    const target = this.existing;
    new ConfirmDeleteModal(this.app, day, target, () => {
      this.storage.deleteRecord(day, target.id).then(
        () => {
          this.onChanged();
          this.close();
        },
        () => {},
      );
    }).open();
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

class ConfirmDeleteModal extends Modal {
  constructor(
    app: App,
    private dayKey: string,
    private record: DayRecord,
    private onConfirmed: () => void,
  ) {
    super(app);
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    this.titleEl.setText(t("modal.deleteTitle"));
    contentEl.createDiv().setText(t("modal.deleteBody", { day: this.dayKey, duration: formatDuration(this.record.durationSec) }));
    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText(t("modal.delete"))
          .setDestructive()
          .onClick(() => {
            this.onConfirmed();
            this.close();
          }),
      )
      .addButton((btn) => btn.setButtonText(t("modal.cancel")).onClick(() => this.close()));
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
