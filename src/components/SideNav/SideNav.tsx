import NavItem from "./NavItem";
import { ImFilesEmpty } from "react-icons/im";
import { IoGitNetworkOutline } from "react-icons/io5";

type SideNavProps = {
  current: string;
  sideBarOpen: boolean;
  setCurrent: (current: string) => void;
  setSideBarOpen: (sideBarOpen: boolean) => void;
};

export default function SideNav({
  current,
  sideBarOpen,
  setSideBarOpen,
  setCurrent,
}: SideNavProps) {
  return (
    <nav className="text-secondaryText px-1 py-2 w-full ">
      <ul className="flex flex-col gap-0 items-center">
        <li className="w-full">
          <NavItem
            label="Files"
            href="files"
            Icon={ImFilesEmpty}
            current={current}
            setCurrent={setCurrent}
            setSideBarOpen={setSideBarOpen}
            sideBarOpen={sideBarOpen}
          />
        </li>
        <li className="w-full">
          <NavItem
            label="Git"
            href="git"
            Icon={IoGitNetworkOutline}
            current={current}
            setCurrent={setCurrent}
            setSideBarOpen={setSideBarOpen}
            sideBarOpen={sideBarOpen}
          />
        </li>
      </ul>
    </nav>
  );
}
