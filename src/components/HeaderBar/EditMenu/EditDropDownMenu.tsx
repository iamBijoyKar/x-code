import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../UI/DropDown";

export default function EditDropDownMenu() {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <button className="hover:text-primaryText hover:bg-hoverBg px-2 py-[2px] rounded text-sm outline-none">
            Edit
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-primaryBg text-secondaryText border-secondaryBg  shadow"
          align="start"
        >
          <CustomMenuItem>
            <button className="flex gap-4 items-center justify-between w-full">
              <span>Undo</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">
                Ctrl+Z
              </span>
            </button>
          </CustomMenuItem>
          <CustomMenuItem>
            <button className="flex gap-4 items-center justify-between w-full">
              <span>Redo</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">
                Ctrl+Y
              </span>
            </button>
          </CustomMenuItem>
          <CustomMenuItem>
            <button className="flex gap-4 items-center justify-between w-full">
              <span>Cut</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">
                Ctrl+X
              </span>
            </button>
          </CustomMenuItem>
          <CustomMenuItem>
            <button className="flex gap-4 items-center justify-between w-full">
              <span>Copy</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">
                Ctrl+C
              </span>
            </button>
          </CustomMenuItem>
          <CustomMenuItem>
            <button className="flex gap-4 items-center justify-between w-full">
              <span>Paste</span>
              <span className="ml-auto text-xs tracking-widest opacity-60">
                Ctrl+V
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
