import type { XCodeFile } from "@/types";
import { IoClose } from "react-icons/io5";

type EditorFileTabLabelProps = {
  file: XCodeFile;
  onClick: () => void;
  onClose: () => void;
};

export default function EditorFileTabLabel({
  file,
  onClick,
  onClose,
}: EditorFileTabLabelProps) {
  return (
    <div className="px-2 py-1 flex justify-between min-w-[100px] max-w-[100px] bg-[#161a1d] hover:bg-primaryBg cursor-pointer group">
      <span onClick={onClick} className="w-full truncate">
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
