import { open } from "@tauri-apps/api/dialog";
import { readDir } from "@tauri-apps/api/fs";
import { XCodeFiles } from "@/types";

type OpenFolderProps = {
  setFiles: (files: XCodeFiles) => void;
  setWorkingDirectory: (directory: string) => void;
};

export default function OpenFolder({
  setFiles,
  setWorkingDirectory,
}: OpenFolderProps) {
  const openFolder = async () => {
    const result = await open({
      multiple: false,
      directory: true,
    });
    console.log(result);
    if (typeof result === "string") {
      setWorkingDirectory(result);
      readDir(result, {
        recursive: true,
      }).then((entries) => {
        console.log(entries);
        setFiles(entries);
      });
    }
  };
  return (
    <button
      onClick={openFolder}
      className="flex gap-4 items-center justify-between w-full"
    >
      <span>Open Folder</span>
      <span className="ml-auto text-xs tracking-widest opacity-60">
        Ctrl+Shift+O
      </span>
    </button>
  );
}
