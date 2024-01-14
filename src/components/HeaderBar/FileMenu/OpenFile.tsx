import { open } from "@tauri-apps/api/dialog";

type OpenFolderProps = {
  setFiles: (files: any[]) => void;
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
      setFiles([result]);
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
