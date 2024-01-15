import FileDropDownMenu from "./FileMenu/FileDropDownMenu";
import type { XCodeFiles, XCodeFile } from "@/types";

type HeaderBarProps = {
  workingDirectory: string;
  setWorkingDirectory: (directory: string) => void;
  files: XCodeFiles;
  setFiles: (files: XCodeFiles) => void;
};

export default function HeaderBar({
  workingDirectory,
  setWorkingDirectory,
  files,
  setFiles,
}: HeaderBarProps) {
  return (
    <div className="w-full text-secondaryText">
      <ul className="flex items-center">
        <li className="">
          <button className="hover:bg-primaryBg p-1 rounded">
            <FileDropDownMenu
              setFiles={setFiles}
              setWorkingDirectory={setWorkingDirectory}
            />
          </button>
        </li>
      </ul>
    </div>
  );
}
