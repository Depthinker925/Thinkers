/*
This is a generated file. Do not edit directly.
Source: https://github.com/Depthinker925/Thinkers
*/
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ThinkersPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian10 = require("obsidian");

// src/types.ts
var DEFAULT_SETTINGS = {
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
  promptAfterFocus: true
};
var DEFAULT_REST_TAG = "\u4F11\u606F";
var DEFAULT_FOCUS_TAG = "\u4E13\u6CE8";

// src/i18n.ts
var import_obsidian = require("obsidian");
var EN = {
  "mode.pomodoro": "Pomodoro",
  "mode.stopwatch": "Stopwatch",
  "phase.focus": "Focus",
  "phase.short": "Short break",
  "phase.long": "Long break",
  "timer.switchMode": "Switch between Pomodoro and stopwatch",
  "restore.heading": "Unfinished timer found",
  "restore.body": "{duration} was already counted before Obsidian closed",
  "restore.resume": "Continue",
  "restore.save": "Save and stop",
  "restore.discard": "Discard",
  "notice.breakDone": "Break finished. Back to focus",
  "notice.saved": "Saved {duration} of focus",
  "notice.tooShort": "Session shorter than {seconds}s was not saved",
  "notice.recovered": "Recovered an unfinished timer",
  "notice.parseFailed": "Could not read the focus log for {day}",
  "notice.corrupted": "Focus log for {day} was unreadable and has been backed up as {file}",
  "notice.writeFailed": "Could not write the focus log: {message}",
  "stats.today": "Today",
  "stats.focusRestHeading": "Focus and rest",
  "stats.focusTotal": "Focus time",
  "stats.restTotal": "Rest time",
  "stats.week": "This week",
  "stats.month": "This month",
  "stats.streak": "Streak",
  "stats.streakValue": "{days}d",
  "stats.pomodoros": "{count} pomodoros",
  "calendar.prev": "Previous month",
  "calendar.next": "Next month",
  "calendar.today": "Today",
  "calendar.dayTotal": "Total {duration}",
  "calendar.empty": "No sessions on this day",
  "calendar.add": "Add session",
  "calendar.addRest": "Add rest",
  "calendar.incomplete": "stopped early",
  "calendar.editAria": "Edit record",
  "calendar.deleteAria": "Delete record",
  "record.rest": "Rest",
  "modal.addTitle": "Add focus record",
  "modal.addRestTitle": "Add rest record",
  "modal.editTitle": "Edit record",
  "modal.day": "Day",
  "modal.mode": "Mode",
  "modal.startTime": "Start time",
  "modal.endTime": "End time",
  "modal.duration": "Duration (minutes)",
  "modal.completed": "Counted as completed",
  "modal.tag": "Tag",
  "modal.tagPlaceholder": "nap, meal, walk\u2026",
  "modal.save": "Save",
  "modal.cancel": "Cancel",
  "modal.delete": "Delete",
  "modal.deleteTitle": "Delete this record?",
  "modal.deleteBody": "{duration} on {day} will be removed from the log",
  "modal.invalidRange": "The end time must be after the start time",
  "settings.timerHeading": "Timer",
  "settings.focusLength": "Focus length",
  "settings.focusLengthDesc": "Minutes per pomodoro",
  "settings.shortBreak": "Short break",
  "settings.shortBreakDesc": "Minutes of rest after a pomodoro",
  "settings.longBreak": "Long break",
  "settings.longBreakDesc": "Minutes of rest after a full cycle",
  "settings.longBreakInterval": "Long break after",
  "settings.longBreakIntervalDesc": "Number of pomodoros before a long break",
  "settings.autoCycle": "Auto cycle",
  "settings.autoCycleDesc": "Start the next phase automatically when one ends",
  "settings.defaultMode": "Default mode",
  "settings.defaultModeDesc": "Mode selected when the panel opens",
  "settings.minSession": "Minimum session length",
  "settings.minSessionDesc": "Seconds. Shorter runs are discarded instead of stored. Use 0 to keep everything",
  "settings.dailyGoal": "Daily goal",
  "settings.dailyGoalDesc": "Minutes. Used for the calendar colour scale and the daily hint",
  "settings.notificationsHeading": "Notifications",
  "settings.sound": "Sound on finish",
  "settings.soundDesc": "Play a short tone when a phase ends. Mobile systems may mute it in the background",
  "settings.vibrate": "Vibrate on finish",
  "settings.vibrateDesc": "Only works on devices that expose vibration to apps",
  "settings.notice": "Show a notice on finish",
  "settings.storageHeading": "Storage",
  "settings.dataFolder": "Data folder",
  "settings.dataFolderDesc": "Folder inside the vault for the daily focus log notes. These notes survive disabling or uninstalling the plugin",
  "settings.weekStart": "Week starts on",
  "settings.weekStartSunday": "Sunday",
  "settings.weekStartMonday": "Monday",
  "settings.aboutHeading": "About",
  "settings.dataLocation": "Log location",
  "settings.dataLocationDesc": "One note per day at {path}. Delete the folder only if you want to erase your history",
  "settings.diaryHeading": "Diary",
  "settings.diaryFolder": "Diary folder",
  "settings.diaryFolderDesc": "Leave empty to auto-detect from the Daily notes core plugin",
  "settings.diaryFormat": "Diary file format",
  "settings.diaryFormatDesc": "Leave empty to auto-detect from the Daily notes core plugin. Placeholders: YYYY MM DD",
  "view.timer": "Timer",
  "command.diary": "Open diary calendar",
  "command.addManual": "Add focus record manually",
  "habit.today": "Today",
  "report.heading": "Focus report",
  "report.totalWeek": "This week",
  "report.sessions": "Sessions",
  "report.avg": "Daily avg",
  "status.idle": "Timer idle",
  "ribbon.timer": "Open the timer panel",
  "command.openTimer": "Open the timer panel in the right sidebar",
  "stats.title": "Focus statistics",
  "calendar.openDiary": "Open this day's diary",
  "calendar.createDiary": "Create this day's diary",
  // —— added ——
  "command.startStop": "Start / End",
  "settings.openOnStartup": "Open on startup",
  "settings.openOnStartupDesc": "Open the timer panel in the right sidebar when Obsidian starts",
  "timer.pressToStart": "Press the time to start, press it again to end",
  "ribbon.focusStats": "Focus statistics panel",
  "command.openFocusStats": "Open focus statistics",
  "settings.weekStartDesc": "Which day the calendar week starts on",
  "report.range": "{from} \u2013 {to}",
  "ratio.heading": "Focus and rest that day",
  "ratio.caption": "Focus : rest = {ratio}",
  "prompt.title": "What did you focus on?",
  "prompt.meta": "{range} \xB7 {duration}",
  "prompt.what": "What you worked on",
  "prompt.note": "Note",
  "prompt.notePlaceholder": "Next step, what blocked you, an idea\u2026",
  "prompt.skip": "Skip",
  "modal.note": "Note",
  "settings.promptFocus": "Log what you focused on",
  "settings.promptFocusDesc": "Ask for a tag and a note once a focus session has been saved"
};
var ZH = {
  "mode.pomodoro": "\u756A\u8304\u949F",
  "mode.stopwatch": "\u6B63\u8BA1\u65F6",
  "phase.focus": "\u4E13\u6CE8",
  "phase.short": "\u77ED\u4F11\u606F",
  "phase.long": "\u957F\u4F11\u606F",
  "timer.switchMode": "\u5728\u6B63\u8BA1\u65F6\u4E0E\u756A\u8304\u949F\u4E4B\u95F4\u5207\u6362",
  "restore.heading": "\u53D1\u73B0\u672A\u7ED3\u675F\u7684\u8BA1\u65F6",
  "restore.body": "\u5173\u95ED Obsidian \u524D\u5DF2\u7ECF\u8BA1\u4E86 {duration}",
  "restore.resume": "\u7EE7\u7EED",
  "restore.save": "\u4FDD\u5B58\u5E76\u505C\u6B62",
  "restore.discard": "\u4E22\u5F03",
  "notice.breakDone": "\u4F11\u606F\u7ED3\u675F\uFF0C\u56DE\u5230\u4E13\u6CE8",
  "notice.saved": "\u5DF2\u8BB0\u5F55 {duration} \u4E13\u6CE8\u65F6\u95F4",
  "notice.tooShort": "\u4E0D\u8DB3 {seconds} \u79D2\u7684\u7247\u6BB5\u672A\u88AB\u8BB0\u5F55",
  "notice.recovered": "\u5DF2\u6062\u590D\u672A\u7ED3\u675F\u7684\u8BA1\u65F6",
  "notice.parseFailed": "\u65E0\u6CD5\u8BFB\u53D6 {day} \u7684\u4E13\u6CE8\u8BB0\u5F55",
  "notice.corrupted": "{day} \u7684\u4E13\u6CE8\u8BB0\u5F55\u65E0\u6CD5\u89E3\u6790\uFF0C\u5DF2\u5907\u4EFD\u4E3A {file}",
  "notice.writeFailed": "\u5199\u5165\u4E13\u6CE8\u8BB0\u5F55\u5931\u8D25\uFF1A{message}",
  "stats.today": "\u4ECA\u65E5",
  "stats.focusRestHeading": "\u4E13\u6CE8\u4E0E\u4F11\u606F",
  "stats.focusTotal": "\u4E13\u6CE8",
  "stats.restTotal": "\u4F11\u606F",
  "stats.week": "\u672C\u5468",
  "stats.month": "\u672C\u6708",
  "stats.streak": "\u8FDE\u7EED",
  "stats.streakValue": "{days} \u5929",
  "stats.pomodoros": "{count} \u4E2A\u756A\u8304",
  "calendar.prev": "\u4E0A\u4E00\u6708",
  "calendar.next": "\u4E0B\u4E00\u6708",
  "calendar.today": "\u4ECA\u5929",
  "calendar.dayTotal": "\u5171 {duration}",
  "calendar.empty": "\u8FD9\u4E00\u5929\u8FD8\u6CA1\u6709\u8BB0\u5F55",
  "calendar.add": "\u624B\u52A8\u6DFB\u52A0",
  "calendar.addRest": "\u6DFB\u52A0\u4F11\u606F",
  "calendar.incomplete": "\u63D0\u524D\u7ED3\u675F",
  "calendar.editAria": "\u7F16\u8F91\u8BB0\u5F55",
  "calendar.deleteAria": "\u5220\u9664\u8BB0\u5F55",
  "record.rest": "\u4F11\u606F",
  "modal.addTitle": "\u6DFB\u52A0\u4E13\u6CE8\u8BB0\u5F55",
  "modal.addRestTitle": "\u6DFB\u52A0\u4F11\u606F\u8BB0\u5F55",
  "modal.editTitle": "\u7F16\u8F91\u8BB0\u5F55",
  "modal.day": "\u65E5\u671F",
  "modal.mode": "\u6A21\u5F0F",
  "modal.startTime": "\u5F00\u59CB\u65F6\u95F4",
  "modal.endTime": "\u7ED3\u675F\u65F6\u95F4",
  "modal.duration": "\u65F6\u957F\uFF08\u5206\u949F\uFF09",
  "modal.completed": "\u8BA1\u4E3A\u5DF2\u5B8C\u6210",
  "modal.tag": "\u6807\u7B7E",
  "modal.tagPlaceholder": "\u5348\u7761\u3001\u5403\u996D\u3001\u6563\u6B65\u2026\u2026",
  "modal.save": "\u4FDD\u5B58",
  "modal.cancel": "\u53D6\u6D88",
  "modal.delete": "\u5220\u9664",
  "modal.deleteTitle": "\u5220\u9664\u8FD9\u6761\u8BB0\u5F55\uFF1F",
  "modal.deleteBody": "{day} \u7684 {duration} \u5C06\u4ECE\u8BB0\u5F55\u4E2D\u79FB\u9664",
  "modal.invalidRange": "\u7ED3\u675F\u65F6\u95F4\u9700\u8981\u665A\u4E8E\u5F00\u59CB\u65F6\u95F4",
  "settings.timerHeading": "\u8BA1\u65F6",
  "settings.focusLength": "\u4E13\u6CE8\u65F6\u957F",
  "settings.focusLengthDesc": "\u6BCF\u4E2A\u756A\u8304\u7684\u5206\u949F\u6570",
  "settings.shortBreak": "\u77ED\u4F11\u606F",
  "settings.shortBreakDesc": "\u4E00\u4E2A\u756A\u8304\u7ED3\u675F\u540E\u7684\u4F11\u606F\u5206\u949F\u6570",
  "settings.longBreak": "\u957F\u4F11\u606F",
  "settings.longBreakDesc": "\u5B8C\u6210\u4E00\u8F6E\u540E\u7684\u4F11\u606F\u5206\u949F\u6570",
  "settings.longBreakInterval": "\u957F\u4F11\u606F\u95F4\u9694",
  "settings.longBreakIntervalDesc": "\u591A\u5C11\u4E2A\u756A\u8304\u4E4B\u540E\u8FDB\u5165\u957F\u4F11\u606F",
  "settings.autoCycle": "\u81EA\u52A8\u5FAA\u73AF",
  "settings.autoCycleDesc": "\u4E00\u4E2A\u9636\u6BB5\u7ED3\u675F\u540E\u81EA\u52A8\u5F00\u59CB\u4E0B\u4E00\u9636\u6BB5",
  "settings.defaultMode": "\u9ED8\u8BA4\u6A21\u5F0F",
  "settings.defaultModeDesc": "\u6253\u5F00\u9762\u677F\u65F6\u9ED8\u8BA4\u9009\u4E2D\u7684\u6A21\u5F0F",
  "settings.minSession": "\u6700\u77ED\u8BB0\u5F55\u65F6\u957F",
  "settings.minSessionDesc": "\u5355\u4F4D\u79D2\u3002\u77ED\u4E8E\u6B64\u957F\u5EA6\u7684\u7247\u6BB5\u4E0D\u4F1A\u88AB\u8BB0\u5F55\uFF0C\u586B 0 \u8868\u793A\u5168\u90E8\u8BB0\u5F55",
  "settings.dailyGoal": "\u6BCF\u65E5\u76EE\u6807",
  "settings.dailyGoalDesc": "\u5355\u4F4D\u5206\u949F\u3002\u7528\u4E8E\u65E5\u5386\u914D\u8272\u6DF1\u6D45\u4E0E\u4ECA\u65E5\u63D0\u793A",
  "settings.notificationsHeading": "\u63D0\u9192",
  "settings.sound": "\u7ED3\u675F\u65F6\u64AD\u653E\u63D0\u793A\u97F3",
  "settings.soundDesc": "\u9636\u6BB5\u7ED3\u675F\u65F6\u64AD\u653E\u4E00\u58F0\u77ED\u63D0\u793A\u97F3\u3002\u624B\u673A\u5728\u540E\u53F0\u65F6\u53EF\u80FD\u88AB\u7CFB\u7EDF\u9759\u97F3",
  "settings.vibrate": "\u7ED3\u675F\u65F6\u632F\u52A8",
  "settings.vibrateDesc": "\u4EC5\u5728\u652F\u6301\u632F\u52A8\u7684\u8BBE\u5907\u4E0A\u751F\u6548",
  "settings.notice": "\u7ED3\u675F\u65F6\u5F39\u51FA\u901A\u77E5",
  "settings.storageHeading": "\u5B58\u50A8",
  "settings.dataFolder": "\u6570\u636E\u6587\u4EF6\u5939",
  "settings.dataFolderDesc": "\u5E93\u5185\u7528\u4E8E\u5B58\u653E\u6BCF\u65E5\u4E13\u6CE8\u8BB0\u5F55\u7B14\u8BB0\u7684\u6587\u4EF6\u5939\u3002\u7981\u7528\u6216\u5378\u8F7D\u63D2\u4EF6\u90FD\u4E0D\u4F1A\u5F71\u54CD\u8FD9\u4E9B\u7B14\u8BB0",
  "settings.weekStart": "\u6BCF\u5468\u8D77\u59CB\u65E5",
  "settings.weekStartSunday": "\u5468\u65E5",
  "settings.weekStartMonday": "\u5468\u4E00",
  "settings.aboutHeading": "\u5173\u4E8E",
  "settings.dataLocation": "\u8BB0\u5F55\u4F4D\u7F6E",
  "settings.dataLocationDesc": "\u6BCF\u5929\u4E00\u4E2A\u7B14\u8BB0\uFF0C\u8DEF\u5F84\u5F62\u5982 {path}\u3002\u53EA\u6709\u5F53\u4F60\u60F3\u5F7B\u5E95\u6E05\u7A7A\u5386\u53F2\u65F6\u624D\u5220\u9664\u8BE5\u6587\u4EF6\u5939",
  "settings.diaryHeading": "\u65E5\u8BB0",
  "settings.diaryFolder": "\u65E5\u8BB0\u6587\u4EF6\u5939",
  "settings.diaryFolderDesc": "\u7559\u7A7A\u5219\u81EA\u52A8\u8BFB\u53D6\u300C\u65E5\u8BB0\u300D\u6838\u5FC3\u63D2\u4EF6\u7684\u914D\u7F6E",
  "settings.diaryFormat": "\u65E5\u8BB0\u6587\u4EF6\u540D\u683C\u5F0F",
  "settings.diaryFormatDesc": "\u7559\u7A7A\u5219\u81EA\u52A8\u8BFB\u53D6\u3002\u5360\u4F4D\u7B26\uFF1AYYYY MM DD",
  "view.timer": "\u8BA1\u65F6\u5668",
  "command.diary": "\u6253\u5F00\u65E5\u8BB0\u65E5\u5386",
  "command.addManual": "\u624B\u52A8\u6DFB\u52A0\u4E13\u6CE8\u8BB0\u5F55",
  "habit.today": "\u4ECA\u5929",
  "report.heading": "\u4E13\u6CE8\u62A5\u544A",
  "report.totalWeek": "\u672C\u5468",
  "report.sessions": "\u756A\u8304\u6570",
  "report.avg": "\u65E5\u5747",
  "status.idle": "\u8BA1\u65F6\u5668\u7A7A\u95F2",
  "ribbon.timer": "\u6253\u5F00\u8BA1\u65F6\u5668\u9762\u677F",
  "command.openTimer": "\u5728\u53F3\u4FA7\u8FB9\u680F\u6253\u5F00\u8BA1\u65F6\u5668\u9762\u677F",
  "stats.title": "\u4E13\u6CE8\u7EDF\u8BA1",
  "calendar.openDiary": "\u6253\u5F00\u5F53\u65E5\u65E5\u8BB0",
  "calendar.createDiary": "\u65B0\u5EFA\u5F53\u65E5\u65E5\u8BB0",
  // —— added ——
  "command.startStop": "\u5F00\u59CB / \u7ED3\u675F",
  "settings.openOnStartup": "\u542F\u52A8\u65F6\u6253\u5F00",
  "settings.openOnStartupDesc": "Obsidian \u542F\u52A8\u65F6\uFF0C\u81EA\u52A8\u5728\u53F3\u4FA7\u8FB9\u680F\u6253\u5F00\u8BA1\u65F6\u5668\u9762\u677F",
  "timer.pressToStart": "\u70B9\u6570\u5B57\u5F00\u59CB\u4E13\u6CE8\uFF0C\u518D\u70B9\u4E00\u6B21\u7ED3\u675F",
  "ribbon.focusStats": "\u4E13\u6CE8\u7EDF\u8BA1\u9762\u677F",
  "command.openFocusStats": "\u6253\u5F00\u4E13\u6CE8\u7EDF\u8BA1",
  "settings.weekStartDesc": "\u65E5\u5386\u4E00\u5468\u4ECE\u54EA\u5929\u5F00\u59CB",
  "report.range": "{from} \u2013 {to}",
  "ratio.heading": "\u5F53\u65E5\u4E13\u6CE8\u4E0E\u4F11\u606F",
  "ratio.caption": "\u4E13\u6CE8 : \u4F11\u606F = {ratio}",
  "prompt.title": "\u8FD9\u6B21\u4E13\u6CE8\u505A\u4E86\u4EC0\u4E48\uFF1F",
  "prompt.meta": "{range} \xB7 {duration}",
  "prompt.what": "\u505A\u4E86\u4EC0\u4E48",
  "prompt.note": "\u5907\u6CE8",
  "prompt.notePlaceholder": "\u4E0B\u4E00\u6B65\u3001\u5361\u4F4F\u7684\u5730\u65B9\u3001\u60F3\u5230\u7684\u70B9\u5B50\u2026\u2026",
  "prompt.skip": "\u8DF3\u8FC7",
  "modal.note": "\u5907\u6CE8",
  "settings.promptFocus": "\u4E13\u6CE8\u7ED3\u675F\u540E\u8BB0\u4E00\u7B14",
  "settings.promptFocusDesc": "\u4E13\u6CE8\u7ED3\u675F\u540E\u5F39\u51FA\u7A97\u53E3\uFF0C\u53EF\u4EE5\u586B\u6807\u7B7E\u4E0E\u5907\u6CE8"
};
var WEEKDAY_NAMES = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  zh: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"]
};
var MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function monthLabel(locale, year, month) {
  if (locale === "zh")
    return `${year} \u5E74 ${month + 1} \u6708`;
  return `${MONTH_NAMES[month]} ${year}`;
}
var lang = "en";
function detectLocale() {
  const raw = (0, import_obsidian.getLanguage)() || window.navigator.language || "en";
  return raw.toLowerCase().startsWith("zh") ? "zh" : "en";
}
function initLocale() {
  lang = detectLocale();
}
function currentLocale() {
  return lang;
}
function t(key, vars) {
  var _a, _b;
  const dict = lang === "zh" ? ZH : EN;
  const template = (_b = (_a = dict[key]) != null ? _a : EN[key]) != null ? _b : key;
  if (!vars)
    return template;
  return template.replace(/\{(\w+)\}/g, (match, name) => {
    const value = vars[name];
    return value === void 0 ? match : String(value);
  });
}
function weekdays() {
  return WEEKDAY_NAMES[lang];
}
function monthTitle(year, month) {
  return monthLabel(lang, year, month);
}

