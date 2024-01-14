type FilesProps = {
  files: any[];
  workingDirectory: string;
};

export default function Files({ files, workingDirectory }: FilesProps) {
  return (
    <div className="w-full">
      <h1>{workingDirectory}</h1>
      <ul className="flex flex-col gap-1 overflow-y-auto">
        {files.map((file) => {
          return (
            <li className="" key={file.path}>
              {file.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
