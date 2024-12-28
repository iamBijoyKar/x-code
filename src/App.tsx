import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import SideNav from "@/components/SideNav/SideNav";
import SideBar from "@/components/SideBar/SideBar";
import Editor from "./components/Editor/Editor";
import { XCodeFile, XCodeFiles } from "./types";

function App() {
  const [navLocation, setNavLocation] = useState("files");
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [files, setFiles] = useState<XCodeFiles>([]);
  const [workingDirectory, setWorkingDirectory] = useState("");
  const [currentFile, setCurrentFile] = useState<XCodeFile>();
  const [filesOpenInEditor, setFilesOpenInEditor] = useState<XCodeFile[]>([]);
  const [editorDimension, setEditorDimension] = useState({
    width: "1110px",
    height: "600px",
  });
  const navLocations = ["files", "search", "git", "settings"];

  return (
    <main className="w-screen h-screen max-h-screen overflow-hidden bg-primaryBg flex flex-col ">
      <div className="w-full">
        <HeaderBar
          setFiles={setFiles}
          setWorkingDirectory={setWorkingDirectory}
          workingDirectory={workingDirectory}
          files={files}
        />
      </div>
      <div className="flex w-full h-full">
        <div className="w-[50px] min-w-[50px] p-0 h-full flex">
          <SideNav
            current={navLocation}
            sideBarOpen={sideBarOpen}
            setCurrent={setNavLocation}
            setSideBarOpen={setSideBarOpen}
          />
        </div>
        <div className="">
          <SideBar
            current={navLocation}
            sideBarOpen={sideBarOpen}
            files={files}
            workingDirectory={workingDirectory}
            currentFile={currentFile ? currentFile : { path: "" }}
            setCurrentFile={setCurrentFile}
            setEditorOpen={setEditorOpen}
            setSideBarOpen={setSideBarOpen}
            filesOpenInEditor={filesOpenInEditor}
            setFilesOpenInEditor={setFilesOpenInEditor}
            setEditorDimension={setEditorDimension}
          />
        </div>
        <div className="w-full">
          <Editor
            currentFile={currentFile ? currentFile : { path: "" }}
            setCurrentFile={setCurrentFile}
            isEditorOpen={editorOpen}
            setIsEditorOpen={setEditorOpen}
            files={files}
            workingDirectory={workingDirectory}
            filesOpenInEditor={filesOpenInEditor}
            setFilesOpenInEditor={setFilesOpenInEditor}
            editorDimension={editorDimension}
            setEditorDimension={setEditorDimension}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
