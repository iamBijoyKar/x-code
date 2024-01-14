import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import FileLabel from "./FileLabel";
import { pathToFileName } from "@/lib/utils";

type FilesProps = {
  files: any[];
  workingDirectory: string;
  currentFile: any;
  setCurrentFile: (file: any) => void;
  setEditorOpen: (isOpen: boolean) => void;
};

export default function Files({
  files,
  workingDirectory,
  currentFile,
  setCurrentFile,
  setEditorOpen,
}: FilesProps) {
  const [open, setOpen] = useState<boolean>(true);

  const handleFileClick = (file: any) => {
    setCurrentFile(file);
    setEditorOpen(true);
  };

  return (
    <div className="w-full">
      <div className=" py-1 bg-primaryBg text-secondaryText w-full flex justify-start items-center">
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
            <span className="capitalize">
              {pathToFileName(workingDirectory)}
            </span>
          </button>
        </span>
      </div>
      {open ? (
        <ul className="flex flex-col overflow-y-auto px-2">
          {files.map((file) => {
            return (
              <li className="" key={file.path}>
                <FileLabel
                  label={file.name}
                  path={file.path}
                  type={file.children ? "folder" : "file"}
                  onClick={() => handleFileClick(file)}
                />
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
