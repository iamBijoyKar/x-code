import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pathToFileName(path: string) {
  if (path.includes("/")) return path.split("/").pop();
  return path.replace(/^.*[\\/]/, "");
}

export function pathToFileType(path: string): string {
  const fileName = pathToFileName(path);
  if (fileName === undefined) return "";
  const fileParts = fileName.split(".");
  if (fileParts.length > 1) return fileParts.pop()!;
  return "";
}

export function isTextFile(path: string): boolean {
  const fileType = pathToFileType(path);
  if (fileType === undefined) return false;
  return [
    "txt",
    "md",
    "ts",
    "tsx",
    "js",
    "jsx",
    "py",
    "json",
    "html",
    "css",
    "scss",
    "sass",
    "less",
    "go",
    "java",
    "c",
    "cpp",
    "h",
    "hpp",
  ].includes(fileType);
}

export function isImageFile(fileType: string): boolean {
  if (fileType === undefined) return false;
  return ["png", "jpg", "jpeg", "gif", "svg"].includes(fileType);
}
