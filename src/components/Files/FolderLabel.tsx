import { useState } from "react";
import { FaRegFolder } from "react-icons/fa6";
import { FaRegFolderOpen } from "react-icons/fa6";
import { XCodeFile } from "@/types";
import FileLabel from "./FileLabel";

type FolderLabelProps = {
  label?: string;
  file: XCodeFile;
  type?: string;
  onFileClick: (file: XCodeFile) => void;
};

export default function FolderLabel({
  label,
  file,
  type,
  onFileClick,
}: FolderLabelProps) {
  const { children, path, name } = file;
  const [open, setOpen] = useState<boolean>(false);

  const handleFolderOnClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col text-secondaryText hover:text-primaryText cursor-pointer">
      <div
        onClick={handleFolderOnClick}
        className="flex gap-2 items-center truncate w-full"
      >
        {open ? (
          <FaRegFolderOpen className="text-lg" />
        ) : (
          <FaRegFolder className=" text-md" />
        )}
        <p className="truncate">{label}</p>
      </div>
      {open ? (
        <div className="">
          <ul className="flex flex-col ml-2">
            {children?.map((child) => {
              if (child.children === undefined) {
                return (
                  <li key={child.path} className="">
                    <FileLabel
                      key={child.path}
                      label={child.name}
                      path={child.path}
                      onClick={() => onFileClick(child)}
                    />
                  </li>
                );
              } else {
                return (
                  <li key={child.path} className="">
                    <FolderLabel
                      key={child.path}
                      label={child.name}
                      file={child}
                      onFileClick={onFileClick}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
