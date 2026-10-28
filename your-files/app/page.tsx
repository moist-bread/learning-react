"use client";
import { useState, useContext } from "react";
import Landing from "./landing";
import Login from "./login";
import Files from "./files";
import { allUsers, UserAccount, ComputerFiles } from "./user_files";
import { SelectedIdContext } from "./selectedIdContext";

type homeStates = "landing" | "login" | "files";

export default function Home() {
	const [homeState, setHomeState] = useState<homeStates>("files");
	const [selectedUserId, setSelectedUserId] = useState<number | null>(0);

	function handleLogin(user: string, pass: string) {
		let acc: UserAccount | undefined = undefined;
		acc = allUsers.find((u) => u.userName === user);
		console.log(acc);

		let id: number | null = null;
		if (typeof acc !== "undefined") {
			if (pass != acc.password) throw new Error();
			id = acc.userId;
			console.log(id);
			setSelectedUserId(id);
			setHomeState("files");
		} else throw new Error();
	}

	let children: React.JSX.Element = <></>;
	switch (homeState) {
		case "files": {
			children = (
				<Files
					handleLogout={() => {
						setHomeState("login");
						setSelectedUserId(null);
					}}
				/>
			);
			break;
		}
		case "login": {
			children = <Login handleLogin={handleLogin} />;
			break;
		}
		default:
			children = <Landing handleClick={() => setHomeState("login")} />;
	}

	return (
		<SelectedIdContext value={selectedUserId}>
			<Window homeState={homeState}>{children}</Window>
		</SelectedIdContext>
	);
}

type cords = {
	x: number | null;
	y: number | null;
};

function Window({
	children,
	homeState,
}: {
	children: React.JSX.Element;
	homeState: homeStates;
}) {
	const [position, setPosition] = useState<cords>({ x: null, y: null });

	let title: string;
	switch (homeState) {
		case "files": {
			title = "Your Files";
			break;
		}
		case "login": {
			title = "Login...";
			break;
		}
		default:
			title = "Welcome...";
	}

	// -- not working
	const stylePos =
		(typeof position.x === "number" ? " left-" + position.x : "") +
		(typeof position.y === "number" ? " top-" + position.y : "");

	return (
		<div className={"window w-1/2 min-w-sm" + stylePos}>
			<TitleBar title={title} changePosition={setPosition} />
			{children}
			<StatusBar />
		</div>
	);
}

export function TitleBar({
	title,
	changePosition,
}: {
	title: string;
	changePosition: (p: cords) => void;
}) {
	// -- implement window drag by title bar here
	return (
		<div
			className="title-bar mb-1"
			/* onMouseDown={(e) => {
				console.log("onMouseDown");
				let cx = e.clientX;
				let cy = e.clientY;
				console.log("cx: ", cx);
				console.log("cy: ", cy);
				document.onmouseup = () => {
					document.onmouseup = null;
					document.onmousemove = null;
				};
				document.onmousemove = (e) => {
					const new_cx: number = e.clientX;
					const new_cy: number = cy - e.clientY;
					cx = e.clientX;
					cy = e.clientY;
					console.log("new_cx: ", new_cx);
					console.log("new_cy: ", new_cy);
					changePosition({ x: 0, y: 0 });
					console.log("top-[" + new_cy + "px]");
				};
			}}
			onDragEnd={(e) => console.log("onDragEnd")} */
		>
			<div className="title-bar-text">{title}</div>
			<div className="title-bar-controls">
				<button aria-label="Minimize" className="minimize"></button>
				<button aria-label="Maximize" className="maximize"></button>
				<button aria-label="Close" className="close"></button>
			</div>
		</div>
	);
}

export function StatusBar() {
	const id = useContext(SelectedIdContext);

	let acc: UserAccount | undefined = undefined;
	if (typeof id === "number") acc = allUsers.find((u) => u.userId == id);
	let user: string = "";
	let totalFiles: number = 0;
	if (typeof acc !== "undefined") {
		user = acc.userName;
		totalFiles = acc.fileSystem.length - 1;
	}

	return (
		<div className="status-bar">
			<p className="status-bar-field">
				{user === "" ? "No Files." : "Total File(s): " + totalFiles}
			</p>
			<p className="status-bar-field">
				{user === "" ? "No User Logged." : "Logged User: " + user}
			</p>
			<p className="status-bar-field text-right">
				{user === "" ? "Welcome!" : "Explore Your Computer : D"}
			</p>
		</div>
	);
}

export function Frame({ children }: { children: React.JSX.Element }) {
	return (
		<div className="window-body mt-1!">
			<div className="field-border h-100 overflow-y-scroll">
				{children}
			</div>
		</div>
	);
}
