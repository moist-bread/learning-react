import { useState, useContext } from "react";
import { Frame } from "./page";
import {
	allUsers,
	UserAccount,
	ComputerFiles,
	FileObjectNode,
	FileObject,
	FileType,
} from "./user_files";
import { SelectedIdContext } from "./selectedIdContext";

type viewType = "list" | "grid" | "large";

export default function Files({ handleLogout }: { handleLogout: () => void }) {
	const [view, setView] = useState<viewType>("grid");
	const [pwd, setPwd] = useState<number>(0); // change into a context later?
	const id = useContext(SelectedIdContext);

	let acc: UserAccount | undefined = undefined;
	if (typeof id === "number") acc = allUsers.find((u) => u.userId == id);
	if (typeof acc === "undefined") {
		handleLogout();
		return <></>;
	}

	return (
		<>
			<OptionsBar
				userName={acc.userName}
				handleLogout={handleLogout}
				pwd={pwd}
				changePwd={(n) => setPwd(n)}
				files={acc.fileSystem}
			/>
			<SettingsBar view={view} changeView={setView} />
			<Frame>
				<Content
					view={view}
					files={acc.fileSystem}
					pwd={pwd}
					changePwd={(n) => setPwd(n)}
				/>
			</Frame>
		</>
	);
}

function OptionsBar({
	userName,
	handleLogout,
	pwd,
	changePwd,
	files,
}: {
	userName: string;
	handleLogout: () => void;
	pwd: number;
	changePwd: (n: number) => void;
	files: ComputerFiles;
}) {
	let currPwd: number = pwd;
	const currFolder: FileObjectNode | undefined = files.find(
		(f) => f.id == currPwd,
	);
	let path: string = "";
	let folder = currFolder;
	while (typeof folder !== "undefined") {
		path = "/" + folder.file.name + path;
		folder = files.find((f) => f.childIds.includes(currPwd));
		if (typeof folder !== "undefined") currPwd = folder.id;
	}

	return (
		<div className="window flex justify-between m-2 mb-1 p-1! pb-1! place-items-center">
			<div className="flex gap-2 w-7/8">
				<button
					className="min-w-10! min-h-0! p-0!"
					onClick={() => {
						const parent: FileObjectNode | undefined = files.find(
							(f) => f.childIds.includes(pwd),
						);
						if (typeof parent !== "undefined") changePwd(parent.id);
					}}
				>
					&lt;&lt;
				</button>
				<button
					className="min-w-10! min-h-0! p-0!"
					onClick={() => {
						if (
							typeof currFolder !== "undefined" &&
							currFolder.childIds.length > 0
						)
							changePwd(currFolder.childIds[0]);
					}}
				>
					&gt;&gt;
				</button>
				<div className="field-border px-2! w-full truncate">{path}</div>
			</div>
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground) ">
					_Profile
				</h5>
				<div className="window hidden absolute group-hover:block">
					<p className="px-2">Logged as:</p>
					<div className="status-bar-field flex flex-row place-items-center">
						<img src="Smiley face.ico" className="h-3 pl-1" />
						<p className="px-2">{userName} (You)</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:bg-(--accent) hover:text-(--foreground) hover:cursor-pointer"
						onClick={handleLogout}
					>
						<img src="Shortcut (big).ico" className="h-3 pl-1" />
						<p className="px-2">Log Out</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function SettingsBar({
	view,
	changeView,
}: {
	view: viewType;
	changeView: (v: viewType) => void;
}) {
	return (
		<div className="flex ml-2">
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground) ">
					_File
				</h5>
				<div className="window hidden absolute group-hover:block">
					<p>thing 1</p>
					<p>thing 2</p>
					<p>thing 3</p>
				</div>
			</div>
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground) ">
					_Edit
				</h5>
			</div>
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground) ">
					_View
				</h5>
				<div className="window hidden absolute group-hover:block">
					<div
						className="flex flex-row place-items-center hover:bg-(--accent) hover:text-(--foreground) hover:cursor-pointer"
						onClick={() => changeView("list")}
					>
						<img src="106.ico" className="h-3 pl-1" />
						<p className="px-2">
							List View{view === "list" ? " ✓" : ""}
						</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:bg-(--accent) hover:text-(--foreground) hover:cursor-pointer"
						onClick={() => changeView("grid")}
					>
						<img src="129.ico" className="h-3 pl-1" />
						<p className="px-2">
							Grid View{view === "grid" ? " ✓" : ""}
						</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:bg-(--accent) hover:text-(--foreground) hover:cursor-pointer"
						onClick={() => changeView("large")}
					>
						<img src="528.ico" className="h-3 pl-1" />
						<p className="px-2">
							Large View{view === "large" ? " ✓" : ""}
						</p>
					</div>
				</div>
			</div>
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground) ">
					_Help
				</h5>
			</div>
		</div>
	);
}

