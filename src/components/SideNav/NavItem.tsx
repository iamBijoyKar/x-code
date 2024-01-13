import { IconType } from "react-icons";

type NavItemProps = {
  label: string;
  href: string;
  Icon: IconType;
  current: string;
  sideBarOpen: boolean;
  setSideBarOpen: (sideBarOpen: boolean) => void;
  setCurrent: (current: string) => void;
};

export default function NavItem({
  label,
  current,
  sideBarOpen,
  href,
  setCurrent,
  setSideBarOpen,
  Icon,
}: NavItemProps) {
  const isActive = current === href;
  const handleClicked = () => {
    setCurrent(href);
    if (sideBarOpen) {
      if (isActive) {
        setSideBarOpen(false);
      } else {
        setSideBarOpen(true);
      }
    } else {
      setSideBarOpen(true);
    }
  };
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center m-0 py-3 cursor-pointer relative border-l-2 border-transparent group"
      onClick={handleClicked}
      style={{ borderLeft: isActive ? "2px solid var(--primaryText)" : "" }}
      role="button"
    >
      <Icon
        className="text-2xl group-hover:text-primaryText transition-all"
        style={{
          color: isActive ? "var(--primaryText)" : "",
        }}
      />
      {/* <span className="absolute top-[20%] -right-[120%] font-medium border rounded-lg bg-[#0b090a] px-2">
        {label}
      </span> */}
    </button>
  );
}
