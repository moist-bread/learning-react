import { useState, useContext } from "react";
import useSound from "use-sound";
import { Frame } from "./page";
import { HandleLoginContext } from "./contexts/logContext";

export default function Login() {
	return (
		<Frame>
			<div className="flex h-full place-items-center justify-center-safe text-center">
				<LoginForm />
			</div>
		</Frame>
	);
}

function LoginForm() {
	const [passVisible, setPassVisible] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const handleLogin = useContext(HandleLoginContext);
	const [playChimes] = useSound("/sound/chimes.mp3", {
		volume: 0.25,
	});

	return (
		<div className="window flex h-1/2 w-full flex-col place-items-center gap-3 p-5! text-center">
			<p>Login Form:</p>
			<form
				className="flex w-3xs flex-col place-items-center gap-2"
				onSubmit={(e: React.SubmitEvent) => {
					e.preventDefault();
					try {
						handleLogin(e.target.user.value, e.target.pass.value);
						playChimes();
					} catch (err) {
						setError(true);
					}
				}}
			>
				<div className="flex w-full gap-2">
					<label>User</label>
					<input
						className="w-full"
						id="user"
						name="user"
						type="text"
						required
					/>
				</div>
				<div className="flex w-full gap-2">
					<label>Password</label>
					<input
						className="w-full"
						id="pass"
						name="pass"
						type={passVisible ? "text" : "password"}
						required
					/>
					<button
						className="min-h-0! min-w-10! p-0!"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							setPassVisible(!passVisible);
						}}
					>
						{passVisible ? "Hide" : "Show"}
					</button>
				</div>
				<button type="submit">Login</button>
			</form>
			{error && (
				<p className="text-red-500">
					Failed to Login. User or Password was incorrect.
				</p>
			)}
		</div>
	);
}
