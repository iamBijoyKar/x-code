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
      className="flex items-center text-secondaryText hover:text-primaryText cursor-pointer"
    >
      {type === "file" ? (
        <FaRegFileAlt className="mr-2" />
      ) : (
        <FaRegFolder className="mr-2" />
      )}
      <p className="">{label}</p>
    </div>
  );
}
