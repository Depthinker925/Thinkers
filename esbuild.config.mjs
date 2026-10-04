import esbuild from "esbuild";
import { builtinModules } from "node:module";

const banner = `/*
This is a generated file. Do not edit directly.
Source: https://github.com/Depthinker925/Thinkers
*/`;

const prod = process.argv.includes("production");

const buildOptions = {
  banner: { js: banner },
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtinModules,
  ],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  outfile: "main.js",
};

if (prod) {
  try {
    const result = await esbuild.build(buildOptions);
    if (result.errors.length > 0) {
      throw new Error(`esbuild reported ${result.errors.length} error(s)`);
    }
    console.log("Build finished.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
} else {
  const context = await esbuild.context(buildOptions);
  await context.watch();
}
