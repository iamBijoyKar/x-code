import { open } from "@tauri-apps/api/dialog";

type NewFileProps = {
  setFiles: (files: any[]) => void;
  setWorkingDirectory: (directory: string) => void;
};

export default function NewFile({
  setFiles,
  setWorkingDirectory,
}: NewFileProps) {
  const newFile = async () => {
    const result = await open({
      multiple: false,
      directory: true,
    });
    console.log(result);
    if (typeof result === "string") {
      setWorkingDirectory(result);
      setFiles([result]);
    }
  };

  return (
    <button
      onClick={() => null}
      className="flex gap-4 items-center justify-between w-full"
    >
      <span>New File</span>
      <span className="ml-auto text-xs tracking-widest opacity-60">Ctrl+N</span>
    </button>
  );
}
