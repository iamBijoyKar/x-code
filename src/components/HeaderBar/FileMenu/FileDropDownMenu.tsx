import React from "react";
import OpenFolder from "./OpenFolder";
import OpenFile from "./OpenFile";
import NewFile from "./NewFile";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../UI/DropDown";
import { XCodeFile, XCodeFiles } from "@/types";

type FileDropDownMenuProps = {
  setFiles: (files: XCodeFiles) => void;
  setWorkingDirectory: (directory: string) => void;
};

export default function FileDropDownMenu({
  setFiles,
  setWorkingDirectory,
}: FileDropDownMenuProps) {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none ">
          <button className="hover:text-primaryText hover:bg-hoverBg px-2 py-[2px] rounded text-sm outline-none">
            File
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-primaryBg text-secondaryText border-secondaryBg  shadow"
          align="start"
        >
          <CustomMenuItem>
            <NewFile
              setFiles={setFiles}
              setWorkingDirectory={setWorkingDirectory}
            />
          </CustomMenuItem>
          <CustomMenuItem>
            <button className="flex gap-4 items-center justify-between w-full">
              <span>New Project</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">
                Ctrl+Shift+N
              </span>
            </button>
          </CustomMenuItem>
          <CustomMenuItem>
            <button className="flex gap-4 items-center justify-between w-full">
              <span>New Window</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">
                Ctrl+Shift+N
              </span>
            </button>
          </CustomMenuItem>
          <CustomMenuItem>
            <OpenFile
              setFiles={setFiles}
              setWorkingDirectory={setWorkingDirectory}
            />
          </CustomMenuItem>
          <CustomMenuItem>
            <OpenFolder
              setFiles={setFiles}
              setWorkingDirectory={setWorkingDirectory}
            />
          </CustomMenuItem>
          <CustomMenuItem>
            <button className="flex gap-4 items-center justify-between w-full">
              <span>Save</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">
                Ctrl+S
              </span>
            </button>
          </CustomMenuItem>
          <CustomMenuItem>
            <button className="flex gap-4 items-center justify-between w-full">
              <span>Save As...</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">
                Ctrl+Shift+S
              </span>
            </button>
          </CustomMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type CustomMenuItemProps = {
  children: React.ReactNode;
};

function CustomMenuItem({ children, ...props }: CustomMenuItemProps) {
  return (
    <DropdownMenuItem className="py-1 hover:bg-slate-600 w-full " {...props}>
      {children}
    </DropdownMenuItem>
  );
}
