import { App, Modal, Setting } from "obsidian";
import type { FocusRecord } from "./types";
import { t } from "./i18n";
import { clock, dateKeyOf, formatDuration } from "./utils";
import type { DayStore } from "./storage";

interface PromptDeps {
  app: App;
  storage: DayStore;
  /** The record that was just written, so the prompt edits the stored session. */
  record: FocusRecord;
  onChanged: () => void;
}

/**
 * Only one prompt at a time. A session that ends while the previous prompt is still open
 * takes its place, so the panel can never end up behind a stack of forgotten dialogs.
 */
let openPrompt: PostSessionPrompt | null = null;

export function openPostSessionPrompt(deps: PromptDeps): void {
  openPrompt?.close();
  const modal = new PostSessionPrompt(deps);
  openPrompt = modal;
  modal.open();
}

/**
 * The "what did you just do" prompt.
 *
 * Shown after a focus session has been saved, never before: the session is already in the
 * vault when this opens, so closing it without answering loses nothing.
 */
class PostSessionPrompt extends Modal {
  private tag: string;
  private note: string;

  constructor(private deps: PromptDeps) {
    super(deps.app);
    this.tag = deps.record.tag;
    this.note = deps.record.note ?? "";
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("thinkers-prompt");
    this.titleEl.setText(t("prompt.title"));
    contentEl.createDiv({
      cls: "thinkers-prompt-meta",
      text: t("prompt.meta", {
        range: `${clock(this.deps.record.start)} \u2013 ${clock(this.deps.record.end)}`,
        duration: formatDuration(this.deps.record.durationSec),
      }),
    });

    new Setting(contentEl).setName(t("prompt.what")).addText((txt) => {
      txt.setValue(this.tag);
      txt.onChange((value) => {
        this.tag = value;
      });
      txt.inputEl.focus();
      txt.inputEl.select();
    });

    new Setting(contentEl).setName(t("prompt.note")).addTextArea((area) => {
      area.setPlaceholder(t("prompt.notePlaceholder"));
      area.setValue(this.note);
      area.inputEl.rows = 3;
      area.onChange((value) => {
        this.note = value;
      });
    });

    new Setting(contentEl)
      .addButton((btn) => btn.setButtonText(t("prompt.skip")).onClick(() => this.close()))
      .addButton((btn) => btn.setButtonText(t("modal.save")).setCta().onClick(() => void this.save()));
  }

  private async save(): Promise<void> {
    const record = this.deps.record;
    const tag = this.tag.trim().length > 0 ? this.tag.trim() : record.tag;
    const note = this.note.trim();
    if (tag === record.tag && note === (record.note ?? "")) {
      this.close();
      return;
    }
    try {
      await this.deps.storage.updateRecord(dateKeyOf(record.start), {
        ...record,
        tag,
        note: note.length > 0 ? note : undefined,
        updatedAt: Date.now(),
      });
    } catch {
      return;
    }
    this.deps.onChanged();
    this.close();
  }

  onClose(): void {
    if (openPrompt === this) openPrompt = null;
    this.contentEl.empty();
  }
}
