import { BsThreeDots } from "react-icons/bs";
import Files from "../Files/Files";
import Search from "../Search/Search";

type SideBarProps = {
  current: string;
  sideBarOpen: boolean;
};

export default function SideBar({ current, sideBarOpen }: SideBarProps) {
  const generateSideBarHeader = () => {
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

  const generateSideBarContent = () => {
    switch (current) {
      case "files":
        return <Files />;
      case "search":
        return <Search />;
      default:
        return <Files />;
    }
  };

  return (
    <aside
      className="bg-secondaryBg text-primaryText overflow-hidden w-[200px] min-w-[140px] max-w-[500px] resize-x h-full"
      style={{ display: sideBarOpen ? "block" : "none" }}
    >
      <header className="w-full flex items-center justify-between px-3">
        <p className=" text-[12px] text-sm text-secondaryText h-8 flex items-center justify-center truncate overflow-hidden">
          {generateSideBarHeader()}
        </p>
        <button type="button" className="hover:bg-primaryBg p-1 rounded ">
          <BsThreeDots className="text-secondaryText text-[14px] text-sm" />
        </button>
      </header>
      <div className="w-full">{generateSideBarContent()}</div>
    </aside>
  );
}