// src/storage.ts
var import_obsidian2 = require("obsidian");

// src/utils.ts
function pad(n) {
  return n < 10 ? `0${n}` : String(n);
}
function genId() {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}-${rand}`;
}
function dateKey(ms) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
var dateKeyOf = dateKey;
function todayKey() {
  return dateKey(Date.now());
}
function parseDateKey(key) {
  const [y, m, d] = key.split("-").map((n) => Number.parseInt(n, 10));
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}
function isDateKey(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
function addDays(key, delta) {
  const d = parseDateKey(key);
  d.setDate(d.getDate() + delta);
  return dateKey(d.getTime());
}
function monthDays(year, month) {
  const out = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    out.push(dateKey(d.getTime()));
    d.setDate(d.getDate() + 1);
  }
  return out;
}
function weekDays(key, weekStart) {
  const offset = (parseDateKey(key).getDay() - weekStart + 7) % 7;
  const first = addDays(key, -offset);
  return Array.from({ length: 7 }, (_, i) => addDays(first, i));
}
function monthOffset(year, month, weekStart) {
  return (new Date(year, month, 1).getDay() - weekStart + 7) % 7;
}
function clock(ms) {
  const d = new Date(ms);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function formatClock(totalSec) {
  const t2 = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(t2 / 3600);
  const m = Math.floor(t2 % 3600 / 60);
  const s = t2 % 60;
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
function formatDuration(totalSec) {
  const t2 = Math.max(0, Math.floor(totalSec));
  if (t2 < 60)
    return `${t2}s`;
  const h = Math.floor(t2 / 3600);
  const m = Math.round(t2 % 3600 / 60);
  if (h === 0)
    return `${m}m`;
  if (m === 0)
    return `${h}h`;
  return `${h}h ${m}m`;
}
function toMinutes(totalSec) {
  return Math.round(totalSec / 60);
}
function dateAtMinutes(key, minutes) {
  const d = parseDateKey(key);
  d.setMinutes(minutes);
  return d.getTime();
}
function sumFocusDuration(records) {
  return records.reduce((sum, r) => r.kind === "focus" ? sum + r.durationSec : sum, 0);
}
function sumRestDuration(records) {
  return records.reduce((sum, r) => r.kind === "rest" && !r.deleted ? sum + r.durationSec : sum, 0);
}
function focusRecords(records) {
  return records.filter((r) => r.kind === "focus");
}
function restRecords(records) {
  return records.filter((r) => r.kind === "rest" && !r.deleted);
}
function allRestRecords(records) {
  return records.filter((r) => r.kind === "rest");
}
function visibleRecords(records) {
  return records.filter((r) => !(r.kind === "rest" && r.deleted));
}
function removeRecord(records, id) {
  const target = records.find((r) => r.id === id);
  if (!target)
    return records;
  if (target.kind !== "rest")
    return records.filter((r) => r.id !== id);
  const tombstone = { ...target, deleted: true, updatedAt: Date.now() };
  return records.map((r) => r.id === id ? tombstone : r);
}
function sortRecords(records) {
  return [...records].sort((a, b) => a.start - b.start);
}
function pomodoroRecords(records) {
  return focusRecords(records).filter((r) => r.mode === "pomodoro");
}
function upsertRecord(records, record) {
  const idx = records.findIndex((r) => r.id === record.id);
  if (idx === -1)
    return [...records, record];
  const existing = records[idx];
  const chosen = record.updatedAt >= existing.updatedAt ? record : existing;
  const copy = [...records];
  copy[idx] = chosen;
  return copy;
}
function makeRestRecord(start, end, tag = DEFAULT_REST_TAG) {
  const now = Date.now();
  return {
    id: genId(),
    kind: "rest",
    tag: tag.trim().length > 0 ? tag.trim() : DEFAULT_REST_TAG,
    start,
    end,
    durationSec: Math.max(0, Math.round((end - start) / 1e3)),
    createdAt: now,
    updatedAt: now
  };
}
function syncRestRecords(records) {
  const focus = focusRecords(records).sort((a, b) => a.start - b.start);
  const rest = allRestRecords(records);
  const out = [...focus, ...rest];
  for (let i = 0; i < focus.length - 1; i++) {
    const start = focus[i].end;
    const end = focus[i + 1].start;
    if (end <= start)
      continue;
    const exists = out.some((r) => r.kind === "rest" && r.start === start && r.end === end);
    if (!exists)
      out.push(makeRestRecord(start, end));
  }
  return sortRecords(out);
}

// src/storage.ts
var CODE_FENCE = "```";
var JSON_RE = /```json\s*([\s\S]*?)```/;
function parent(path) {
  const idx = path.lastIndexOf("/");
  return idx <= 0 ? "" : path.slice(0, idx);
}
function parseRecord(raw) {
  if (typeof raw !== "object" || raw === null)
    return null;
  const o = raw;
  const id = typeof o.id === "string" ? o.id : null;
  const start = typeof o.start === "number" ? o.start : null;
  const end = typeof o.end === "number" ? o.end : null;
  if (id === null || start === null || end === null)
    return null;
  const durationSec = typeof o.durationSec === "number" && o.durationSec >= 0 ? Math.round(o.durationSec) : Math.max(0, Math.round((end - start) / 1e3));
  const createdAt = typeof o.createdAt === "number" ? o.createdAt : start;
  const updatedAt = typeof o.updatedAt === "number" ? o.updatedAt : start;
  if (o.kind === "rest") {
    const tag2 = typeof o.tag === "string" && o.tag.trim().length > 0 ? o.tag.trim() : "\u4F11\u606F";
    const deleted = o.deleted === true ? true : void 0;
    return { id, kind: "rest", tag: tag2, start, end, durationSec, createdAt, updatedAt, deleted };
  }
  const mode = o.mode === "stopwatch" ? "stopwatch" : "pomodoro";
  const phase = o.phase === "short" || o.phase === "long" ? o.phase : "focus";
  const tag = typeof o.tag === "string" && o.tag.trim().length > 0 ? o.tag.trim() : DEFAULT_FOCUS_TAG;
  return {
    id,
    kind: "focus",
    mode,
    phase: mode === "pomodoro" ? phase : void 0,
    tag,
    start,
    end,
    durationSec,
    completed: o.completed !== false,
    note: typeof o.note === "string" ? o.note : void 0,
    createdAt,
    updatedAt
  };
}
var DayStore = class {
  constructor(app, getSettings) {
    this.app = app;
    this.getSettings = getSettings;
    this.cache = /* @__PURE__ */ new Map();
    this.queues = /* @__PURE__ */ new Map();
    this.lastSelfWrite = /* @__PURE__ */ new Map();
  }
  folderPath() {
    const raw = this.getSettings().dataFolder.trim();
    return (0, import_obsidian2.normalizePath)(raw.length > 0 ? raw : DEFAULT_SETTINGS.dataFolder);
  }
  dayFilePath(key) {
    return (0, import_obsidian2.normalizePath)(`${this.folderPath()}/${key.slice(0, 4)}/${key}.md`);
  }
  samplePath() {
    return this.dayFilePath(dateKey(Date.now()));
  }
  clearCache() {
    this.cache.clear();
  }
  /** Returns false when the change came from our own write (avoid re-render loop). */
  handleFileChange(path) {
    var _a, _b;
    const prefix = `${this.folderPath()}/`;
    if (!path.startsWith(prefix) || !path.endsWith(".md"))
      return false;
    const selfWrite = (_a = this.lastSelfWrite.get(path)) != null ? _a : 0;
    const isSelf = Date.now() - selfWrite < 2e3;
    const name = ((_b = path.split("/").pop()) != null ? _b : "").slice(0, -3);
    if (isDateKey(name))
      this.cache.delete(name);
    else
      this.cache.clear();
    return !isSelf;
  }
  async getDay(key) {
    const file = this.app.vault.getFileByPath(this.dayFilePath(key));
    if (!file) {
      this.cache.delete(key);
      return [];
    }
    const cached = this.cache.get(key);
    if (cached && cached.mtime === file.stat.mtime)
      return cached.records;
    const content = await this.app.vault.cachedRead(file);
    const parsed = this.parse(content);
    if (parsed.ok) {
      this.cache.set(key, { records: parsed.records, mtime: file.stat.mtime });
      return parsed.records;
    }
    new import_obsidian2.Notice(t("notice.parseFailed", { day: key }));
    return [];
  }
  async getDays(keys) {
    const entries = await Promise.all(keys.map(async (k) => [k, await this.getDay(k)]));
    return new Map(entries);
  }
  async addRecord(record) {
    const day = dateKey(record.start);
    await this.mutate(day, (records) => upsertRecord(records, record));
  }
  async updateRecord(previousDay, record) {
    const day = dateKey(record.start);
    if (day !== previousDay) {
      await this.mutate(previousDay, (records) => records.filter((r) => r.id !== record.id));
    }
    await this.mutate(day, (records) => upsertRecord(records, record));
  }
  async deleteRecord(day, id) {
    await this.mutate(day, (records) => removeRecord(records, id));
  }
  async getStreak() {
    const today = todayKey();
    let cursor = today;
    if (sumFocusDuration(await this.getDay(today)) === 0)
      cursor = dateKey(parseDateKey(today).getTime() - 864e5);
    let streak = 0;
    for (let i = 0; i < 400; i++) {
      const records = await this.getDay(cursor);
      if (sumFocusDuration(records) === 0)
        break;
      streak++;
      cursor = dateKey(parseDateKey(cursor).getTime() - 864e5);
    }
    return streak;
  }
  async mutate(day, fn) {
    await this.enqueue(day, async () => {
      const path = this.dayFilePath(day);
      let file = this.app.vault.getFileByPath(path);
      if (file) {
        const raw = await this.app.vault.read(file);
        if (!this.parse(raw).ok) {
          await this.backupCorrupted(file, day);
          file = null;
        }
      }
      try {
        if (!file) {
          await this.ensureFolder(parent(path));
          const records2 = syncRestRecords(sortRecords(fn([])));
          this.lastSelfWrite.set(path, Date.now());
          const created = await this.app.vault.create(path, this.serialize(day, records2));
          this.cache.set(day, { records: records2, mtime: created.stat.mtime });
          return;
        }
        let records = [];
        this.lastSelfWrite.set(path, Date.now());
        await this.app.vault.process(file, (raw) => {
          const parsed = this.parse(raw);
          records = syncRestRecords(sortRecords(fn(parsed.ok ? parsed.records : [])));
          return this.serialize(day, records);
        });
        this.cache.set(day, { records, mtime: file.stat.mtime });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        new import_obsidian2.Notice(t("notice.writeFailed", { message }));
        this.cache.delete(day);
        throw err;
      }
    });
  }
  enqueue(day, task) {
    var _a;
    const previous = (_a = this.queues.get(day)) != null ? _a : Promise.resolve();
    const next = previous.then(task, task);
    this.queues.set(day, next.catch(() => {
    }));
    return next;
  }
  async ensureFolder(path) {
    if (path.length === 0)
      return;
    const parts = path.split("/").filter((p) => p.length > 0);
    let current = "";
    for (const part of parts) {
      current = current.length > 0 ? `${current}/${part}` : part;
      if (!this.app.vault.getFolderByPath(current)) {
        try {
          await this.app.vault.createFolder(current);
        } catch (err) {
          if (!this.app.vault.getFolderByPath(current))
            throw err;
        }
      }
    }
  }
  async backupCorrupted(file, day) {
    const stamp = String(Date.now());
    const target = (0, import_obsidian2.normalizePath)(`${parent(file.path)}/${day}.corrupted-${stamp}.md`);
    try {
      await this.app.vault.rename(file, target);
      new import_obsidian2.Notice(t("notice.corrupted", { day, file: target }));
    } catch (err) {
      new import_obsidian2.Notice(t("notice.parseFailed", { day }));
      throw err;
    }
  }
  serialize(day, records) {
    const focusCount = focusRecords(records).length;
    const restCount = restRecords(records).length;
    const body = records.map((r) => `	${JSON.stringify(r)}`).join(",\n");
    const header = [
      "---",
      "thinkers: log",
      `date: ${day}`,
      `focus-minutes: ${toMinutes(sumFocusDuration(records))}`,
      `session-count: ${focusCount}`,
      `rest-minutes: ${toMinutes(sumRestDuration(records))}`,
      `rest-count: ${restCount}`,
      "---"
    ].join("\n");
    const array = records.length > 0 ? `[
${body}
]` : "[]";
    return `${header}

${CODE_FENCE}json
${array}
${CODE_FENCE}
`;
  }
  parse(content) {
    const match = JSON_RE.exec(content);
    const body = match ? match[1] : content.trim().startsWith("[") ? content : null;
    if (body === null)
      return { ok: true, records: [] };
    try {
      const parsed = JSON.parse(body.trim());
      if (!Array.isArray(parsed))
        return { ok: false, records: [] };
      return { ok: true, records: parsed.map(parseRecord).filter((r) => r !== null) };
    } catch (e) {
      return { ok: false, records: [] };
    }
  }
};

