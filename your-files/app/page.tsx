"use client";
import { useState, useContext, useReducer, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { homeStates, LogAction, UserAccount } from "./types";
import { allUsers } from "./user_files";
import Landing from "./landing";
import Login from "./login";
import Files from "./files";
import {
	LoggedIdContext,
	HandleLogoutContext,
	HandleLoginContext,
} from "./contexts/logContext";
import {
	DarkModeContext,
	SetDarkModeContext,
} from "./contexts/darkModeContext";

export default function Home() {
	const [darkMode, setDarkMode] = useState<boolean | null>(null);
	const [homeState, setHomeState] = useState<homeStates>("landing");
	const [loggedId, dispatch] = useReducer(loggedReducer, null);

	useEffect(() => {
		if (darkMode === null)
			setDarkMode(
				window.matchMedia("(prefers-color-scheme: dark)").matches,
			);
		document.documentElement.classList.toggle("dark", darkMode === true);
	}, [darkMode]);

	let children: React.JSX.Element;
	switch (homeState) {
		case "files": {
			children = <Files />;
			break;
		}
		case "login": {
			children = <Login />;
			break;
		}
		default:
			children = <Landing />;
	}

	return (
		<ApplyContexts
			id={loggedId}
			dispatch={dispatch}
			changeHomeState={setHomeState}
			darkMode={darkMode}
			setDarkMode={setDarkMode}
		>
			<Window homeState={homeState}>{children}</Window>
		</ApplyContexts>
	);
}

function loggedReducer(id: number | null, act: LogAction) {
	switch (act.type) {
		case "logout": {
			return null;
		}
		case "login": {
			return act.id;
		}
	}
}

function ApplyContexts({
	children,
	id,
	dispatch,
	changeHomeState,
	darkMode,
	setDarkMode,
}: {
	children: React.JSX.Element;
	id: number | null;
	dispatch: React.ActionDispatch<[act: LogAction]>;
	changeHomeState: React.Dispatch<React.SetStateAction<homeStates>>;
	darkMode: boolean | null;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>;
}) {
	function handleLogin(user: string, pass: string) {
		let acc: UserAccount | undefined = undefined;
		acc = allUsers.find((u) => u.userName === user);

		if (typeof acc !== "undefined") {
			if (pass != acc.password) throw new Error();
			dispatch({ type: "login", id: acc.userId });
			changeHomeState("files");
		} else throw new Error();
	}

	function handleLogout() {
		dispatch({ type: "logout" });
		changeHomeState("login");
	}

	return (
		<LoggedIdContext value={id}>
			<HandleLogoutContext value={handleLogout}>
				<HandleLoginContext value={handleLogin}>
					<DarkModeContext value={darkMode}>
						<SetDarkModeContext value={setDarkMode}>
							{children}
						</SetDarkModeContext>
					</DarkModeContext>
				</HandleLoginContext>
			</HandleLogoutContext>
		</LoggedIdContext>
	);
}

function Window({
	children,
	homeState,
}: {
	children: React.JSX.Element;
	homeState: homeStates;
}) {
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

	const nodeRef = useRef(null);
	return (
		<Draggable nodeRef={nodeRef} handle=".window-title-bar" bounds="parent">
			<div
				ref={nodeRef}
				id="window"
				className="window absolute w-1/2 min-w-sm"
			>
				<TitleBar title={title} />
				{children}
				<StatusBar />
			</div>
		</Draggable>
	);
}

export function TitleBar({
	title,
	handleClose = undefined,
}: {
	title: string;
	handleClose?: (() => void) | undefined;
}) {
	let handleID: string;
	if (typeof handleClose === "undefined") handleID = "window-title-bar";
	else handleID = "pop-title-bar";

	return (
		<div className={"title-bar z-1 mb-1 " + handleID}>
			<div className="title-bar-text">{title}</div>
			<div className="title-bar-controls">
				<button aria-label="Minimize" className="minimize"></button>
				<button aria-label="Maximize" className="maximize"></button>
				<button
					onClick={() => {
						if (typeof handleClose !== "undefined") handleClose();
					}}
					aria-label="Close"
					className="close"
				></button>
			</div>
		</div>
	);
}

export function StatusBar() {
	const id = useContext(LoggedIdContext);

	let acc: UserAccount | undefined = undefined;
	if (typeof id === "number") acc = allUsers.find((u) => u.userId == id);
	let user: string | undefined = undefined;
	let totalFiles: number = 0;
	if (typeof acc !== "undefined") {
		user = acc.userName;
		totalFiles = acc.fileSystem.length - 1;
	}

	return (
		<div className="status-bar">
			<p className="status-bar-field">
				{typeof user !== "string"
					? "No Files."
					: "Total File(s): " + totalFiles}
			</p>
			<p className="status-bar-field">
				{typeof user !== "string"
					? "No User Logged."
					: "Logged User: " + user}
			</p>
			<p className="status-bar-field text-right">
				{typeof user !== "string"
					? "Welcome!"
					: "Explore Your Computer : D"}
			</p>
		</div>
	);
}

export function Frame({ children }: { children: React.JSX.Element }) {
	return (
		<div className="window-body mt-1!">
			<div className="field-border h-100 overflow-y-auto">{children}</div>
		</div>
	);
}
