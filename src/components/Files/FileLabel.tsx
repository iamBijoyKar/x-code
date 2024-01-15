import { FaRegFileAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";

type FileLabelProps = {
  label: string;
  path: string;
  type: string;
  onClick: () => void;
};

export default function FileLabel({
  label,
  path,
  type,
  onClick,
}: FileLabelProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center text-secondaryText hover:text-primaryText cursor-pointer truncate w-full gap-2"
    >
      {type === "file" ? (
        <FaRegFileAlt className=" text-md" />
      ) : (
        <FaRegFolder className=" text-md" />
      )}
      <p className="">{label}</p>
    </div>
  );
}