// src/engine.ts
var TimerEngine = class {
  constructor(getSettings, hooks) {
    this.getSettings = getSettings;
    this.hooks = hooks;
    this.runtime = null;
    this.pendingPhase = "focus";
    this.completedFocusRounds = 0;
    this.recoverySec = null;
    this.selectedMode = this.getSettings().defaultMode;
  }
  get mode() {
    var _a, _b;
    return (_b = (_a = this.runtime) == null ? void 0 : _a.mode) != null ? _b : this.selectedMode;
  }
  get isActive() {
    return this.runtime !== null;
  }
  get isRunning() {
    var _a;
    return ((_a = this.runtime) == null ? void 0 : _a.state) === "running";
  }
  get hasRecovery() {
    return this.recoverySec !== null;
  }
  setMode(mode) {
    if (this.runtime)
      return;
    this.selectedMode = mode;
    this.pendingPhase = "focus";
    this.hooks.onStateChange();
  }
  exportRuntime() {
    return this.runtime;
  }
  snapshot(now = Date.now()) {
    var _a;
    const runtime = this.runtime;
    const phase = (_a = runtime == null ? void 0 : runtime.phase) != null ? _a : this.pendingPhase;
    const mode = this.mode;
    if (!runtime) {
      const targetMs2 = mode === "stopwatch" ? 0 : this.phaseDurationMs(phase);
      return {
        state: "idle",
        mode,
        phase,
        elapsedSec: 0,
        remainingSec: Math.round(targetMs2 / 1e3),
        targetSec: Math.round(targetMs2 / 1e3),
        progress: 0,
        round: this.completedFocusRounds + 1,
        nextPhase: this.pendingPhase,
        recoverySec: this.recoverySec
      };
    }
    const elapsed = this.elapsedMs(now);
    const targetMs = runtime.targetMs;
    return {
      state: runtime.state,
      mode: runtime.mode,
      phase: runtime.phase,
      elapsedSec: Math.floor(elapsed / 1e3),
      remainingSec: targetMs > 0 ? Math.max(0, Math.ceil((targetMs - elapsed) / 1e3)) : 0,
      targetSec: Math.round(targetMs / 1e3),
      progress: targetMs > 0 ? Math.min(1, elapsed / targetMs) : 0,
      round: runtime.phase === "focus" ? this.completedFocusRounds + 1 : this.completedFocusRounds,
      nextPhase: this.pendingPhase,
      recoverySec: this.recoverySec
    };
  }
  start(phase) {
    this.recoverySec = null;
    const mode = this.selectedMode;
    const actualPhase = mode === "stopwatch" ? "focus" : phase != null ? phase : this.pendingPhase;
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
      pomodoroIndex: this.completedFocusRounds
    };
    this.hooks.onStateChange();
  }
  pause() {
    const rt = this.runtime;
    if (!rt || rt.state !== "running")
      return;
    rt.state = "paused";
    rt.pausedAt = Date.now();
    this.hooks.onStateChange();
  }
  resume() {
    const rt = this.runtime;
    if (!rt || rt.state !== "paused")
      return;
    if (rt.pausedAt !== null)
      rt.accumulatedPausedMs += Date.now() - rt.pausedAt;
    rt.pausedAt = null;
    rt.state = "running";
    this.recoverySec = null;
    this.hooks.onStateChange();
  }
  toggle() {
    if (!this.runtime) {
      this.start();
      return;
    }
    this.runtime.state === "running" ? this.pause() : this.resume();
  }
  stop() {
    const rt = this.runtime;
    if (!rt)
      return;
    const now = Date.now();
    const sec = Math.round(this.elapsedMs(now) / 1e3);
    if (rt.mode === "stopwatch" || rt.phase === "focus") {
      this.store(rt, now, sec, rt.mode === "stopwatch");
    }
    this.runtime = null;
    this.pendingPhase = "focus";
    this.recoverySec = null;
    this.hooks.onStateChange();
  }
  reset() {
    this.runtime = null;
    this.pendingPhase = "focus";
    this.recoverySec = null;
    this.hooks.onStateChange();
  }
  skipBreak() {
    const rt = this.runtime;
    if (!rt || rt.mode !== "pomodoro" || rt.phase === "focus")
      return;
    this.runtime = null;
    this.pendingPhase = "focus";
    this.start("focus");
  }
  /** Returns true when a running phase completed during this tick. */
  tick(now = Date.now()) {
    const rt = this.runtime;
    if (!rt || rt.state !== "running" || rt.targetMs <= 0)
      return false;
    if (this.elapsedMs(now) < rt.targetMs)
      return false;
    this.completePhase(true);
    return true;
  }
  restore(runtime) {
    if (!runtime)
      return "none";
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
      this.recoverySec = Math.round(this.elapsedMs(now) / 1e3);
      this.hooks.onStateChange();
      return "pending";
    }
    this.hooks.onStateChange();
    return "none";
  }
  resolveRecovery(action) {
    this.recoverySec = null;
    if (action === "resume") {
      this.resume();
    } else if (action === "save") {
      this.stop();
    } else {
      this.reset();
    }
    this.hooks.onStateChange();
  }
  dismissRecovery() {
    this.recoverySec = null;
  }
  elapsedMs(now) {
    const rt = this.runtime;
    if (!rt)
      return 0;
    const end = rt.state === "paused" && rt.pausedAt !== null ? rt.pausedAt : now;
    return Math.max(0, end - rt.startedAt - rt.accumulatedPausedMs);
  }
  phaseDurationMs(phase) {
    const s = this.getSettings();
    const minutes = phase === "focus" ? s.focusMinutes : phase === "short" ? s.shortBreakMinutes : s.longBreakMinutes;
    return Math.max(1, Math.round(minutes * 60)) * 1e3;
  }
  completePhase(autoCycled) {
    const rt = this.runtime;
    if (!rt)
      return;
    const s = this.getSettings();
    const end = rt.startedAt + rt.accumulatedPausedMs + rt.targetMs;
    const durationSec = Math.round(rt.targetMs / 1e3);
    const finishedPhase = rt.phase;
    if (finishedPhase === "focus") {
      this.store(rt, end, durationSec, true);
      this.completedFocusRounds++;
    }
    let next;
    if (finishedPhase === "focus") {
      const interval = Math.max(1, Math.round(s.longBreakInterval));
      next = this.completedFocusRounds % interval === 0 ? "long" : "short";
    } else {
      next = "focus";
      if (finishedPhase === "long")
        this.completedFocusRounds = 0;
    }
    this.runtime = null;
    this.pendingPhase = next;
    if (autoCycled && s.autoCycle)
      this.start(next);
    this.hooks.onPhaseComplete(finishedPhase, next, autoCycled && s.autoCycle);
    this.hooks.onStateChange();
  }
  store(rt, end, durationSec, completed) {
    const min = Math.max(0, Math.round(this.getSettings().minSessionSeconds));
    if (durationSec < min || durationSec <= 0) {
      this.hooks.onSessionTooShort(durationSec);
      return;
    }
    const now = Date.now();
    const record = {
      id: rt.sessionId,
      kind: "focus",
      mode: rt.mode,
      phase: rt.mode === "pomodoro" ? rt.phase : void 0,
      tag: DEFAULT_FOCUS_TAG,
      start: rt.startedAt,
      end,
      durationSec,
      completed,
      createdAt: now,
      updatedAt: now
    };
    this.hooks.onSessionRecorded(record);
  }
};

