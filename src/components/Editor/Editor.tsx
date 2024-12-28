import { useState, useRef, useEffect } from "react";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { XCodeFile, XCodeFiles, XCodeFileContent } from "@/types";
import EditorHero from "./EditorHero";
import ImageLoader from "./ImageLoader";
import EditorFileTabLabel from "./EditorFileTabLabel";
import { pathToFileType, isTextFile, isImageFile } from "@/lib/utils";
import CodeMirror from "@uiw/react-codemirror";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { langs } from "@uiw/codemirror-extensions-langs";

type EditorProps = {
  currentFile: XCodeFile;
  setCurrentFile: (file: XCodeFile) => void;
  files: XCodeFiles;
  workingDirectory: string;
  isEditorOpen: boolean;
  setIsEditorOpen: (isOpen: boolean) => void;
  filesOpenInEditor: XCodeFile[];
  setFilesOpenInEditor: (files: XCodeFile[]) => void;
  editorDimension: {
    width: string;
    height: string;
  };
  setEditorDimension: (editorDimension: {
    width: string;
    height: string;
  }) => void;
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
  editorDimension,
  setEditorDimension,
}: EditorProps) {
  const textAreaRef = useRef(null);
  const [currentFileContent, setCurrentFileContent] = useState<string>("");
  const [fileContents, setFileContents] = useState<XCodeFileContent[]>([]);
  const [currentFileType, setCurrentFileType] = useState<string>("");
  const [currentFileExtension, setCurrentFileExtension] = useState<string>(
    currentFile.path.split(".").pop()
  );
  const [isCurrentFileChanged, setIsCurrentFileChanged] =
    useState<boolean>(false);
  const [lastCurrentFile, setLastCurrentFile] =
    useState<XCodeFile>(currentFile);

  const saveFile = () => {
    // if (document.activeElement !== textAreaRef.current) return;
    setCurrentFileContent((prev) => {
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

  const editorLangExtensionSetter = (fileExtension: string) => {
    switch (fileExtension) {
      case "js":
        return [langs.javascript()];
      case "ts":
        return [langs.typescript()];
      case "jsx":
        return [langs.jsx()];
      case "tsx":
        return [langs.tsx()];
      case "html":
        return [langs.html()];
      case "css":
        return [langs.css()];
      case "json":
        return [langs.json()];
      case "md":
        return [langs.markdown()];
      case "py":
        return [langs.python()];
      case "java":
        return [langs.java()];
      case "c":
        return [langs.c()];
      case "cpp":
        return [langs.cpp()];
      default:
        return [];
    }
  };

  const generateEditorContent = () => {
    if (currentFileType === "text") {
      const langExtension = editorLangExtensionSetter(currentFileExtension);
      return (
        <CodeMirror
          value={currentFileContent}
          ref={textAreaRef}
          onChange={(value, viewUpdate) => {
            setCurrentFileContent(value);
            setIsCurrentFileChanged(true);
            // console.log("File content updated", value);
          }}
          height={editorDimension.height}
          width={editorDimension.width}
          theme={atomone}
          extensions={langExtension}
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
      currentFile.children === undefined
    ) {
      // Checking if the file content alredy exist or not
      let conditionFlag = true;
      fileContents.forEach((item) => {
        if (item.filePath == currentFile.path) {
          conditionFlag = false;
        }
      });
      console.log(fileContents);
      if (conditionFlag) {
        readTextFile(currentFile.path)
          .then((content) => {
            setCurrentFileContent(content);
            setCurrentFileType("text");
            setCurrentFileExtension(currentFile.path.split(".").pop());
            setIsCurrentFileChanged(false);
            setFileContents((prev) => {
              const item = prev.filter(
                (i) => i.filePath == currentFile.path
              )[0];
              if (item) {
                item.content = content;
                item.fileName = currentFile.name;
                item.fileExtension = currentFile.path.split(".").pop();
                item.fileType = "text";
                item.isChanged = false;
                item.isCurrentFile = true;
                return prev;
              } else {
                return [
                  ...prev,
                  {
                    content: content,
                    fileName: currentFile.name,
                    filePath: currentFile.path,
                    isChanged: false,
                    isCurrentFile: true,
                    fileExtension: currentFile.path.split(".").pop(),
                    fileType: "text",
                  },
                ];
              }
            });
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
      } else {
        setFileContents((prev) => {
          prev.forEach((item) => {
            if (item.filePath == lastCurrentFile.path) {
              item.content = currentFileContent;
              item.isChanged = isCurrentFileChanged;
              item.isCurrentFile = false;
            }
          });
          return prev;
        });
        setFileContents((prev) => {
          prev.forEach((item) => {
            if (item.filePath == currentFile.path) {
              setCurrentFileContent(item.content);
              setCurrentFileExtension(item.fileExtension);
              setCurrentFileType(item.fileType);
              item.isCurrentFile = true;
            }
          });
          // console.log(prev);
          return prev;
        });
      }
      setLastCurrentFile(currentFile);
    }
  }, [currentFile, filesOpenInEditor]);

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
                        if (filesOpenInEditor.length > 1) {
                          setCurrentFile(filesOpenInEditor[0]);
                        } else {
                          setIsEditorOpen(false);
                          setFilesOpenInEditor([]);
                        }
                      }
                    }}
                    isChanged={
                      fileContents.filter((i) => i.filePath == file.path)[0] !==
                      undefined
                        ? fileContents.filter((i) => i.filePath == file.path)[0]
                            .isChanged
                        : false
                    }
                    isCurrent={file.path == currentFile.path}
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
