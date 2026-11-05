import { Frame } from "./page";
import { useContext } from "react";
import useSound from "use-sound";
import { HandleLogoutContext } from "./contexts/logContext";

export default function Landing() {
	return (
		<Frame>
			<Welcome />
		</Frame>
	);
}

function Welcome() {
	const handleLogout = useContext(HandleLogoutContext);
	const [playStartUp] = useSound("/sound/start-up.mp3", {
		volume: 0.25,
	});

	return (
		<div className="flex h-full flex-col place-items-center justify-center-safe gap-5 bg-[url('clouds.jpg')] bg-cover bg-center p-8">
			<h2>
				<i>welcome</i>
			</h2>
			<img src="logo.png" className="h-1/2"></img>
			<button
				onClick={() => {
					playStartUp();
					handleLogout();
				}}
			>
				Start Login
			</button>
		</div>
	);
}