function Content({
	view,
	files,
	pwd,
	changePwd,
}: {
	view: viewType;
	files: ComputerFiles;
	pwd: number;
	changePwd: (n: number) => void;
}) {
	const currRoot: FileObjectNode | undefined = files.find((f) => f.id == pwd);
	let filesToDispaly: ComputerFiles = [];
	if (typeof currRoot !== "undefined") {
		filesToDispaly = files.filter((f) => {
			if (currRoot.childIds.includes(f.id)) return f;
		});
	}

	let display = filesToDispaly.map((f) => {
		return (
			<div
				key={f.id}
				className="flex flex-col text-center p-2 h-20 w-17 hover:bg-(--accent) hover:text-(--foreground) hover:cursor-pointer active:bg-(--accent)/75 active:bg-(--accent)/75 active:inset-ring-2 active:inset-ring-(--foreground)/50"
				onDoubleClick={() => changePwd(f.id)}
			>
				<img
					src={f.file.type + ".ico"}
					className="h-10 w-10 place-self-center"
				/>
				<p className="text-sm truncate">{f.file.name}</p>
			</div>
		);
	});

	if (display.length === 0) {
		if (typeof currRoot === "undefined" || currRoot.file.type === "folder")
			display = [
				<div
					key={0}
					className="w-full mt-5 text-center place-self-center justify-center"
				>
					<p className="text-xl text-(--accent)">Empty Folder...</p>
				</div>,
			];
		else display = [<FileFocus key={0} file={currRoot.file} />];
	}

	return <div className="m-2 flex flex-wrap">{display}</div>;
}

function FileFocus({ file }: { file: FileObject }) {
	let size: number = file.size;
	let measureSize: "byte(s)" | "kb(s)" | "mb(s)" | "Gb(s)" = "byte(s)";

	if (size >= 1073741824) {
		size = Math.floor(size / 1073741824);
		measureSize = "Gb(s)";
	} else if (size >= 1048576) {
		size = Math.floor(size / 1048576);
		measureSize = "mb(s)";
	} else if (size >= 1024) {
		size = Math.floor(size / 1024);
		measureSize = "kb(s)";
	}

	let modTime: number = file.lastModified;
	let measureTime: "second(s)" | "minute(s)" | "hour(s)" | "day(s)" =
		"second(s)";

	if (modTime >= 86400) {
		modTime = Math.floor(modTime / 86400);
		measureTime = "day(s)";
	} else if (modTime >= 3600) {
		modTime = Math.floor(modTime / 3600);
		measureTime = "hour(s)";
	} else if (modTime >= 60) {
		modTime = Math.floor(modTime / 60);
		measureTime = "minute(s)";
	}

	return (
		<div className="justify-center-safe content-center h-full w-full">
			<div className="flex flex-col text-wrap justify-center-safe text-center p-5">
				<img
					src={file.type + ".ico"}
					className="h-50 w-50 place-self-center"
				/>
				<div className="flex flex-row justify-center-safe m-2">
					<p className="text-lg text-(--accent) mr-2">File Name:</p>
					<p className="text-lg">{file.name}</p>
				</div>
				<div className="flex flex-row justify-center-safe">
					<p className="text-base text-(--accent) mr-2">Type:</p>
					<p className="text-base">{file.type}</p>
				</div>
				<div className="flex flex-row justify-center-safe">
					<p className="text-base text-(--accent) mr-2">Size:</p>
					<p className="text-base">
						{size} {measureSize}
					</p>
				</div>
				<div className="flex flex-row justify-center-safe">
					<p className="text-base text-(--accent) mr-2">
						Last Modified:
					</p>
					<p className="text-base">
						{modTime} {measureTime} ago
					</p>
				</div>
			</div>
		</div>
	);
}
