"use client";
import { useState } from "react";

type viewType = "list" | "grid" | "large";
type homeStates = "landing" | "login" | "files";

export default function Home() {
	const [homeState, setHomeState] = useState<homeStates>("landing");
	const [user, setUser] = useState<string>("");

	switch (homeState) {
		case "login": {
			return (
				<Window>
					<TitleBar title="Login..." />
					<Frame>
						<Login
							handleLogin={(user: string) => {
								setUser(user);
								setHomeState("files");
							}}
						/>
					</Frame>
					<StatusBar user={user} />
				</Window>
			);
		}
		case "files": {
			return (
				<Window>
					<TitleBar title="Your Files" />
					<SettingsBar />
					<Frame>
						<Content />
					</Frame>
					<StatusBar user={user} />
				</Window>
			);
		}
		default:
			return (
				<Window>
					<TitleBar title="Welcome..." />
					<Frame>
						<Landing handleClick={() => setHomeState("login")} />
					</Frame>
					<StatusBar user={user} />
				</Window>
			);
	}
}

function Window({ children }: { children: Array<React.JSX.Element> }) {
	return <div className="window w-1/2">{children}</div>;
}

function TitleBar({ title }: { title: string }) {
	return (
		<div className="title-bar">
			<div className="title-bar-text">{title}</div>
			<div className="title-bar-controls">
				<button aria-label="Minimize" className="minimize"></button>
				<button aria-label="Maximize" className="maximize"></button>
				<button aria-label="Close" className="close"></button>
			</div>
		</div>
	);
}

function SettingsBar() {
	return (
		<div className="flex p-1 justify-between">
			<div className="flex gap-2">
				<button>File</button>
				<button>View</button>
				<button>Help</button>
			</div>
			<button>Profile</button>
		</div>
	);
}

function StatusBar({ user }: { user: string }) {
	return (
		<div className="status-bar">
			<p className="status-bar-field">Total Files:</p>
			<p className="status-bar-field">
				{user === "" ? "No User Logged." : "Logged User: " + user}
			</p>
			<p className="status-bar-field text-right">
				Explore Your Computer : )
			</p>
		</div>
	);
}

function Frame({ children }: { children: React.JSX.Element }) {
	return (
		<div className="window-body">
			<div className="field-border-disabled h-100 overflow-y-scroll">
				{children}
			</div>
		</div>
	);
}

function Landing({ handleClick }: { handleClick: () => void }) {
	return (
		<div className="bg-[url('/landing-bg.jpg')] h-full bg-cover bg-center text-center place-content-end p-8">
			<h2>
				<i>welcome</i>
			</h2>
			<button onClick={handleClick}>Start Login</button>
		</div>
	);
}

function Login({ handleLogin }: { handleLogin: (user: string) => void }) {
	return (
		<div className="h-full flex text-center justify-center-safe place-items-center p-3">
			<div className="window w-full h-1/2 flex flex-col text-center p-5! gap-3 place-items-center">
				<p>Login Form:</p>
				<form
					className="flex flex-col gap-2 w-full place-items-center"
					onSubmit={(e: React.SubmitEvent) => {
						e.preventDefault();
						handleLogin(e.target.user.value);
						/* setUser(e.target.user.value);
						setHomeState("files"); */
						e.target.reset();
					}}
				>
					<div className="flex justify-between w-1/2">
						<label>User</label>
						<input id="user" name="user" type="text" required />
					</div>
					<div className="flex justify-between w-1/2">
						<label>Password</label>
						<input id="pass" name="pass" type="text" required />
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
}

function Content() {
	return (
		<>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>Work area</p>
		</>
	);
}
