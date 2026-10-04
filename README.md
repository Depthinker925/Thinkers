# Thinkers

A focus timer for Obsidian's right sidebar, with a statistics panel beside it. Two modes —
Pomodoro and stopwatch — and one thing to press. Every session is written to a plain
markdown note in your vault, so the record outlives the plugin.

## What it looks like

A circle with the time in the middle, and the mode written small underneath:

- **press the time** to start a session, **press it again** to end one
- the ring fills as the session runs
- the mode word under the circle swaps Pomodoro for stopwatch, while nothing runs

Nothing on the panel moves when a session starts: the circle, the digits and the mode line
are the same size in both states, so pressing start never shifts what you were reading.

There is no pause and no reset. A session is either running or finished and saved.

## Modes

| Mode | Behaviour |
|---|---|
| Pomodoro | Counts down from the focus length, then a short break, and a long break every N rounds. Rounds can chain automatically. |
| Stopwatch | Counts up until you press the time again. |

## After a session

When a focus session is saved, a prompt asks what you were working on — a tag and an
optional note. The session is already written to the vault when the prompt opens, so
closing it without answering loses nothing. The prompt can be switched off in the settings,
and both fields can be edited later from the day's record list.

## Focus statistics

The panel beside the timer (ribbon icon, command, or its own tab in the sidebar) shows:

- the current week as a bar chart, with the week's total, session count and daily average.
  The week starts on whichever day the settings say, the same as the calendar below it
- the current month as a calendar, each day shaded by how much you focused
- focus and rest totals for this week and for this month, plus today, the week, the month
  and your streak
- a ring showing how one day split between focus and rest, with the ratio written under it.
  It describes the day selected in the calendar, which starts as today and moves every time
  a day is clicked

Click any day to see its sessions — start, end, duration, mode and tag — and to edit,
delete or add records. Each day also has a button that opens **that date's daily note**,
creating it from your Daily notes template if it does not exist yet.

## Where your sessions go

Each session becomes a record inside one note per day:

```
FocusLog/2026/2026-10-02.md
```

The note starts with frontmatter summarising the day (`focus-minutes`, `session-count`,
`rest-minutes`, `rest-count`) followed by a JSON block with the full records. Both are plain
text, so you keep your data even if you uninstall the plugin. Breaks between two sessions
are filled in as rest records automatically.

Deleting a rest record marks it deleted rather than dropping it from the note
(`"deleted": true`), and it is left out of every total and list. That flag is what stops the
next automatic pass from filling the same gap straight back in; delete it and the break
stays deleted.

Sessions shorter than the minimum length are not saved at all.

## Interrupted sessions

If Obsidian closes while the timer runs, the next start shows a recovery banner offering to
continue the session, save what was counted, or discard it. Nothing is lost silently.

## Commands

| Command | What it does |
|---|---|
| Open the timer | Shows the timer panel in the right sidebar |
| Start / End | Same as pressing the time in the circle |
| Open focus statistics | Shows the statistics panel |
| Open today's diary | Opens (or creates) today's daily note |
| Add a record manually | Backfills a session you forgot to time |

Obsidian's status bar shows the running countdown or count-up while a session is active.

## Settings

| Group | Options |
|---|---|
| Timer | Focus length, short break, long break, long-break interval, minimum session length, daily goal, chain rounds automatically, ask what you focused on, default mode |
| Notifications | Sound, vibration, notices |
| Storage | Folder for the log notes, which day the calendar week starts on, open the panel on startup |
| Diary | Daily note folder and date format — leave both empty to follow the core Daily notes settings |

## Install

Copy `main.js`, `styles.css` and `manifest.json` into
`<your vault>/.obsidian/plugins/thinkers/`, then enable **Thinkers** in
Settings → Community plugins.

## Build from source

```bash
npm install
npm run build      # bundled main.js + styles.css
npm run typecheck  # tsc --noEmit
```

## Releases

Releases are built from source by GitHub Actions, not by hand. Pushing a tag that matches
the `version` in `manifest.json` runs `.github/workflows/release.yml`, which installs from
the committed lockfile with `npm ci`, typechecks, builds, and attaches `main.js`,
`manifest.json` and `styles.css` to the release. The released `main.js` is therefore
byte-for-byte what `npm ci && npm run build` produces for the tagged commit.

## Desktop only

The plugin is marked `isDesktopOnly`. It has no mobile layout.
