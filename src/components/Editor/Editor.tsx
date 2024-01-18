import { useState, useRef, useEffect } from "react";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { XCodeFile, XCodeFiles } from "@/types";
import EditorHero from "./EditorHero";
import ImageLoader from "./ImageLoader";
import { pathToFileType, isTextFile, isImageFile } from "@/lib/utils";

type EditorProps = {
  currentFile: XCodeFile;
  setCurrentFile: (file: XCodeFile) => void;
  files: XCodeFiles;
  workingDirectory: string;
  isEditorOpen: boolean;
  setIsEditorOpen: (isOpen: boolean) => void;
};

export default function Editor({
  currentFile,
  setCurrentFile,
  files,
  workingDirectory,
  isEditorOpen,
  setIsEditorOpen,
}: EditorProps) {
  const [fileContent, setFileContent] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [currentFileType, setCurrentFileType] = useState<string>("");

  const saveFile = () => {
    if (document.activeElement !== textAreaRef.current) return;
    writeTextFile(currentFile.path, fileContent)
      .then(() => {
        console.log("File saved", fileContent);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (isEditorOpen) {
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "s" && e.ctrlKey) {
          saveFile();
        }
      });
      return () => {
        document.removeEventListener("keydown", (e: KeyboardEvent) => {
          if (e.key === "s" && e.ctrlKey) {
            saveFile();
          }
        });
      };
    }
  }, [isEditorOpen]);

  const generateEditorContent = () => {
    if (currentFileType === "text") {
      return (
        <textarea
          ref={textAreaRef}
          className="w-full h-full bg-primaryBg text-secondaryText p-4 font-code outline-none resize-none"
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        />
      );
    } else if (currentFileType === "image") {
      return (
        <ImageLoader filePath={currentFile.path} fileName={currentFile.name} />
      );
    } else {
      return (
        <div className="w-full h-full grid place-items-center">
          <p className="text-2xl font-medium">
            This file type is not supported yet.
          </p>
        </div>
      );
    }
  };

  useEffect(() => {
    if (
      currentFile !== null &&
      currentFile.path !== undefined &&
      currentFile.path !== null &&
      currentFile.path !== "" &&
      currentFile.path !== fileContent &&
      currentFile.children === undefined
    ) {
      readTextFile(currentFile.path)
        .then((content) => {
          setFileContent(content);
          setCurrentFileType("text");
        })
        .catch((err) => {
          console.error(err);
          const fileType = pathToFileType(currentFile.path);
          if (isImageFile(fileType)) {
            setCurrentFileType("image");
          } else {
            setCurrentFileType("null");
          }
        });
    }
  }, [currentFile]);

  return (
    <div className="flex w-full h-full bg-primaryBg text-secondaryText ">
      {isEditorOpen ? (
        <div className="flex flex-col w-full h-full">
          <div className="px-4 py-1 font-medium bg-secondaryBg">
            {currentFile.path}
          </div>
          <div className="w-full h-full">{generateEditorContent()}</div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full">
          <EditorHero />
        </div>
      )}
    </div>
  );
}
