import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../UI/DropDown";

export default function HelpDropDownMenu() {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <button className="hover:text-primaryText hover:bg-hoverBg px-2 py-[2px] rounded text-sm outline-none">
            Help
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-primaryBg text-secondaryText border-secondaryBg  shadow"
          align="start"
        >
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
