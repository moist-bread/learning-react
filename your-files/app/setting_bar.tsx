import { useState, useContext, useEffect, useRef } from "react";
import useSound from "use-sound";
import Draggable from "react-draggable";
import { ViewType } from "./types";
import { TitleBar } from "./page";
import { DropDownGroup, DropDownButton } from "./files";
import { ViewContext, SetViewContext } from "./contexts/viewContext";
import {
	DarkModeContext,
	SetDarkModeContext,
} from "./contexts/darkModeContext";

export default function SettingsBar() {
	const [popVisibility, setPopVisibility] = useState(false);
	const [popType, setPopType] = useState<"help" | "no perms">("help");
	const darkMode: boolean | null = useContext(DarkModeContext);
	const setDarkMode = useContext(SetDarkModeContext);
	const [playChimes] = useSound("/sound/chimes.mp3", {
		volume: 0.25,
	});
	const [playChord] = useSound("/sound/chord.mp3", {
		volume: 0.25,
	});

	useEffect(() => {
		function handleEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setPopVisibility(false);
			}
		}
		if (popVisibility) {
			document.addEventListener("keydown", handleEscape);
		}
		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [popVisibility]);

	function handleNoPermsClick() {
		setPopVisibility(true);
		setPopType("no perms");
		playChord();
	}

	return (
		<div className="ml-2 flex">
			{!popVisibility ? (
				<></>
			) : (
				<PopUp type={popType} close={() => setPopVisibility(false)} />
			)}
			<DropDownGroup label="_File">
				<DropDownButton
					handleClick={handleNoPermsClick}
					icon="folder"
					label="New Folder"
				/>
				<DropDownButton
					handleClick={handleNoPermsClick}
					icon="pdf"
					label="New File"
				/>
				<DropDownButton
					handleClick={handleNoPermsClick}
					icon="open-with"
					label="Open With..."
				/>
			</DropDownGroup>
			<DropDownGroup label="_Edit">
				<DropDownButton
					handleClick={() => setDarkMode(true)}
					icon="Dark"
					label={"Dark Mode" + (darkMode === true ? " ✓" : "")}
				/>
				<DropDownButton
					handleClick={() => setDarkMode(false)}
					icon="Light"
					label={"Light Mode" + (darkMode === false ? " ✓" : "")}
				/>
			</DropDownGroup>
			<ViewGroup />
			<DropDownGroup label="_Help">
				<p className="px-2">File Explorer Version:</p>
				<div className="status-bar-field flex flex-row place-items-center">
					<img src="Earth.ico" className="h-3 pl-1" />
					<p className="px-2">0.0.0.1</p>
				</div>
				<DropDownButton
					handleClick={() => {
						setPopVisibility(true);
						setPopType("help");
						playChimes();
					}}
					icon="Help page"
					label="Help Me"
				/>
			</DropDownGroup>
		</div>
	);
}

function PopUp({
	type,
	close,
}: {
	type: "help" | "no perms";
	close: () => void;
}) {
	let title: string;
	let text: string;
	let buttonLeft: string;
	let buttonRight: string;

	switch (type) {
		case "help":
			title = "Help";
			text =
				"To be honest there's not much to help with. Figure it out yourself.";
			buttonLeft = "What?";
			buttonRight = "Thanks I Guess";
			break;

		default:
			title = "Action Not Allowed";
			text =
				"Unfortunately you do not have the necessary permissions to perform that action.";
			buttonLeft = "Denial";
			buttonRight = "Accept";
			break;
	}

	const nodeRef = useRef(null);
	return (
		<div className="absolute top-0 left-0 z-1 flex h-full w-full justify-center bg-(--dark)/75">
			<Draggable nodeRef={nodeRef} handle=".pop-title-bar">
				<div
					ref={nodeRef}
					className="window w-1/4 min-w-xs place-self-center"
				>
					<TitleBar title={title} handleClose={close} />
					<div className="m-3">
						<p className="text-sm">{text}</p>
						<div className="mt-3 flex justify-end gap-3">
							<button onClick={() => close()}>
								{buttonLeft}
							</button>
							<button onClick={() => close()}>
								{buttonRight}
							</button>
						</div>
					</div>
				</div>
			</Draggable>
		</div>
	);
}

function ViewGroup() {
	const view: ViewType = useContext(ViewContext);
	const changeView = useContext(SetViewContext);

	return (
		<DropDownGroup label="_View">
			<DropDownButton
				handleClick={() => changeView("List")}
				icon="List"
				label={"List View" + (view === "List" ? " ✓" : "")}
			/>
			<DropDownButton
				handleClick={() => changeView("Grid")}
				icon="Grid"
				label={"Grid View" + (view === "Grid" ? " ✓" : "")}
			/>
			<DropDownButton
				handleClick={() => changeView("Large")}
				icon="Large"
				label={"Large View" + (view === "Large" ? " ✓" : "")}
			/>
		</DropDownGroup>
	);
}