// src/sidebar-view.ts
var import_obsidian3 = require("obsidian");

// src/audio.ts
var audioContext = null;
var audioUnavailable = false;
function getAudioContextCtor() {
  var _a, _b;
  const win = window;
  return (_b = (_a = win.AudioContext) != null ? _a : win.webkitAudioContext) != null ? _b : null;
}
function unlockAudio() {
  if (audioUnavailable)
    return;
  try {
    if (!audioContext) {
      const Ctor = getAudioContextCtor();
      if (!Ctor) {
        audioUnavailable = true;
        return;
      }
      audioContext = new Ctor();
    }
    if (audioContext.state === "suspended")
      void audioContext.resume();
  } catch (e) {
    audioUnavailable = true;
    audioContext = null;
  }
}
function playChime(notes = 2) {
  if (!audioContext || audioContext.state !== "running")
    return false;
  try {
    const start = audioContext.currentTime;
    for (let i = 0; i < notes; i++) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = i === 0 ? 880 : 1174;
      osc.connect(gain);
      gain.connect(audioContext.destination);
      const at = start + i * 0.26;
      gain.gain.setValueAtTime(1e-4, at);
      gain.gain.exponentialRampToValueAtTime(0.25, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(1e-4, at + 0.2);
      osc.start(at);
      osc.stop(at + 0.22);
    }
    return true;
  } catch (e) {
    return false;
  }
}
function vibrate(ms = 220) {
  try {
    if (typeof window.navigator.vibrate === "function")
      window.navigator.vibrate(ms);
  } catch (e) {
  }
}
function disposeAudio() {
  if (audioContext) {
    audioContext.close().catch(() => {
    });
    audioContext = null;
  }
  audioUnavailable = false;
}

