import type { XCodeFile } from "@/types";
import { IoClose } from "react-icons/io5";

type EditorFileTabLabelProps = {
  file: XCodeFile;
  onClick: () => void;
  onClose: () => void;
  isCurrent: boolean;
  isChanged: boolean;
};

export default function EditorFileTabLabel({
  file,
  onClick,
  onClose,
  isCurrent,
  isChanged,
}: EditorFileTabLabelProps) {
  return (
    <div
      className={`px-2 py-1 flex justify-between min-w-[100px] w-[120px] max-w-[150px] bg-[#161a1d] hover:bg-primaryBg cursor-pointer group ${
        isCurrent ? "border-b border-white" : "border-none"
      }`}
    >
      <span onClick={onClick} className="w-full text-md truncate">
        {file.name}
      </span>
      <button
        onClick={onClose}
        type="button"
        className="hidden group-hover:block"
      >
        <IoClose className="text-md" />
      </button>
    </div>
  );
}
