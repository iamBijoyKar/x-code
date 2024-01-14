import { BsThreeDots } from "react-icons/bs";
import { open } from "@tauri-apps/api/dialog";
import Files from "@/components/Files/Files";
import Search from "@/components/Search/Search";

type SideBarProps = {
  current: string;
  sideBarOpen: boolean;
  workingDirectory: string;
  files: any[];
  currentFile: any;
  setCurrentFile: (file: any) => void;
  setEditorOpen: (isOpen: boolean) => void;
};

export default function SideBar({
  current,
  sideBarOpen,
  files,
  workingDirectory,
  currentFile,
  setCurrentFile,
  setEditorOpen,
}: SideBarProps) {
  const generateSideBarHeader = (current: string) => {
    switch (current) {
      case "files":
        return "EXPLORER";
      case "search":
        return "SEARCH";
      case "git":
        return "VERSION CONTROL";
      default:
        return "EXPLORER";
    }
  };

  const generateSideBarContent = (current: string) => {
    switch (current) {
      case "files":
        if (files.length === 0) return null;
        return (
          <Files
            files={files}
            workingDirectory={workingDirectory}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            setEditorOpen={setEditorOpen}
          />
        );
      case "search":
        return <Search />;
      default:
        if (files.length === 0) return null;
        return (
          <Files
            files={files}
            workingDirectory={workingDirectory}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            setEditorOpen={setEditorOpen}
          />
        );
    }
  };

  return (
    <aside
      className="bg-secondaryBg text-primaryText overflow-hidden w-[200px] min-w-[140px] max-w-[500px] resize-x h-full"
      style={{ display: sideBarOpen ? "block" : "none" }}
    >
      <header className="w-full flex items-center justify-between px-3">
        <p className=" text-[12px] text-sm text-secondaryText h-8 flex items-center justify-center truncate overflow-hidden">
          {generateSideBarHeader(current)}
        </p>
        <button type="button" className="hover:bg-primaryBg p-1 rounded ">
          <BsThreeDots className="text-secondaryText text-[14px] text-sm" />
        </button>
      </header>
      <div className="w-full">{generateSideBarContent(current)}</div>
    </aside>
  );
}
