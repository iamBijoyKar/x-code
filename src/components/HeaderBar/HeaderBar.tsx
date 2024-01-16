import FileDropDownMenu from "./FileMenu/FileDropDownMenu";
import EditDropDownMenu from "./EditMenu/EditDropDownMenu";
import ViewDropDownMenu from "./ViewMenu/ViewDropDownMenu";
import TerminalDropDownMenu from "./TerminalMenu/TerminalDropDownMenu";
import HelpDropDownMenu from "./HelpMenu/HelpDropDownMenu";
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
      <ul className="flex items-center p-1 gap-1">
        <li className="">
          <FileDropDownMenu
            setFiles={setFiles}
            setWorkingDirectory={setWorkingDirectory}
          />
        </li>
        <li className="">
          <EditDropDownMenu />
        </li>
        <li className="">
          <ViewDropDownMenu />
        </li>
        <li className="">
          <TerminalDropDownMenu />
        </li>
        <li className="">
          <HelpDropDownMenu />
        </li>
      </ul>
    </div>
  );
}
