import { open } from "@tauri-apps/api/dialog";
import { XCodeFiles } from "@/types";

type OpenFolderProps = {
  setFiles: (files: XCodeFiles) => void;
  setWorkingDirectory: (directory: string) => void;
};

export default function OpenFile({
  setFiles,
  setWorkingDirectory,
}: OpenFolderProps) {
  const openFile = async () => {
    const result = await open({
      multiple: false,
      directory: false,
    });
    console.log(result);
    if (typeof result === "string") {
      setWorkingDirectory(result);
      setFiles([{ path: result, name: result }]);
    }
  };
  return (
    <button
      onClick={openFile}
      className="flex gap-4 items-center justify-between w-full"
    >
      <span>Open File</span>
      <span className="ml-auto text-xs tracking-widest opacity-60">Ctrl+O</span>
    </button>
  );
}
