import { useState, useContext } from "react";
import { Frame, TitleBar } from "./page";
import { allUsers } from "./user_files";
import {
	UserAccount,
	ComputerFiles,
	FileObjectNode,
	ViewType,
	cords,
} from "./types";
import { SelectedIdContext } from "./selectedIdContext";
import Content from "./content";

// !! TO DO
// -- inside _File: no write permission pop up
// -- inside _Edit: dark mode toggle

export default function Files({ handleLogout }: { handleLogout: () => void }) {
	const [view, setView] = useState<ViewType>("Grid");
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
		<div className="window m-2 mb-1 flex place-items-center justify-between p-1! pb-1!">
			<div className="flex w-7/8 gap-2">
				<button
					className="min-h-0! min-w-10! p-0!"
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
					className="min-h-0! min-w-10! p-0!"
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
				<div className="field-border w-full truncate px-2!">{path}</div>
			</div>
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
					_Profile
				</h5>
				<div className="window absolute hidden group-hover:block">
					<p className="px-2">Logged as:</p>
					<div className="status-bar-field flex flex-row place-items-center">
						<img src="Smiley face.ico" className="h-3 pl-1" />
						<p className="px-2">{userName} (You)</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--foreground)"
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
	view: ViewType;
	changeView: (v: ViewType) => void;
}) {
	const [popVisibility, setPopVisibility] = useState(false);

	return (
		<div className="ml-2 flex">
			<div className={popVisibility ? "" : "hidden"}>
				<PopUp
					title="Help"
					text="To be honest there's not much to help with. Figure it out yourself."
					buttonLeft="What?"
					buttonRight="Thanks I Guess"
					close={() => setPopVisibility(false)}
				/>
			</div>
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
					_File
				</h5>
				<div className="window absolute hidden group-hover:block">
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--foreground)"
						/* onClick={() => changeView(label)} */
					>
						<img src={"Light" + ".ico"} className="h-3 pl-1" />
						<p className="px-2">
							New Folder{view === "Grid" ? " ✓" : ""}
						</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--foreground)"
						/* onClick={() => changeView(label)} */
					>
						<img src={"Dark" + ".ico"} className="h-3 pl-1" />
						<p className="px-2">
							New File{view === "Grid" ? " ✓" : ""}
						</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--foreground)"
						/* onClick={() => changeView(label)} */
					>
						<img src={"Dark" + ".ico"} className="h-3 pl-1" />
						<p className="px-2">
							Open With...{view === "Grid" ? " ✓" : ""}
						</p>
					</div>
				</div>
			</div>
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
					_Edit
				</h5>
				<div className="window absolute hidden group-hover:block">
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--foreground)"
						/* onClick={() => changeView(label)} */
					>
						<img src={"Dark" + ".ico"} className="h-3 pl-1" />
						<p className="px-2">
							Dark Mode{view === "Grid" ? " ✓" : ""}
						</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--foreground)"
						/* onClick={() => changeView(label)} */
					>
						<img src={"Light" + ".ico"} className="h-3 pl-1" />
						<p className="px-2">
							Light Mode{view === "Grid" ? " ✓" : ""}
						</p>
					</div>
				</div>
			</div>
			<ViewSettings view={view} changeView={changeView} />
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
					_Help
				</h5>
				<div className="window absolute hidden group-hover:block">
					<p className="px-2">File Explorer Version:</p>
					<div className="status-bar-field flex flex-row place-items-center">
						<img src="Earth (16 colors).ico" className="h-3 pl-1" />
						<p className="px-2">0.0.0.1</p>
					</div>
					<div className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--foreground)">
						<img src="Help page.ico" className="h-3 pl-1" />
						<p
							onClick={() => setPopVisibility(true)}
							className="px-2"
						>
							Help Me
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function PopUp({
	title,
	text,
	buttonLeft,
	buttonRight,
	close,
}: {
	title: string;
	text: string;
	buttonLeft: string;
	buttonRight: string;
	close: () => void;
}) {
	return (
		<div className="absolute top-0 left-0 flex h-full w-full justify-center bg-(--background)/75">
			<div className="window h-1/6 w-1/4 min-w-xs place-self-center">
				<TitleBar
					title={title}
					changePosition={(p: cords) => {
						return;
					}}
				/>
				<div className="m-3">
					<p className="text-sm">{text}</p>
					<div className="mt-3 flex justify-end gap-3">
						<button onClick={() => close()}>{buttonLeft}</button>
						<button onClick={() => close()}>{buttonRight}</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function ViewSettings({
	view,
	changeView,
}: {
	view: ViewType;
	changeView: (v: ViewType) => void;
}) {
	return (
		<div className="group">
			<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
				_View
			</h5>
			<div className="window absolute hidden group-hover:block">
				<ViewChangeButton
					view={view}
					label="List"
					changeView={changeView}
				/>
				<ViewChangeButton
					view={view}
					label="Grid"
					changeView={changeView}
				/>
				<ViewChangeButton
					view={view}
					label="Large"
					changeView={changeView}
				/>
			</div>
		</div>
	);
}

function ViewChangeButton({
	view,
	label,
	changeView,
}: {
	view: ViewType;
	label: ViewType;
	changeView: (v: ViewType) => void;
}) {
	return (
		<div
			className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--foreground)"
			onClick={() => changeView(label)}
		>
			<img src={label + ".ico"} className="h-3 pl-1" />
			<p className="px-2">
				{label} View{view === label ? " ✓" : ""}
			</p>
		</div>
	);
}
