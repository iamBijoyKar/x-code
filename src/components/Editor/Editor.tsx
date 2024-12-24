import { useState, useRef, useEffect } from "react";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { XCodeFile, XCodeFiles } from "@/types";
import EditorHero from "./EditorHero";
import ImageLoader from "./ImageLoader";
import EditorFileTabLabel from "./EditorFileTabLabel";
import { pathToFileType, isTextFile, isImageFile } from "@/lib/utils";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";

type EditorProps = {
  currentFile: XCodeFile;
  setCurrentFile: (file: XCodeFile) => void;
  files: XCodeFiles;
  workingDirectory: string;
  isEditorOpen: boolean;
  setIsEditorOpen: (isOpen: boolean) => void;
  filesOpenInEditor: XCodeFile[];
  setFilesOpenInEditor: (files: XCodeFile[]) => void;
};

export default function Editor({
  currentFile,
  setCurrentFile,
  files,
  workingDirectory,
  isEditorOpen,
  setIsEditorOpen,
  filesOpenInEditor,
  setFilesOpenInEditor,
}: EditorProps) {
  const [fileContent, setFileContent] = useState<string>("");
  const textAreaRef = useRef(null);
  const [currentFileType, setCurrentFileType] = useState<string>("");

  const saveFile = () => {
    if (document.activeElement !== textAreaRef.current) return;
    setFileContent((prev) => {
      writeTextFile(currentFile.path, prev);
      console.log("File saved", currentFile.path, prev);
      return prev;
    });
  };

  useEffect(() => {
    if (isEditorOpen) {
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "s") {
          saveFile();
        }
      });
      return () => {
        document.removeEventListener("keydown", (e: KeyboardEvent) => {
          if (e.ctrlKey && e.key === "s") {
            saveFile();
          }
        });
      };
    }
  }, [isEditorOpen]);

  const generateEditorContent = () => {
    if (currentFileType === "text") {
      return (
        <CodeMirror
          value={fileContent}
          ref={textAreaRef}
          onChange={(value, viewUpdate) => {
            setFileContent(value);
            // console.log("File content updated", value);
          }}
          theme={atomone}
          extensions={[javascript({ jsx: true })]}
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
          <div className="bg-secondaryBg ">
            <ul className="flex items-center gap-[1px] overflow-x-auto ">
              {filesOpenInEditor.map((file) => (
                <li key={file.path}>
                  <EditorFileTabLabel
                    file={file}
                    onClick={() => setCurrentFile(file)}
                    onClose={() => {
                      setFilesOpenInEditor(
                        filesOpenInEditor.filter((f) => f.path !== file.path)
                      );
                      if (currentFile.path === file.path) {
                        setCurrentFile(filesOpenInEditor[0]);
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="px-4 py-1 text-sm font-medium bg-primaryBg">
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
