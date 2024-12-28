import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import FileLabel from "./FileLabel";
import FolderLabel from "./FolderLabel";
import { pathToFileName } from "@/lib/utils";
import type { XCodeFiles, XCodeFile } from "@/types";

type FilesProps = {
  files: XCodeFiles;
  workingDirectory: string;
  currentFile: XCodeFile;
  setCurrentFile: (file: XCodeFile) => void;
  setEditorOpen: (isOpen: boolean) => void;
  filesOpenInEditor: XCodeFile[];
  setFilesOpenInEditor: (files: XCodeFile[]) => void;
};

export default function Files({
  files,
  workingDirectory,
  currentFile,
  setCurrentFile,
  setEditorOpen,
  filesOpenInEditor,
  setFilesOpenInEditor,
}: FilesProps) {
  const [open, setOpen] = useState<boolean>(true);

  const handleFileClick = (file: any) => {
    setCurrentFile(file);
    setEditorOpen(true);
    if (filesOpenInEditor.includes(file)) return;
    setFilesOpenInEditor([...filesOpenInEditor, file]);
  };

  return (
    <div className="w-full">
      <div className=" bg-primaryBg text-secondaryText w-full flex justify-start items-center">
        <span className="">
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="p-1 rounded hover:text-primaryText flex justify-start items-center gap-1"
          >
            {open ? (
              <FaAngleDown className="relative top-[1px] text-xl" />
            ) : (
              <FaAngleRight className="text-xl" />
            )}
            <span className="">{pathToFileName(workingDirectory)}</span>
          </button>
        </span>
      </div>
      {open ? (
        <ul className="flex flex-col overflow-y-auto px-2">
          {files.map((file) => {
            if (file.children !== undefined) {
              return (
                <FolderLabel
                  key={file.path}
                  label={
                    file.name === undefined
                      ? pathToFileName(file.path)
                      : file.name
                  }
                  file={file}
                  type="folder"
                  onFileClick={handleFileClick}
                />
              );
            } else {
              return (
                <FileLabel
                  key={file.path}
                  label={
                    file.name === undefined
                      ? pathToFileName(file.path)
                      : file.name
                  }
                  path={file.path}
                  type="file"
                  onClick={() => handleFileClick(file)}
                />
              );
            }
          })}
        </ul>
      ) : null}
    </div>
  );
}