// src/timer-panel.ts
var RING_RADIUS = 52;
var RING_LENGTH = 2 * Math.PI * RING_RADIUS;
var RING_ROTATION = "rotate(-90 60 60)";
var TimerPanel = class {
  constructor(root, deps) {
    this.root = root;
    this.deps = deps;
    this.timeText = null;
    this.ringProgress = null;
    this.phaseText = null;
  }
  refresh() {
    this.render();
  }
  onTick() {
    if (!this.deps.engine.isActive)
      return;
    this.updateTimerDisplay();
  }
  render() {
    const panel = this.root;
    panel.empty();
    panel.addClass("thinkers-view");
    const active = this.deps.engine.isActive;
    panel.toggleClass("thinkers-idle", !active);
    panel.toggleClass("thinkers-active", active);
    this.renderGauge(panel);
    this.renderModeLabel(panel);
    if (this.deps.engine.hasRecovery)
      this.renderRecovery(panel);
    this.updateTimerDisplay();
  }
  /**
   * The circle and the clock inside it. The clock is the only control: press it to start,
   * press it again to end.
   */
  renderGauge(panel) {
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
    time.addEventListener("click", () => this.toggleSession());
    time.addEventListener("keydown", (evt) => {
      if (evt.key === "Enter" || evt.key === " ") {
        evt.preventDefault();
        this.toggleSession();
      }
    });
    this.timeText = time;
    this.ringProgress = progress;
  }
  /** The mode, written small under the circle. Pressing it swaps the two modes. */
  renderModeLabel(panel) {
    const wrap = panel.createDiv({ cls: "thinkers-modelabel" });
    const label = wrap.createDiv({ cls: "thinkers-phase" });
    this.phaseText = label;
    if (this.deps.engine.isActive)
      return;
    label.addClass("thinkers-phase-switch");
    label.setAttribute("role", "button");
    label.setAttribute("tabindex", "0");
    label.setAttribute("title", t("timer.switchMode"));
    const toggleMode = () => {
      const next = this.deps.engine.mode === "pomodoro" ? "stopwatch" : "pomodoro";
      this.deps.engine.setMode(next);
    };
    label.addEventListener("click", toggleMode);
    label.addEventListener("keydown", (evt) => {
      if (evt.key === "Enter" || evt.key === " ") {
        evt.preventDefault();
        toggleMode();
      }
    });
  }
  renderRecovery(panel) {
    var _a;
    const banner = panel.createDiv({ cls: "thinkers-recovery" });
    const sec = (_a = this.deps.engine.snapshot().recoverySec) != null ? _a : 0;
    banner.createDiv({ cls: "thinkers-recovery-title", text: t("restore.heading") });
    banner.createDiv({
      cls: "thinkers-recovery-body",
      text: t("restore.body", { duration: formatDuration(sec) })
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
  toggleSession() {
    if (this.deps.engine.hasRecovery)
      return;
    if (this.deps.engine.isActive) {
      this.deps.engine.stop();
      return;
    }
    unlockAudio();
    this.deps.engine.start();
  }
  makeButton(parent2, label, cls, onClick) {
    const btn = parent2.createEl("button", { cls: `thinkers-btn ${cls}`.trim() });
    btn.setText(label);
    btn.addEventListener("click", onClick);
  }
  updateTimerDisplay() {
    var _a;
    const snapshot = this.deps.engine.snapshot();
    const value = snapshot.mode === "stopwatch" ? snapshot.elapsedSec : snapshot.state === "idle" ? snapshot.targetSec : snapshot.remainingSec;
    (_a = this.timeText) == null ? void 0 : _a.setText(formatClock(value));
    if (this.ringProgress) {
      const offset = RING_LENGTH * (1 - snapshot.progress);
      this.ringProgress.setAttribute("stroke-dashoffset", String(offset));
    }
    if (this.phaseText) {
      this.phaseText.setText(snapshot.mode === "stopwatch" ? t("mode.stopwatch") : t("mode.pomodoro"));
    }
  }
};

// src/sidebar-view.ts
var TIMER_VIEW_TYPE = "thinkers-timer-view";
var LEGACY_TIMER_VIEW_TYPES = ["depthinker-timer-view", "depthinker-sidebar-view"];
var TIMER_VIEW_TYPES = [TIMER_VIEW_TYPE, ...LEGACY_TIMER_VIEW_TYPES];
var TimerSidebarView = class extends import_obsidian3.ItemView {
  constructor(leaf, deps) {
    super(leaf);
    this.deps = deps;
    this.timerPanel = null;
  }
  getViewType() {
    return TIMER_VIEW_TYPE;
  }
  getDisplayText() {
    return t("view.timer");
  }
  getIcon() {
    return "timer";
  }
  async onOpen() {
    this.build();
  }
  /** Full rebuild — used when a setting that changes the panel changes. */
  refresh() {
    this.build();
  }
  /** Only the numbers change while the clock runs. */
  refreshTimer() {
    var _a;
    (_a = this.timerPanel) == null ? void 0 : _a.refresh();
  }
  onTick() {
    var _a;
    (_a = this.timerPanel) == null ? void 0 : _a.onTick();
  }
  async onClose() {
    this.timerPanel = null;
    this.containerEl.empty();
  }
  build() {
    const root = this.containerEl;
    root.empty();
    root.addClass("thinkers-sidebar-view");
    const section = root.createDiv({ cls: "thinkers-sidebar-section" });
    const body = section.createDiv({ cls: "thinkers-sidebar-body" });
    this.timerPanel = new TimerPanel(body, {
      engine: this.deps.engine,
      getSettings: this.deps.getSettings
    });
    this.timerPanel.refresh();
  }
};

// src/focus-view.ts
var import_obsidian7 = require("obsidian");

// src/calendar.ts
var import_obsidian6 = require("obsidian");

// src/modal.ts
var import_obsidian4 = require("obsidian");
var MINUTES_PER_DAY = 1440;
function openRecordModal(deps) {
  new RecordModal(deps.app, deps).open();
}
function openDeleteConfirm(app, dayKey, record, onConfirmed) {
  new ConfirmDeleteModal(app, dayKey, record, onConfirmed).open();
}
var RecordModal = class extends import_obsidian4.Modal {
  constructor(app, deps) {
    var _a, _b, _c;
    super(app);
    this.mode = "pomodoro";
    this.phase = "focus";
    this.completed = true;
    this.tag = DEFAULT_REST_TAG;
    this.note = "";
    this.modeSetting = null;
    this.phaseSetting = null;
    this.completedSetting = null;
    this.tagText = null;
    this.endText = null;
    this.durationText = null;
    this.storage = deps.storage;
    this.getSettings = deps.getSettings;
    this.existing = deps.existing;
    this.onChanged = deps.onChanged;
    if (deps.existing) {
      this.type = deps.existing.kind;
      this.tag = deps.existing.tag;
      this.note = (_a = deps.existing.note) != null ? _a : "";
      if (deps.existing.kind === "focus") {
        this.mode = deps.existing.mode;
        this.phase = (_b = deps.existing.phase) != null ? _b : "focus";
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
      this.dayKey = (_c = deps.dayKey) != null ? _c : todayKey();
      const d = /* @__PURE__ */ new Date();
      this.startMins = d.getHours() * 60 + d.getMinutes();
      this.durationMin = this.type === "rest" ? Math.max(1, Math.round(this.getSettings().shortBreakMinutes)) : Math.max(1, Math.round(this.getSettings().focusMinutes));
      this.completed = true;
      this.tag = this.defaultTag();
    }
  }
  defaultTag() {
    return this.type === "rest" ? DEFAULT_REST_TAG : DEFAULT_FOCUS_TAG;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    this.titleEl.setText(this.existing ? t("modal.editTitle") : this.type === "rest" ? t("modal.addRestTitle") : t("modal.addTitle"));
    this.buildForm(contentEl);
    new import_obsidian4.Setting(contentEl).addButton((btn) => btn.setButtonText(t("modal.save")).setCta().onClick(() => void this.save())).addButton((btn) => btn.setButtonText(t("modal.cancel")).onClick(() => this.close()));
  }
  buildForm(contentEl) {
    if (!this.existing) {
      new import_obsidian4.Setting(contentEl).setName(t("modal.mode")).addDropdown((dd) => {
        dd.addOption("focus", t("modal.addTitle"));
        dd.addOption("rest", t("modal.addRestTitle"));
        dd.setValue(this.type);
        dd.onChange((value) => {
          var _a;
          const previousDefault = this.defaultTag();
          this.type = value === "rest" ? "rest" : "focus";
          const nextDefault = this.defaultTag();
          if (this.tag.trim() === "" || this.tag === previousDefault) {
            this.tag = nextDefault;
            (_a = this.tagText) == null ? void 0 : _a.setValue(nextDefault);
          }
          this.updateVisibility();
        });
      });
    }
    this.modeSetting = new import_obsidian4.Setting(contentEl).setName(t("modal.mode")).addDropdown((dd) => {
      dd.addOption("pomodoro", t("mode.pomodoro"));
      dd.addOption("stopwatch", t("mode.stopwatch"));
      dd.setValue(this.mode);
      dd.onChange((value) => {
        this.mode = value === "stopwatch" ? "stopwatch" : "pomodoro";
        this.updateVisibility();
      });
    });
    this.phaseSetting = new import_obsidian4.Setting(contentEl).setName(t("phase.focus")).addDropdown((dd) => {
      dd.addOption("focus", t("phase.focus"));
      dd.addOption("short", t("phase.short"));
      dd.addOption("long", t("phase.long"));
      dd.setValue(this.phase);
      dd.onChange((value) => {
        this.phase = value;
      });
    });
    new import_obsidian4.Setting(contentEl).setName(t("modal.tag")).addText((txt) => {
      txt.setPlaceholder(t("modal.tagPlaceholder"));
      txt.setValue(this.tag);
      txt.onChange((value) => {
        this.tag = value;
      });
      this.tagText = txt;
    });
    new import_obsidian4.Setting(contentEl).setName(t("modal.note")).addTextArea((area) => {
      area.setPlaceholder(t("prompt.notePlaceholder"));
      area.setValue(this.note);
      area.inputEl.rows = 3;
      area.onChange((value) => {
        this.note = value;
      });
    });
    new import_obsidian4.Setting(contentEl).setName(t("modal.day")).addText((txt) => {
      txt.inputEl.type = "date";
      txt.setValue(this.dayKey);
      txt.onChange((value) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(value))
          this.dayKey = value;
      });
    });
    new import_obsidian4.Setting(contentEl).setName(t("modal.startTime")).addText((txt) => {
      txt.inputEl.type = "time";
      txt.setValue(this.minutesToClock(this.startMins));
      txt.onChange((value) => this.onStartChanged(value));
    });
    new import_obsidian4.Setting(contentEl).setName(t("modal.endTime")).addText((txt) => {
      txt.inputEl.type = "time";
      txt.setValue(this.minutesToClock(this.startMins + this.durationMin));
      txt.onChange((value) => this.onEndChanged(value));
      this.endText = txt;
    });
    new import_obsidian4.Setting(contentEl).setName(t("modal.duration")).addText((txt) => {
      txt.inputEl.type = "number";
      txt.inputEl.min = "1";
      txt.setValue(String(this.durationMin));
      txt.onChange((value) => this.onDurationChanged(value));
      this.durationText = txt;
    });
    this.completedSetting = new import_obsidian4.Setting(contentEl).setName(t("modal.completed")).addToggle((tgl) => {
      tgl.setValue(this.completed);
      tgl.onChange((value) => {
        this.completed = value;
      });
    });
    if (this.existing) {
      new import_obsidian4.Setting(contentEl).addButton((btn) => btn.setButtonText(t("modal.delete")).setDestructive().onClick(() => this.confirmDelete()));
    }
    this.updateVisibility();
  }
  updateVisibility() {
    var _a, _b, _c;
    const isRest = this.type === "rest";
    (_a = this.modeSetting) == null ? void 0 : _a.settingEl.toggleClass("thinkers-hidden", isRest);
    (_b = this.completedSetting) == null ? void 0 : _b.settingEl.toggleClass("thinkers-hidden", isRest);
    const hidePhase = isRest || this.mode !== "pomodoro";
    (_c = this.phaseSetting) == null ? void 0 : _c.settingEl.toggleClass("thinkers-hidden", hidePhase);
  }
  minutesToClock(mins) {
    const m = (mins % MINUTES_PER_DAY + MINUTES_PER_DAY) % MINUTES_PER_DAY;
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return `${h < 10 ? "0" : ""}${h}:${mm < 10 ? "0" : ""}${mm}`;
  }
  onStartChanged(value) {
    var _a;
    const mins = this.parseClock(value);
    if (mins === null)
      return;
    this.startMins = mins;
    (_a = this.endText) == null ? void 0 : _a.setValue(this.minutesToClock(this.startMins + this.durationMin));
  }
  onEndChanged(value) {
    var _a;
    const mins = this.parseClock(value);
    if (mins === null)
      return;
    let end = mins;
    if (end < this.startMins)
      end += MINUTES_PER_DAY;
    this.durationMin = Math.max(1, end - this.startMins);
    (_a = this.durationText) == null ? void 0 : _a.setValue(String(this.durationMin));
  }
  onDurationChanged(value) {
    var _a;
    const mins = Number.parseInt(value, 10);
    if (Number.isNaN(mins) || mins < 1)
      return;
    this.durationMin = mins;
    (_a = this.endText) == null ? void 0 : _a.setValue(this.minutesToClock(this.startMins + this.durationMin));
  }
  parseClock(value) {
    const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
    if (!match)
      return null;
    const h = Number.parseInt(match[1], 10);
    const m = Number.parseInt(match[2], 10);
    if (h > 23 || m > 59)
      return null;
    return h * 60 + m;
  }
  /** An empty note is stored as nothing at all, so the file stays readable. */
  noteValue() {
    const note = this.note.trim();
    return note.length > 0 ? note : void 0;
  }
  async save() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const start = dateAtMinutes(this.dayKey, this.startMins);
    const end = start + this.durationMin * 6e4;
    const durationSec = Math.round((end - start) / 1e3);
    if (durationSec <= 0) {
      new import_obsidian4.Notice(t("modal.invalidRange"));
      return;
    }
    const now = Date.now();
    let record;
    if (this.type === "rest") {
      record = {
        id: (_b = (_a = this.existing) == null ? void 0 : _a.id) != null ? _b : genId(),
        kind: "rest",
        tag: this.tag.trim().length > 0 ? this.tag.trim() : DEFAULT_REST_TAG,
        start,
        end,
        durationSec,
        note: this.noteValue(),
        createdAt: (_d = (_c = this.existing) == null ? void 0 : _c.createdAt) != null ? _d : now,
        updatedAt: now
      };
    } else {
      record = {
        id: (_f = (_e = this.existing) == null ? void 0 : _e.id) != null ? _f : genId(),
        kind: "focus",
        mode: this.mode,
        phase: this.mode === "pomodoro" ? this.phase : void 0,
        tag: this.tag.trim().length > 0 ? this.tag.trim() : DEFAULT_FOCUS_TAG,
        start,
        end,
        durationSec,
        completed: this.completed,
        note: this.noteValue(),
        createdAt: (_h = (_g = this.existing) == null ? void 0 : _g.createdAt) != null ? _h : now,
        updatedAt: now
      };
    }
    try {
      if (this.existing) {
        await this.storage.updateRecord(dateKeyOf(this.existing.start), record);
      } else {
        await this.storage.addRecord(record);
      }
    } catch (e) {
      return;
    }
    this.onChanged();
    this.close();
  }
  confirmDelete() {
    if (!this.existing)
      return;
    const day = dateKeyOf(this.existing.start);
    const target = this.existing;
    new ConfirmDeleteModal(this.app, day, target, () => {
      this.storage.deleteRecord(day, target.id).then(
        () => {
          this.onChanged();
          this.close();
        },
        () => {
        }
      );
    }).open();
  }
  onClose() {
    this.contentEl.empty();
  }
};
var ConfirmDeleteModal = class extends import_obsidian4.Modal {
  constructor(app, dayKey, record, onConfirmed) {
    super(app);
    this.dayKey = dayKey;
    this.record = record;
    this.onConfirmed = onConfirmed;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    this.titleEl.setText(t("modal.deleteTitle"));
    contentEl.createDiv().setText(t("modal.deleteBody", { day: this.dayKey, duration: formatDuration(this.record.durationSec) }));
    new import_obsidian4.Setting(contentEl).addButton(
      (btn) => btn.setButtonText(t("modal.delete")).setDestructive().onClick(() => {
        this.onConfirmed();
        this.close();
      })
    ).addButton((btn) => btn.setButtonText(t("modal.cancel")).onClick(() => this.close()));
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/diary.ts
var import_obsidian5 = require("obsidian");
var WEEKDAY_FULL = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  zh: ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"]
};
var WEEKDAY_SHORT = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  zh: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"]
};
function pad2(n) {
  return n < 10 ? `0${n}` : String(n);
}
async function loadDailyNotesConfig(app, settings) {
  var _a, _b, _c;
  let folder = settings.dailyNotesFolder.trim();
  let format = settings.dailyNotesFormat.trim();
  let template = "";
  try {
    const raw = await app.vault.adapter.read(`${app.vault.configDir}/daily-notes.json`);
    const cfg = JSON.parse(raw);
    if (folder.length === 0)
      folder = (_a = cfg.folder) != null ? _a : "";
    if (format.length === 0)
      format = (_b = cfg.format) != null ? _b : "YYYY-MM-DD";
    template = (_c = cfg.template) != null ? _c : "";
  } catch (e) {
    if (format.length === 0)
      format = "YYYY-MM-DD";
  }
  return { folder: folder.replace(/^\/+|\/+$/g, ""), format, template };
}
function fillDateTokens(template, date) {
  const locale = currentLocale();
  const weekdayFull = WEEKDAY_FULL[locale][date.getDay()];
  const weekdayShort = WEEKDAY_SHORT[locale][date.getDay()];
  const map = {
    YYYY: String(date.getFullYear()),
    MM: pad2(date.getMonth() + 1),
    M: String(date.getMonth() + 1),
    DD: pad2(date.getDate()),
    D: String(date.getDate()),
    dddd: weekdayFull,
    ddd: weekdayShort
  };
  return template.replace(/dddd|ddd|YYYY|MM|DD|M|D/g, (m) => {
    var _a;
    return (_a = map[m]) != null ? _a : m;
  });
}
function diaryPath(config, key) {
  const date = parseDateKey(key);
  const folder = fillDateTokens(config.folder, date);
  const name = fillDateTokens(config.format, date);
  const base = folder.length > 0 ? `${folder}/${name}` : name;
  return (0, import_obsidian5.normalizePath)(`${base}.md`);
}
async function openDiaryForDate(app, config, key) {
  const path = diaryPath(config, key);
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof import_obsidian5.TFile) {
    await app.workspace.getLeaf(false).openFile(existing);
    return;
  }
  const content = await templateContent(app, config, key);
  const file = await app.vault.create(path, content);
  await app.workspace.getLeaf(false).openFile(file);
}
async function templateContent(app, config, key) {
  if (config.template.length === 0)
    return "";
  const templateFile = app.vault.getAbstractFileByPath((0, import_obsidian5.normalizePath)(config.template));
  if (!(templateFile instanceof import_obsidian5.TFile))
    return "";
  const raw = await app.vault.read(templateFile);
  const date = parseDateKey(key);
  return raw.replace(/\{\{date\}\}/g, key).replace(/\{\{title\}\}/g, key).replace(/\{\{time\}\}/g, (/* @__PURE__ */ new Date()).toLocaleTimeString()).replace(/\{\{year\}\}/g, String(date.getFullYear())).replace(/\{\{month\}\}/g, pad2(date.getMonth() + 1)).replace(/\{\{day\}\}/g, pad2(date.getDate()));
}

