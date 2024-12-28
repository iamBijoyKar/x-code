import type { FileEntry } from "@tauri-apps/api/fs";
export type XCodeFile = FileEntry;

export type XCodeFiles = XCodeFile[];

export type XCodeFileContent = {
  fileName: string;
  filePath: string;
  content: string;
  isChanged: boolean;
  fileType: string;
  fileExtension: string;
  isCurrentFile: boolean;
};
