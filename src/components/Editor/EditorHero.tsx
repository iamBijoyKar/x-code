export default function EdirorHero() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <img src="/X-Code.png" className="" width={"200px"} alt="" />
      <h1 className="text-4xl text-center font-bold text-primaryText font-mono  ">
        Welcome to XCode
      </h1>
      <p className="text-xl text-center font-medium text-primaryText mt-2">
        Open a project to get started
      </p>
      <div className=" mt-6 flex flex-col items-center gap-4 mx-w-[60%] ">
        <span className="flex gap-2 items-center">
          <span className="">Open a project</span>
          <pre className="font-code text-sm">
            <code
              className="text-primaryText bg-slate-700 px-2 py-1 rounded"
              style={{ boxShadow: "0 3px #00000088" }}
            >
              Ctrl+Shift+O
            </code>
          </pre>
        </span>
        <span className="flex gap-2 items-center">
          <span className="">Create a new project</span>
          <pre className="font-code text-sm">
            <code
              className="text-primaryText bg-slate-700 px-2 py-1 rounded"
              style={{ boxShadow: "0 3px #00000088" }}
            >
              Ctrl+Shift+N
            </code>
          </pre>
        </span>
      </div>
      <div className="absolute bottom-0 right-1">
        <span className="text-xs text-center text-primaryText opacity-60">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/iamBijoyKar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primaryText"
          >
            Bijoy Kar
          </a>
        </span>
      </div>
    </div>
  );
}
