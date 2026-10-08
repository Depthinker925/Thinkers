import { App } from "obsidian";

/**
 * Create every folder along a vault path, so writing a note into a folder that does not
 * exist yet cannot fail.
 *
 * Both the focus log and the diary note can point at a folder the user has never created
 * (or that was renamed outside Obsidian), and `vault.create` does not create parents.
 */
export async function ensureFolder(app: App, path: string): Promise<void> {
  if (path.length === 0) return;
  const parts = path.split("/").filter((p) => p.length > 0);
  let current = "";
  for (const part of parts) {
    current = current.length > 0 ? `${current}/${part}` : part;
    if (!app.vault.getFolderByPath(current)) {
      try {
        await app.vault.createFolder(current);
      } catch (err) {
        // A parallel write may have created it in the meantime; only a folder that is
        // still missing is a real failure.
        if (!app.vault.getFolderByPath(current)) throw err;
      }
    }
  }
}
