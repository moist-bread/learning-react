import { useState, useContext } from "react";
import useSound from "use-sound";
import { UserAccount, ComputerFiles, FileObjectNode, ViewType } from "./types";
import { allUsers } from "./user_files";
import { Frame } from "./page";
import SettingsBar from "./setting_bar";
import Content from "./content";
import { LoggedIdContext } from "./contexts/logContext";
import { ViewContext, SetViewContext } from "./contexts/viewContext";
import { HandleLogoutContext } from "./contexts/logContext";

export default function Files() {
	const [view, setView] = useState<ViewType>("Grid");
	const [pwd, setPwd] = useState<number>(0);
	const id = useContext(LoggedIdContext);

	let acc: UserAccount | undefined = undefined;
	if (typeof id === "number") acc = allUsers.find((u) => u.userId == id);
	if (typeof acc === "undefined") return <></>;

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
	const [playChord] = useSound("/sound/chord.mp3", {
		volume: 0.25,
	});

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
						else playChord();
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
						else playChord();
					}}
				>
					&gt;&gt;
				</button>
				<div className="field-border w-full truncate px-2!">{path}</div>
			</div>
			<DropDownGroup label="_Profile">
				<p className="px-2">Logged as:</p>
				<div className="status-bar-field flex flex-row place-items-center">
					<img src="Smiley face.ico" className="h-3 pl-1" />
					<p className="px-2">{userName} (You)</p>
				</div>
				<DropDownButton
					handleClick={useContext(HandleLogoutContext)}
					icon="Shortcut"
					label="Log Out"
				/>
			</DropDownGroup>
		</div>
	);
}

export function DropDownGroup({
	children,
	label,
}: {
	children: Array<React.JSX.Element>;
	label: string;
}) {
	return (
		<div className="group">
			<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--light)">
				{label}
			</h5>
			<div className="window absolute hidden min-w-20 group-hover:block">
				{children}
			</div>
		</div>
	);
}

export function DropDownButton({
	handleClick,
	icon,
	label,
}: {
	handleClick: () => void;
	icon: string;
	label: string;
}) {
	return (
		<div
			className="flex flex-row place-items-center hover:cursor-pointer hover:bg-(--accent) hover:text-(--light)"
			onClick={handleClick}
		>
			<img src={icon + ".ico"} className="h-3 pl-1" />
			<p className="px-2">{label}</p>
		</div>
	);
}
