import { useEffect } from "react";

import { readDir, BaseDirectory } from "@tauri-apps/api/fs";
// Reads the `$APPDATA/users` directory recursively

function processEntries(entries: any[]) {
  for (const entry of entries) {
    console.log(`Entry: ${entry.path}`);
    if (entry.children) {
      processEntries(entry.children);
    }
  }
}

export default function Files() {
  useEffect(() => {
    readDir("users", {
      dir: BaseDirectory.AppData,
      recursive: true,
    })
      .then((entries) => {
        processEntries(entries);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return <div>Files</div>;
}
