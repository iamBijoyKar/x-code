import { useEffect, useState } from "react";
import { convertFileSrc } from "@tauri-apps/api/tauri";

type ImageLoaderProps = {
  filePath: string;
  fileName?: string;
};

export default function ImageLoader({ filePath, fileName }: ImageLoaderProps) {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const path = convertFileSrc(filePath);
    setImageSrc(path);
  }, [filePath]);

  return (
    <div className="w-full h-full grid place-items-center">
      <img
        src={imageSrc}
        alt={fileName ? fileName : "Image"}
        className="max-h-[90vh]"
      />
    </div>
  );
}
