import { useContext } from "react";
import { ComputerFiles, FileObjectNode, FileObject, ViewType } from "./types";
import { ViewContext } from "./contexts/viewContext";

export default function Content({
	files,
	pwd,
	changePwd,
}: {
	files: ComputerFiles;
	pwd: number;
	changePwd: (n: number) => void;
}) {
	const view: ViewType = useContext(ViewContext);
	const currRoot: FileObjectNode | undefined = files.find((f) => f.id == pwd);

	let filesToDispaly: ComputerFiles = [];
	if (typeof currRoot !== "undefined") {
		filesToDispaly = files.filter((f) => {
			if (currRoot.childIds.includes(f.id)) return f;
		});
	}

	let display =
		view === "List"
			? filesToDispaly.map((f) => {
					return (
						<ListViewFile
							key={f.id}
							f={f}
							handleDClick={() => changePwd(f.id)}
						/>
					);
				})
			: filesToDispaly.map((f) => {
					return (
						<GridViewFile
							key={f.id}
							f={f}
							handleDClick={() => changePwd(f.id)}
							large={view === "Large"}
						/>
					);
				});

	if (display.length === 0) {
		if (typeof currRoot === "undefined" || currRoot.file.type === "folder")
			display = [
				<div
					key={0}
					className="mt-5 w-full justify-center place-self-center text-center"
				>
					<p className="text-xl text-(--accent)">Empty Folder...</p>
				</div>,
			];
		else display = [<FileFocus key={0} file={currRoot.file} />];
	}

	return (
		<div className="m-2 flex flex-wrap">
			{view === "List" && filesToDispaly.length !== 0 && <ListHeader />}
			{display}
		</div>
	);
}

function ListViewFile({
	f,
	handleDClick,
}: {
	f: FileObjectNode;
	handleDClick: () => void;
}) {
	return (
		<div
			className="flex w-full flex-row gap-3 px-2 py-1 text-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light) active:bg-(--accent)/75 active:inset-ring-2 active:inset-ring-(--light)/50"
			onDoubleClick={handleDClick}
		>
			<div className="flex w-full flex-row justify-between gap-2">
				<div className="flex w-1/2 flex-row gap-3">
					<img
						src={f.file.type + ".ico"}
						className="size-4 place-self-center"
					/>
					<p className="truncate text-left text-sm">{f.file.name}</p>
				</div>
				<div className="flex w-1/2 flex-row place-items-center justify-between gap-2">
					<p>{f.file.type}</p>
					<p className="text-[10px] lg:text-xs">
						{convertFileSize(f.file.size)}
					</p>
					<p className="text-[10px] lg:text-xs">
						{convertLastModified(f.file.lastModified)}
					</p>
				</div>
			</div>
		</div>
	);
}

function GridViewFile({
	f,
	handleDClick,
	large,
}: {
	f: FileObjectNode;
	handleDClick: () => void;
	large: boolean;
}) {
	const sizing: string = large ? "size-80 gap-5 p-8" : "h-20 w-17 p-2";

	return (
		<div
			className={
				"flex flex-col text-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light) active:bg-(--accent)/75 active:inset-ring-2 active:inset-ring-(--light)/50 " +
				sizing
			}
			onDoubleClick={handleDClick}
		>
			<img
				src={f.file.type + ".ico"}
				className={
					large
						? "size-50 place-self-center"
						: "size-10 place-self-center"
				}
			/>
			<p className={large ? "truncate text-sm" : "text-2xs truncate"}>
				{f.file.name}
			</p>
		</div>
	);
}

function ListHeader() {
	return (
		<div className="flex w-full flex-row justify-between gap-2 px-2 text-(--accent)">
			<p className="w-1/2">_Name</p>
			<div className="flex w-1/2 flex-row justify-between gap-2">
				<p>_Type</p>
				<p>_Size</p>
				<p>_Last Modified</p>
			</div>
		</div>
	);
}

function FileFocus({ file }: { file: FileObject }) {
	return (
		<div className="h-full w-full content-center justify-center-safe">
			<div className="flex flex-col justify-center-safe p-5 text-center text-wrap">
				<img
					src={file.type + ".ico"}
					className="h-50 w-50 place-self-center"
				/>
				<div className="m-2 flex flex-row justify-center-safe">
					<p className="mr-2 text-lg text-(--accent)">File Name:</p>
					<p className="text-lg">{file.name}</p>
				</div>
				<div className="flex flex-row justify-center-safe">
					<p className="mr-2 text-base text-(--accent)">Type:</p>
					<p className="text-base">{file.type}</p>
				</div>
				<div className="flex flex-row justify-center-safe">
					<p className="mr-2 text-base text-(--accent)">Size:</p>
					<p className="text-base">{convertFileSize(file.size)}</p>
				</div>
				<div className="flex flex-row justify-center-safe">
					<p className="mr-2 text-base text-(--accent)">
						Last Modified:
					</p>
					<p className="text-base">
						{convertLastModified(file.lastModified)}
					</p>
				</div>
			</div>
		</div>
	);
}

function convertFileSize(size: number): string {
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

	return size + " " + measureSize;
}

function convertLastModified(modTime: number): string {
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

	return modTime + " " + measureTime + " ago";
}
