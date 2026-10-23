import { useState } from "react";
import { Frame } from "./page";

export default function Login({
	handleLogin,
}: {
	handleLogin: (user: string, pass: string) => void;
}) {
	return (
		<>
			<Frame>
				<LoginForm handleLogin={handleLogin} />
			</Frame>
		</>
	);
}

function LoginForm({
	handleLogin,
}: {
	handleLogin: (user: string, pass: string) => void;
}) {
	const [passVisible, setPassVisible] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	return (
		<div className="h-full flex text-center justify-center-safe place-items-center px-25">
			<div className="window w-full h-1/2 flex flex-col text-center p-5! gap-3 place-items-center">
				<p>Login Form:</p>
				<form
					className="flex flex-col gap-2 w-1/2 place-items-center"
					onSubmit={(e: React.SubmitEvent) => {
						e.preventDefault();
						try {
							handleLogin(
								e.target.user.value,
								e.target.pass.value,
							);
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
							className="min-w-10! min-h-0! p-0!"
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
		</div>
	);
}
