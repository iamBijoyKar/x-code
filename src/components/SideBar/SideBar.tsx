import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { open } from "@tauri-apps/api/dialog";
import Files from "@/components/Files/Files";
import Search from "@/components/Search/Search";
import { XCodeFiles, XCodeFile } from "@/types";

type SideBarProps = {
  current: string;
  sideBarOpen: boolean;
  workingDirectory: string;
  files: XCodeFiles;
  currentFile: XCodeFile;
  setCurrentFile: (file: XCodeFile) => void;
  setEditorOpen: (isOpen: boolean) => void;
  setSideBarOpen: (isOpen: boolean) => void;
  filesOpenInEditor: XCodeFile[];
  setFilesOpenInEditor: (files: XCodeFile[]) => void;
  setEditorDimension: (editorDimension: {
    width: string;
    height: string;
  }) => void;
};

export default function SideBar({
  current,
  sideBarOpen,
  files,
  workingDirectory,
  currentFile,
  setCurrentFile,
  setEditorOpen,
  setSideBarOpen,
  filesOpenInEditor,
  setFilesOpenInEditor,
  setEditorDimension,
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
            filesOpenInEditor={filesOpenInEditor}
            setFilesOpenInEditor={setFilesOpenInEditor}
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
            filesOpenInEditor={filesOpenInEditor}
            setFilesOpenInEditor={setFilesOpenInEditor}
          />
        );
    }
  };

  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [drag, setDrag] = useState({
    active: false,
    x: 0,
    y: 0,
  });

  const startResize = (e: any) => {
    setDrag({
      active: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const resizeFrame = (e: any) => {
    const { active, x, y } = drag;
    if (!active) return;
    const xDiff = Math.abs(x - e.clientX);
    const yDiff = Math.abs(y - e.clientY);
    const newWidth =
      x < e.clientX ? sidebarWidth + xDiff : sidebarWidth - xDiff;
    setDrag({ ...drag, x: e.clientX, y: e.clientY });
    setSidebarWidth(newWidth);
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  useEffect(() => {
    window.addEventListener("mousemove", resizeFrame);
    window.addEventListener("mouseup", stopResize);
    return () => {
      window.removeEventListener("mousemove", resizeFrame);
      window.removeEventListener("mouseup", stopResize);
    };
  });

  useEffect(() => {
    if (sidebarWidth < 160) {
      setSideBarOpen(false);
      setSidebarWidth(250);
    }
    if (sideBarOpen) {
      setEditorDimension({
        width: `${window.innerWidth - (sidebarWidth + 10)}px`,
        height: `${window.innerHeight - 100}px`,
      });
    } else {
      setEditorDimension({
        width: `${window.innerWidth - 10}px`,
        height: `${window.innerHeight - 100}px`,
      });
    }
  }, [sidebarWidth, sideBarOpen]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setEditorDimension({
        width: `${window.innerWidth - sidebarWidth - 10}px`,
        height: `${window.innerHeight - 100}px`,
      });
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <aside
      className="bg-secondaryBg text-primaryText overflow-hidden w-[250px] min-w-[160px] max-w-[500px]  h-full relative"
      style={{ display: sideBarOpen ? "block" : "none", width: sidebarWidth }}
    >
      <div className="w-full h-full">
        <header className="w-full flex items-center justify-between px-3">
          <p className=" text-[12px] text-sm text-secondaryText h-8 flex items-center justify-center truncate overflow-hidden">
            {generateSideBarHeader(current)}
          </p>
          <button type="button" className="hover:bg-primaryBg p-1 rounded ">
            <BsThreeDots className="text-secondaryText text-[14px] text-sm" />
          </button>
        </header>
        <div className="w-full">{generateSideBarContent(current)}</div>
      </div>
      <div
        className="min-w-1 w-1 h-full bg-primaryBg hover:bg-slate-700 cursor-col-resize absolute top-0 right-0 z-10 "
        onMouseDown={startResize}
      ></div>
    </aside>
  );
}
