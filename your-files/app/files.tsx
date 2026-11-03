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
import { LoggedIdContext } from "./contexts/logContext";
import { ViewContext, SetViewContext } from "./contexts/viewContext";
import { HandleLogoutContext } from "./contexts/logContext";
import {
	DarkModeContext,
	SetDarkModeContext,
} from "./contexts/darkModeContext";
import Content from "./content";

// !! TO DO
// -- inside _File: no write permission pop up

export default function Files() {
	const [view, setView] = useState<ViewType>("Grid");
	const [pwd, setPwd] = useState<number>(0);
	const id = useContext(LoggedIdContext);

	let acc: UserAccount | undefined = undefined;
	if (typeof id === "number") acc = allUsers.find((u) => u.userId == id);
	if (typeof acc === "undefined") {
		const handleLogout = useContext(HandleLogoutContext);
		handleLogout();
		return <></>;
	}

	return (
		<ViewContext value={view}>
			<SetViewContext value={setView}>
				<OptionsBar
					userName={acc.userName}
					pwd={pwd}
					changePwd={(n) => setPwd(n)}
					files={acc.fileSystem}
				/>
				<SettingsBar />
			</SetViewContext>
			<Frame>
				<Content
					files={acc.fileSystem}
					pwd={pwd}
					changePwd={(n) => setPwd(n)}
				/>
			</Frame>
		</ViewContext>
	);
}

function OptionsBar({
	userName,
	pwd,
	changePwd,
	files,
}: {
	userName: string;
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
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--light)">
					_Profile
				</h5>
				<div className="window absolute hidden group-hover:block">
					<p className="px-2">Logged as:</p>
					<div className="status-bar-field flex flex-row place-items-center">
						<img src="Smiley face.ico" className="h-3 pl-1" />
						<p className="px-2">{userName} (You)</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light)"
						onClick={useContext(HandleLogoutContext)}
					>
						<img src="Shortcut (big).ico" className="h-3 pl-1" />
						<p className="px-2">Log Out</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function SettingsBar() {
	const [popVisibility, setPopVisibility] = useState(false);
	const view: ViewType = useContext(ViewContext);
	const darkMode: boolean | null = useContext(DarkModeContext);
	const setDarkMode = useContext(SetDarkModeContext);

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
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--light)">
					_File
				</h5>
				<div className="window absolute hidden group-hover:block">
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light)"
						/* onClick={() => changeView(label)} */
					>
						<img src={"Light" + ".ico"} className="h-3 pl-1" />
						<p className="px-2">
							New Folder{view === "Grid" ? " ✓" : ""}
						</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light)"
						/* onClick={() => changeView(label)} */
					>
						<img src={"Dark" + ".ico"} className="h-3 pl-1" />
						<p className="px-2">
							New File{view === "Grid" ? " ✓" : ""}
						</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light)"
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
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--light)">
					_Edit
				</h5>
				<div className="window absolute hidden group-hover:block">
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light)"
						onClick={() => setDarkMode(true)}
					>
						<img src={"Dark" + ".ico"} className="h-3 pl-1" />
						<p className="px-2">
							Dark Mode{darkMode === true ? " ✓" : ""}
						</p>
					</div>
					<div
						className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light)"
						onClick={() => setDarkMode(false)}
					>
						<img src={"Light" + ".ico"} className="h-3 pl-1" />
						<p className="px-2">
							Light Mode{darkMode === false ? " ✓" : ""}
						</p>
					</div>
				</div>
			</div>
			<ViewSettings />
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--light)">
					_Help
				</h5>
				<div className="window absolute hidden group-hover:block">
					<p className="px-2">File Explorer Version:</p>
					<div className="status-bar-field flex flex-row place-items-center">
						<img src="Earth (16 colors).ico" className="h-3 pl-1" />
						<p className="px-2">0.0.0.1</p>
					</div>
					<div className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light)">
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
		<div className="absolute top-0 left-0 flex h-full w-full justify-center bg-(--dark)/75">
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

function ViewSettings() {
	return (
		<div className="group">
			<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--light)">
				_View
			</h5>
			<div className="window absolute hidden group-hover:block">
				<ViewChangeButton label="List" />
				<ViewChangeButton label="Grid" />
				<ViewChangeButton label="Large" />
			</div>
		</div>
	);
}

function ViewChangeButton({ label }: { label: ViewType }) {
	const view: ViewType = useContext(ViewContext);
	const changeView = useContext(SetViewContext);

	return (
		<div
			className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light)"
			onClick={() => changeView(label)}
		>
			<img src={label + ".ico"} className="h-3 pl-1" />
			<p className="px-2">
				{label} View{view === label ? " ✓" : ""}
			</p>
		</div>
	);
}
