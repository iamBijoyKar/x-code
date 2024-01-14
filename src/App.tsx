import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import SideNav from "@/components/SideNav/SideNav";
import SideBar from "@/components/SideBar/SideBar";

function App() {
  const [navLocation, setNavLocation] = useState("files");
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const navLocations = ["files", "search", "git", "settings"];

  return (
    <main className="w-screen h-screen max-h-screen bg-primaryBg flex ">
      <div className="w-[50px] p-0">
        <SideNav
          current={navLocation}
          sideBarOpen={sideBarOpen}
          setCurrent={setNavLocation}
          setSideBarOpen={setSideBarOpen}
        />
      </div>
      <div className="">
        <SideBar current={navLocation} sideBarOpen={sideBarOpen} />
      </div>
      <div className="w-full">
        <h1 className="">Editor</h1>
      </div>
    </main>
  );
}

export default App;