// src/calendar.ts
var RATIO_RADIUS = 52;
var RATIO_LENGTH = 2 * Math.PI * RATIO_RADIUS;
var RATIO_ROTATION = "rotate(-90 60 60)";
function ratioText(focusSec, restSec) {
  if (focusSec <= 0)
    return "0 : 1";
  if (restSec <= 0)
    return "1 : 0";
  return `${(focusSec / restSec).toFixed(1)} : 1`;
}
function drawArc(el, share, from) {
  if (!el)
    return;
  el.setAttribute("stroke-dasharray", `${RATIO_LENGTH * share} ${RATIO_LENGTH}`);
  el.setAttribute("stroke-dashoffset", String(-RATIO_LENGTH * from));
}
var CalendarView = class {
  constructor(root, deps) {
    this.root = root;
    this.deps = deps;
    this.renderToken = 0;
    /** The day the ring below the focus/rest totals describes. Today until another is picked. */
    this.selectedKey = todayKey();
    const now = /* @__PURE__ */ new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth();
  }
  refresh() {
    this.render();
  }
  render() {
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
  renderStats() {
    const container = this.root.createDiv({ cls: "thinkers-stats" });
    const card = (labelKey) => {
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
  renderSplitStats() {
    const panel = this.root.createDiv({ cls: "thinkers-splitstats" });
    panel.createDiv({ cls: "thinkers-splitstats-title", text: t("stats.focusRestHeading") });
    const grid = panel.createDiv({ cls: "thinkers-splitstats-grid" });
    this.buildSplitColumn(grid, "week", t("stats.week"));
    this.buildSplitColumn(grid, "month", t("stats.month"));
  }
  buildSplitColumn(grid, period, title) {
    const col = grid.createDiv({ cls: "thinkers-splitstats-col" });
    col.createDiv({ cls: "thinkers-splitstats-col-title", text: title });
    const list = col.createDiv({ cls: "thinkers-splitstats-list" });
    for (const kind of ["focus", "rest"]) {
      const row = list.createDiv({ cls: `thinkers-splitstats-row thinkers-splitstats-${kind}` });
      row.createSpan({
        cls: "thinkers-splitstats-label",
        text: t(kind === "focus" ? "stats.focusTotal" : "stats.restTotal")
      });
      const value = row.createSpan({ cls: "thinkers-splitstats-value", text: "\u2014" });
      value.setAttribute("data-kind", `${period}-${kind}`);
    }
  }
  /**
   * The ring under the focus/rest totals. It answers "of the time I logged that day, how
   * much was focus and how much was rest", for the day selected in the grid below.
   */
  renderRatio() {
    const panel = this.root.createDiv({ cls: "thinkers-ratio" });
    const head = panel.createDiv({ cls: "thinkers-ratio-head" });
    head.createSpan({ cls: "thinkers-ratio-title", text: t("ratio.heading") });
    const picked = this.selectedKey === todayKey() ? `${this.selectedKey} \xB7 ${t("habit.today")}` : this.selectedKey;
    head.createSpan({ cls: "thinkers-ratio-day", text: picked });
    const body = panel.createDiv({ cls: "thinkers-ratio-body" });
    const gauge = body.createDiv({ cls: "thinkers-ratio-gauge" });
    const svg = createSvg("svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("class", "thinkers-ratio-ring");
    const arc = (cls) => {
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
    for (const kind of ["focus", "rest"]) {
      const row = legend.createDiv({ cls: "thinkers-ratio-legend-row" });
      row.createSpan({ cls: `thinkers-ratio-swatch thinkers-ratio-swatch-${kind}` });
      row.createSpan({
        cls: "thinkers-ratio-legend-label",
        text: t(kind === "focus" ? "stats.focusTotal" : "stats.restTotal")
      });
      const value = row.createSpan({ cls: "thinkers-ratio-value", text: "\u2014" });
      value.setAttribute("data-kind", kind);
    }
    panel.createDiv({ cls: "thinkers-ratio-caption", text: t("calendar.empty") });
  }
  renderNav() {
    const nav = this.root.createDiv({ cls: "thinkers-cal-nav" });
    const prev = nav.createEl("button", { cls: "thinkers-cal-btn" });
    prev.setAttribute("aria-label", t("calendar.prev"));
    (0, import_obsidian6.setIcon)(prev, "chevron-left");
    prev.addEventListener("click", () => this.shiftMonth(-1));
    nav.createDiv({ cls: "thinkers-cal-label", text: monthTitle(this.year, this.month) });
    const next = nav.createEl("button", { cls: "thinkers-cal-btn" });
    next.setAttribute("aria-label", t("calendar.next"));
    (0, import_obsidian6.setIcon)(next, "chevron-right");
    next.addEventListener("click", () => this.shiftMonth(1));
    const today = nav.createEl("button", { cls: "thinkers-cal-btn thinkers-cal-today" });
    today.setText(t("calendar.today"));
    today.addEventListener("click", () => this.goToToday());
  }
  shiftMonth(delta) {
    const d = new Date(this.year, this.month + delta, 1);
    this.year = d.getFullYear();
    this.month = d.getMonth();
    this.render();
  }
  goToToday() {
    const now = /* @__PURE__ */ new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth();
    this.selectedKey = todayKey();
    this.render();
  }
  renderWeekdayHeader(weekStart) {
    const row = this.root.createDiv({ cls: "thinkers-cal-weekdays" });
    const names = weekdays();
    for (let i = 0; i < 7; i++) {
      row.createSpan({ cls: "thinkers-cal-weekday", text: names[(weekStart + i) % 7] });
    }
  }
  /** Date plus a dot; the dot is the only place the amount of focus shows. */
  renderGrid(weekStart) {
    const grid = this.root.createDiv({ cls: "thinkers-cal-grid" });
    const offset = monthOffset(this.year, this.month, weekStart);
    for (let i = 0; i < offset; i++)
      grid.createDiv({ cls: "thinkers-day thinkers-day-blank" });
    const days = monthDays(this.year, this.month);
    const today = todayKey();
    for (const key of days) {
      const cell = grid.createDiv({ cls: "thinkers-day" });
      cell.setAttribute("data-day", key);
      if (key === today)
        cell.addClass("thinkers-day-today");
      if (key === this.selectedKey)
        cell.addClass("thinkers-day-selected");
      cell.createSpan({ cls: "thinkers-day-num", text: String(Number.parseInt(key.slice(8, 10), 10)) });
      cell.createSpan({ cls: "thinkers-day-dot" });
      cell.addEventListener("click", () => this.openDay(key));
    }
  }
  /** Pressing a day both picks it — the ring follows — and opens its records. */
  openDay(key) {
    this.selectedKey = key;
    this.render();
    new DayDetailModal(this.deps.app, key, {
      storage: this.deps.storage,
      getSettings: this.deps.getSettings,
      getDiaryConfig: this.deps.getDiaryConfig,
      onChanged: () => {
        this.deps.onChanged();
        this.render();
      }
    }).open();
  }
  async fillAsync() {
    var _a;
    const token = ++this.renderToken;
    const settings = this.deps.getSettings();
    const monthKeys = monthDays(this.year, this.month);
    const weekKeys = weekDays(todayKey(), settings.weekStart);
    const [monthMap, weekMap, selected] = await Promise.all([
      this.deps.storage.getDays(monthKeys),
      this.deps.storage.getDays(weekKeys),
      this.deps.storage.getDay(this.selectedKey)
    ]);
    if (token !== this.renderToken)
      return;
    const goal = Math.max(1, settings.dailyGoalMinutes * 60);
    for (const key of monthKeys) {
      const cell = this.root.querySelector(`.thinkers-day[data-day="${key}"]`);
      if (!cell)
        continue;
      const records = (_a = monthMap.get(key)) != null ? _a : [];
      const focusSec = sumFocusDuration(records);
      const level = focusSec === 0 ? 0 : Math.min(4, Math.ceil(focusSec / goal * 4));
      cell.addClass(`thinkers-heat-${level}`);
      cell.setAttribute("aria-label", focusSec > 0 ? formatDuration(focusSec) : key);
    }
    void this.fillStats(token, monthMap, weekMap);
    this.fillSplitStats(token, monthMap, weekMap);
    this.fillRatio(token, selected);
  }
  async fillStats(token, monthMap, weekMap) {
    var _a;
    const todayFocus = sumFocusDuration((_a = weekMap.get(todayKey())) != null ? _a : []);
    const weekFocus = [...weekMap.values()].reduce((sum, records) => sum + sumFocusDuration(records), 0);
    const monthFocus = [...monthMap.values()].reduce((sum, records) => sum + sumFocusDuration(records), 0);
    const streak = await this.deps.storage.getStreak();
    if (token !== this.renderToken)
      return;
    const values = this.root.querySelectorAll(".thinkers-stat-value");
    if (values.length >= 4) {
      values[0].textContent = formatDuration(todayFocus);
      values[1].textContent = formatDuration(weekFocus);
      values[2].textContent = formatDuration(monthFocus);
      values[3].textContent = t("stats.streakValue", { days: streak });
    }
  }
  fillSplitStats(token, monthMap, weekMap) {
    const total = (map, sum) => {
      let result = 0;
      for (const records of map.values())
        result += sum(records);
      return result;
    };
    const values = [
      ["week-focus", total(weekMap, sumFocusDuration)],
      ["week-rest", total(weekMap, sumRestDuration)],
      ["month-focus", total(monthMap, sumFocusDuration)],
      ["month-rest", total(monthMap, sumRestDuration)]
    ];
    if (token !== this.renderToken)
      return;
    for (const [kind, sec] of values) {
      const el = this.root.querySelector(`.thinkers-splitstats-value[data-kind="${kind}"]`);
      if (el)
        el.textContent = formatDuration(sec);
    }
  }
  /** The day's focus and rest, as the two arcs of the ring and the ratio under it. */
  fillRatio(token, records) {
    if (token !== this.renderToken)
      return;
    const focusSec = sumFocusDuration(records);
    const restSec = sumRestDuration(records);
    const total = focusSec + restSec;
    const focusShare = total > 0 ? focusSec / total : 0;
    drawArc(this.root.querySelector(".thinkers-ratio-focus"), focusShare, 0);
    drawArc(this.root.querySelector(".thinkers-ratio-rest"), total > 0 ? restSec / total : 0, focusShare);
    const setText = (selector, text) => {
      const el = this.root.querySelector(selector);
      if (el)
        el.textContent = text;
    };
    setText('.thinkers-ratio-value[data-kind="focus"]', formatDuration(focusSec));
    setText('.thinkers-ratio-value[data-kind="rest"]', formatDuration(restSec));
    setText(".thinkers-ratio-percent", total > 0 ? `${Math.round(focusShare * 100)}%` : "\u2014");
    setText(
      ".thinkers-ratio-caption",
      total > 0 ? t("ratio.caption", { ratio: ratioText(focusSec, restSec) }) : t("calendar.empty")
    );
  }
};
var DayDetailModal = class extends import_obsidian6.Modal {
  constructor(app, dayKey, deps) {
    super(app);
    this.dayKey = dayKey;
    this.deps = deps;
    this.token = 0;
  }
  onOpen() {
    void this.render();
  }
  async render() {
    const token = ++this.token;
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("thinkers-day-modal");
    this.titleEl.setText(this.dayKey);
    const records = visibleRecords(await this.deps.storage.getDay(this.dayKey));
    if (token !== this.token)
      return;
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
    total.createSpan({ cls: "thinkers-detail-rest-total", text: `\xB7 ${t("stats.pomodoros", { count: pomodoros })}` });
    if (restSec > 0) {
      total.createSpan({ cls: "thinkers-detail-rest-total", text: `\xB7 ${t("record.rest")} ${formatDuration(restSec)}` });
    }
    const list = contentEl.createDiv({ cls: "thinkers-session-list" });
    for (const record of sortRecords(records))
      this.renderRow(list, record);
  }
  renderRow(container, record) {
    var _a;
    const row = container.createDiv({ cls: record.kind === "rest" ? "thinkers-session thinkers-session-rest" : "thinkers-session" });
    const info = row.createDiv({ cls: "thinkers-session-info" });
    info.createSpan({ cls: "thinkers-session-range" }).setText(`${clock(record.start)} \u2013 ${clock(record.end)}`);
    const meta = info.createSpan({ cls: "thinkers-session-meta" });
    if (record.kind === "rest") {
      meta.setText(`${t("record.rest")} \xB7 ${record.tag} \xB7 ${formatDuration(record.durationSec)}`);
    } else {
      const label = record.mode === "stopwatch" ? t("mode.stopwatch") : t(`phase.${(_a = record.phase) != null ? _a : "focus"}`);
      const parts = [formatDuration(record.durationSec), label, record.tag];
      if (!record.completed)
        parts.push(t("calendar.incomplete"));
      if (record.note && record.note.trim().length > 0)
        parts.push(record.note.trim());
      meta.setText(parts.join(" \xB7 "));
    }
    const actions = row.createDiv({ cls: "thinkers-session-actions" });
    const edit = actions.createEl("button", { cls: "thinkers-icon-btn" });
    edit.setAttribute("aria-label", t("calendar.editAria"));
    (0, import_obsidian6.setIcon)(edit, "pencil");
    edit.addEventListener("click", () => this.openModal({ existing: record, defaultType: record.kind }));
    const del = actions.createEl("button", { cls: "thinkers-icon-btn thinkers-icon-danger" });
    del.setAttribute("aria-label", t("calendar.deleteAria"));
    (0, import_obsidian6.setIcon)(del, "trash");
    del.addEventListener("click", () => {
      openDeleteConfirm(this.app, this.dayKey, record, () => {
        this.deps.storage.deleteRecord(this.dayKey, record.id).then(
          () => {
            this.deps.onChanged();
            void this.render();
          },
          (err) => console.error(err)
        );
      });
    });
  }
  openModal(options) {
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
      }
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/report.ts
var ReportView = class {
  constructor(root, deps) {
    this.root = root;
    this.deps = deps;
  }
  refresh() {
    void this.render();
  }
  async render() {
    const root = this.root;
    root.empty();
    root.addClass("thinkers-report");
    const days = weekDays(todayKey(), this.deps.getSettings().weekStart);
    const map = await this.deps.storage.getDays(days);
    const values = days.map((d) => {
      var _a;
      return sumFocusDuration((_a = map.get(d)) != null ? _a : []);
    });
    const sessionCount = days.reduce((sum, d) => {
      var _a;
      return sum + pomodoroRecords((_a = map.get(d)) != null ? _a : []).length;
    }, 0);
    const max = Math.max(1, ...values);
    const weekTotal = values.reduce((a, b) => a + b, 0);
    root.createDiv({ cls: "thinkers-report-title", text: t("report.heading") });
    root.createDiv({ cls: "thinkers-report-range", text: t("report.range", { from: days[0], to: days[6] }) });
    this.renderStats(root, weekTotal, sessionCount);
    this.renderChart(root, days, values, max);
  }
  renderStats(root, weekTotal, sessionCount) {
    const stats = root.createDiv({ cls: "thinkers-report-stats" });
    const cards = [
      { label: t("report.totalWeek"), value: formatDuration(weekTotal) },
      { label: t("report.sessions"), value: String(sessionCount) },
      { label: t("report.avg"), value: formatDuration(Math.round(weekTotal / 7)) }
    ];
    for (const card of cards) {
      const el = stats.createDiv({ cls: "thinkers-report-stat" });
      el.createDiv({ cls: "thinkers-report-stat-value", text: card.value });
      el.createDiv({ cls: "thinkers-report-stat-label", text: card.label });
    }
  }
  renderChart(root, days, values, max) {
    const chart = root.createDiv({ cls: "thinkers-report-chart" });
    const weekName = weekdays();
    const today = todayKey();
    for (let i = 0; i < 7; i++) {
      const col = chart.createDiv({ cls: "thinkers-report-col" });
      const valueText = values[i] > 0 ? formatDuration(values[i]) : "";
      col.createDiv({ cls: "thinkers-report-value", text: valueText });
      const barWrap = col.createDiv({ cls: "thinkers-report-bar-wrap" });
      const bar = barWrap.createDiv({ cls: "thinkers-report-bar" });
      const pct = values[i] > 0 ? Math.max(6, Math.round(values[i] / max * 100)) : 0;
      bar.style.setProperty("--thinkers-report-bar-height", `${pct}%`);
      if (days[i] === today)
        bar.addClass("thinkers-report-bar-today");
      const d = parseDateKey(days[i]);
      const label = days[i] === today ? t("habit.today") : weekName[d.getDay()];
      col.createDiv({ cls: "thinkers-report-day", text: label });
    }
  }
};

// src/focus-view.ts
var FOCUS_VIEW_TYPE = "thinkers-focus-view";
var LEGACY_FOCUS_VIEW_TYPES = ["depthinker-focus-view"];
var FOCUS_VIEW_TYPES = [FOCUS_VIEW_TYPE, ...LEGACY_FOCUS_VIEW_TYPES];
var FocusStatsSidebarView = class extends import_obsidian7.ItemView {
  constructor(leaf, deps) {
    super(leaf);
    this.deps = deps;
    this.report = null;
    this.calendar = null;
  }
  getViewType() {
    return FOCUS_VIEW_TYPE;
  }
  getDisplayText() {
    return t("stats.title");
  }
  getIcon() {
    return "target";
  }
  async onOpen() {
    this.build();
  }
  refresh() {
    this.build();
  }
  async onClose() {
    this.report = null;
    this.calendar = null;
    this.containerEl.empty();
  }
  build() {
    const root = this.containerEl;
    root.addClass("thinkers-sidebar-view");
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
      getSettings: this.deps.getSettings
    });
    this.report.refresh();
    const calendarBox = body.createDiv({ cls: "thinkers-calendar-box" });
    this.calendar = new CalendarView(calendarBox, {
      app: this.deps.app,
      storage: this.deps.storage,
      getSettings: this.deps.getSettings,
      getDiaryConfig: this.deps.getDiaryConfig,
      onChanged: () => this.refresh()
    });
    this.calendar.refresh();
  }
};

// src/settings-tab.ts
var import_obsidian8 = require("obsidian");
var NUMERIC_KEYS = /* @__PURE__ */ new Set(["weekStart"]);
function readPath(settings, key) {
  const root = settings;
  const parts = key.split(".");
  let current = root;
  for (const part of parts) {
    if (typeof current !== "object" || current === null)
      return void 0;
    current = current[part];
  }
  return NUMERIC_KEYS.has(key) ? String(current) : current;
}
function writePath(settings, key, value) {
  const root = settings;
  const parts = key.split(".");
  let current = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const next = current[parts[i]];
    if (typeof next !== "object" || next === null)
      return;
    current = next;
  }
  current[parts[parts.length - 1]] = NUMERIC_KEYS.has(key) ? Number.parseInt(String(value), 10) || 0 : value;
}
var ThinkersSettingTab = class extends import_obsidian8.PluginSettingTab {
  constructor(app, plugin, deps) {
    super(app, plugin);
    this.deps = deps;
  }
  getControlValue(key) {
    return readPath(this.deps.getSettings(), key);
  }
  setControlValue(key, value) {
    writePath(this.deps.getSettings(), key, value);
    void this.deps.saveSettings();
    this.deps.refreshTimer();
    this.deps.refreshFocus();
  }
  getSettingDefinitions() {
    return [
      this.group("settings.timerHeading", [
        this.number("settings.focusLength", "settings.focusLengthDesc", "focusMinutes", 1, 180),
        this.number("settings.shortBreak", "settings.shortBreakDesc", "shortBreakMinutes", 1, 120),
        this.number("settings.longBreak", "settings.longBreakDesc", "longBreakMinutes", 1, 240),
        this.number("settings.longBreakInterval", "settings.longBreakIntervalDesc", "longBreakInterval", 1, 12),
        this.number("settings.minSession", "settings.minSessionDesc", "minSessionSeconds", 0, 3600),
        this.number("settings.dailyGoal", "settings.dailyGoalDesc", "dailyGoalMinutes", 0, 1440),
        this.toggle("settings.autoCycle", "settings.autoCycleDesc", "autoCycle"),
        this.toggle("settings.promptFocus", "settings.promptFocusDesc", "promptAfterFocus"),
        this.dropdown("settings.defaultMode", "settings.defaultModeDesc", "defaultMode", {
          pomodoro: t("mode.pomodoro"),
          stopwatch: t("mode.stopwatch")
        })
      ]),
      this.group("settings.notificationsHeading", [
        this.toggle("settings.sound", "settings.soundDesc", "playSound"),
        this.toggle("settings.vibrate", "settings.vibrateDesc", "vibrate"),
        this.toggle("settings.notice", "settings.notice", "showNotice")
      ]),
      this.group("settings.storageHeading", [
        this.text("settings.dataFolder", "settings.dataFolderDesc", "dataFolder"),
        this.dropdown("settings.weekStart", "settings.weekStartDesc", "weekStart", {
          "0": t("settings.weekStartSunday"),
          "1": t("settings.weekStartMonday")
        }),
        this.toggle("settings.openOnStartup", "settings.openOnStartupDesc", "openOnStartup")
      ]),
      this.group("settings.diaryHeading", [
        this.text("settings.diaryFolder", "settings.diaryFolderDesc", "dailyNotesFolder"),
        this.text("settings.diaryFormat", "settings.diaryFormatDesc", "dailyNotesFormat")
      ]),
      this.group("settings.aboutHeading", [
        {
          name: t("settings.dataLocation"),
          desc: t("settings.dataLocationDesc", { path: this.deps.samplePath() })
        }
      ])
    ];
  }
  group(headingKey, items) {
    return { type: "group", heading: t(headingKey), items };
  }
  toggle(nameKey, descKey, key) {
    return {
      name: t(nameKey),
      desc: descKey.length > 0 ? t(descKey) : void 0,
      control: { type: "toggle", key }
    };
  }
  text(nameKey, descKey, key) {
    return {
      name: t(nameKey),
      desc: t(descKey),
      control: { type: "text", key }
    };
  }
  number(nameKey, descKey, key, min, max) {
    return {
      name: t(nameKey),
      desc: t(descKey),
      control: { type: "number", key, min, max, step: 1 }
    };
  }
  dropdown(nameKey, descKey, key, options) {
    return {
      name: t(nameKey),
      desc: t(descKey),
      control: { type: "dropdown", key, options }
    };
  }
};

// src/prompt-modal.ts
var import_obsidian9 = require("obsidian");
var openPrompt = null;
function openPostSessionPrompt(deps) {
  openPrompt == null ? void 0 : openPrompt.close();
  const modal = new PostSessionPrompt(deps);
  openPrompt = modal;
  modal.open();
}
var PostSessionPrompt = class extends import_obsidian9.Modal {
  constructor(deps) {
    var _a;
    super(deps.app);
    this.deps = deps;
    this.tag = deps.record.tag;
    this.note = (_a = deps.record.note) != null ? _a : "";
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("thinkers-prompt");
    this.titleEl.setText(t("prompt.title"));
    contentEl.createDiv({
      cls: "thinkers-prompt-meta",
      text: t("prompt.meta", {
        range: `${clock(this.deps.record.start)} \u2013 ${clock(this.deps.record.end)}`,
        duration: formatDuration(this.deps.record.durationSec)
      })
    });
    new import_obsidian9.Setting(contentEl).setName(t("prompt.what")).addText((txt) => {
      txt.setValue(this.tag);
      txt.onChange((value) => {
        this.tag = value;
      });
      txt.inputEl.focus();
      txt.inputEl.select();
    });
    new import_obsidian9.Setting(contentEl).setName(t("prompt.note")).addTextArea((area) => {
      area.setPlaceholder(t("prompt.notePlaceholder"));
      area.setValue(this.note);
      area.inputEl.rows = 3;
      area.onChange((value) => {
        this.note = value;
      });
    });
    new import_obsidian9.Setting(contentEl).addButton((btn) => btn.setButtonText(t("prompt.skip")).onClick(() => this.close())).addButton((btn) => btn.setButtonText(t("modal.save")).setCta().onClick(() => void this.save()));
  }
  async save() {
    var _a;
    const record = this.deps.record;
    const tag = this.tag.trim().length > 0 ? this.tag.trim() : record.tag;
    const note = this.note.trim();
    if (tag === record.tag && note === ((_a = record.note) != null ? _a : "")) {
      this.close();
      return;
    }
    try {
      await this.deps.storage.updateRecord(dateKeyOf(record.start), {
        ...record,
        tag,
        note: note.length > 0 ? note : void 0,
        updatedAt: Date.now()
      });
    } catch (e) {
      return;
    }
    this.deps.onChanged();
    this.close();
  }
  onClose() {
    if (openPrompt === this)
      openPrompt = null;
    this.contentEl.empty();
  }
};

// src/main.ts
var ThinkersPlugin = class extends import_obsidian10.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.statusBar = null;
    this.diaryConfig = { folder: "", format: "YYYY-MM-DD", template: "" };
  }
  async onload() {
    var _a;
    initLocale();
    const loaded = await this.loadData();
    this.settings = readSettings(loaded == null ? void 0 : loaded.settings);
    this.storage = new DayStore(this.app, () => this.settings);
    this.engine = new TimerEngine(() => this.settings, this.buildHooks());
    this.diaryConfig = await loadDailyNotesConfig(this.app, this.settings);
    for (const type of TIMER_VIEW_TYPES) {
      this.registerView(type, (leaf) => new TimerSidebarView(leaf, this.timerDeps()));
    }
    for (const type of FOCUS_VIEW_TYPES) {
      this.registerView(type, (leaf) => new FocusStatsSidebarView(leaf, this.focusDeps()));
    }
    this.addSettingTab(
      new ThinkersSettingTab(this.app, this, {
        getSettings: () => this.settings,
        saveSettings: () => this.persist(),
        refreshTimer: () => this.refreshTimers(),
        refreshFocus: () => this.refreshFocus(),
        samplePath: () => this.storage.samplePath()
      })
    );
    this.addCommands();
    if (import_obsidian10.Platform.isDesktop) {
      this.statusBar = this.addStatusBarItem();
      this.statusBar.addClass("thinkers-status");
      this.statusBar.setAttribute("aria-label", t("status.idle"));
      this.updateStatus();
    }
    if (this.engine.restore((_a = loaded == null ? void 0 : loaded.runtime) != null ? _a : null) === "completed") {
      new import_obsidian10.Notice(t("notice.recovered"));
    }
    this.registerTickLoop();
    this.registerWindowEvents();
    this.addRibbonIcon("timer", t("ribbon.timer"), () => void this.activatePanel());
    this.addRibbonIcon("target", t("ribbon.focusStats"), () => void this.activateFocusPanel());
    if (this.settings.openOnStartup)
      this.openOnReady();
  }
  onunload() {
    void this.persist();
    disposeAudio();
  }
  openOnReady() {
    const ready = () => void this.activatePanel();
    if (this.app.workspace.layoutReady)
      ready();
    else
      this.app.workspace.onLayoutReady(ready);
  }
  persist() {
    return this.saveData({
      settings: this.settings,
      runtime: this.engine.exportRuntime()
    });
  }
  timerDeps() {
    return {
      engine: this.engine,
      getSettings: () => this.settings
    };
  }
  focusDeps() {
    return {
      app: this.app,
      storage: this.storage,
      getSettings: () => this.settings,
      getDiaryConfig: () => this.diaryConfig
    };
  }
  /** Every open timer panel, whichever of its view types it was created as. */
  timerViews() {
    const out = [];
    for (const type of TIMER_VIEW_TYPES) {
      for (const leaf of this.app.workspace.getLeavesOfType(type)) {
        if (leaf.view instanceof TimerSidebarView)
          out.push(leaf.view);
      }
    }
    return out;
  }
  /** The focus statistics panel, which redraws after a record was added or edited. */
  refreshFocus() {
    for (const type of FOCUS_VIEW_TYPES) {
      for (const leaf of this.app.workspace.getLeavesOfType(type)) {
        const view = leaf.view;
        if (view instanceof FocusStatsSidebarView)
          view.refresh();
      }
    }
  }
  /**
   * Timer state changed (start/stop/mode, or a recovery was resolved). Every panel on
   * screen re-renders, so two open panels can never disagree about a running session.
   */
  refreshTimers() {
    for (const view of this.timerViews())
      view.refreshTimer();
    this.updateStatus();
  }
  /** Per-second repaint: no re-render, only the numbers. */
  refreshTimerTicks() {
    for (const view of this.timerViews())
      view.onTick();
  }
  buildHooks() {
    return {
      onSessionRecorded: (record) => {
        void this.storage.addRecord(record).then(() => this.refreshFocus());
        if (this.settings.showNotice)
          new import_obsidian10.Notice(t("notice.saved", { duration: formatDuration(record.durationSec) }));
        this.cue();
        if (this.settings.promptAfterFocus) {
          openPostSessionPrompt({
            app: this.app,
            storage: this.storage,
            record,
            onChanged: () => this.refreshFocus()
          });
        }
      },
      onSessionTooShort: (seconds) => {
        new import_obsidian10.Notice(t("notice.tooShort", { seconds: this.settings.minSessionSeconds }));
      },
      onPhaseComplete: (phase) => {
        this.cue();
        if (phase !== "focus" && this.settings.showNotice)
          new import_obsidian10.Notice(t("notice.breakDone"));
      },
      onStateChange: () => {
        this.refreshTimers();
        void this.persist();
      }
    };
  }
  cue() {
    if (this.settings.playSound) {
      try {
        playChime();
      } catch (e) {
      }
    }
    if (this.settings.vibrate)
      vibrate();
  }
  addCommands() {
    this.addCommand({
      id: "open-timer",
      name: t("command.openTimer"),
      callback: () => void this.activatePanel()
    });
    this.addCommand({
      id: "start-stop",
      name: t("command.startStop"),
      callback: () => this.engine.isActive ? this.engine.stop() : this.engine.start()
    });
    this.addCommand({
      id: "add-manual",
      name: t("command.addManual"),
      callback: () => openRecordModal({
        app: this.app,
        storage: this.storage,
        getSettings: () => this.settings,
        dayKey: todayKey(),
        defaultType: "focus",
        onChanged: () => {
          this.refreshTimers();
          this.refreshFocus();
        }
      })
    });
    this.addCommand({
      id: "open-focus-stats",
      name: t("command.openFocusStats"),
      callback: () => void this.activateFocusPanel()
    });
    this.addCommand({
      id: "open-diary",
      name: t("command.diary"),
      callback: () => void openDiaryForDate(this.app, this.diaryConfig, todayKey())
    });
  }
  /** Opens the timer panel, by default in the right sidebar. */
  activatePanel() {
    return this.activateSidebar(TIMER_VIEW_TYPES, TIMER_VIEW_TYPE, "timer");
  }
  /** Opens the focus statistics panel next to the timer. */
  activateFocusPanel() {
    return this.activateSidebar(FOCUS_VIEW_TYPES, FOCUS_VIEW_TYPE, "focus statistics");
  }
  async activateSidebar(existingTypes, openType, label) {
    var _a, _b;
    const { workspace } = this.app;
    try {
      for (const type of existingTypes) {
        const existing = workspace.getLeavesOfType(type);
        if (existing.length > 0) {
          await workspace.revealLeaf(existing[0]);
          return;
        }
      }
      const leaf = (_b = (_a = workspace.getRightLeaf(false)) != null ? _a : workspace.getRightLeaf(true)) != null ? _b : workspace.getLeaf("tab");
      if (!leaf)
        return;
      await leaf.setViewState({ type: openType, active: true });
      await workspace.revealLeaf(leaf);
    } catch (err) {
      console.error(`Thinkers: failed to open the ${label} panel`, err);
    }
  }
  registerTickLoop() {
    this.registerInterval(
      window.setInterval(() => {
        this.engine.tick();
        this.refreshTimerTicks();
        this.updateStatus();
      }, 1e3)
    );
  }
  registerWindowEvents() {
    const onWake = () => {
      this.engine.tick();
      this.refreshTimerTicks();
      this.updateStatus();
    };
    window.addEventListener("visibilitychange", onWake);
    window.addEventListener("focus", onWake);
    this.register(() => {
      window.removeEventListener("visibilitychange", onWake);
      window.removeEventListener("focus", onWake);
    });
  }
  updateStatus() {
    if (!this.statusBar)
      return;
    const snapshot = this.engine.snapshot();
    if (snapshot.state === "idle") {
      this.statusBar.setText(t("status.idle"));
      return;
    }
    const value = snapshot.mode === "stopwatch" ? snapshot.elapsedSec : snapshot.remainingSec;
    const prefix = snapshot.mode === "stopwatch" ? "" : `${t(`phase.${snapshot.phase}`)} `;
    this.statusBar.setText(`${prefix}${formatClock(value)}`);
  }
};
function readSettings(raw) {
  const source = raw != null ? raw : {};
  const num = (key, min) => {
    const value = Number(source[key]);
    return Number.isFinite(value) ? Math.max(min, Math.round(value)) : DEFAULT_SETTINGS[key];
  };
  const flag = (key) => typeof source[key] === "boolean" ? source[key] : DEFAULT_SETTINGS[key];
  return {
    focusMinutes: num("focusMinutes", 1),
    shortBreakMinutes: num("shortBreakMinutes", 1),
    longBreakMinutes: num("longBreakMinutes", 1),
    longBreakInterval: num("longBreakInterval", 1),
    autoCycle: flag("autoCycle"),
    defaultMode: source.defaultMode === "stopwatch" ? "stopwatch" : "pomodoro",
    minSessionSeconds: num("minSessionSeconds", 0),
    dailyGoalMinutes: num("dailyGoalMinutes", 0),
    playSound: flag("playSound"),
    vibrate: flag("vibrate"),
    showNotice: flag("showNotice"),
    dataFolder: typeof source.dataFolder === "string" ? source.dataFolder : DEFAULT_SETTINGS.dataFolder,
    weekStart: Number(source.weekStart) === 0 ? 0 : 1,
    dailyNotesFolder: typeof source.dailyNotesFolder === "string" ? source.dailyNotesFolder : DEFAULT_SETTINGS.dailyNotesFolder,
    dailyNotesFormat: typeof source.dailyNotesFormat === "string" ? source.dailyNotesFormat : DEFAULT_SETTINGS.dailyNotesFormat,
    openOnStartup: flag("openOnStartup"),
    promptAfterFocus: flag("promptAfterFocus")
  };
}
