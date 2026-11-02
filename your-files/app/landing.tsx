import { Frame } from "./page";

export default function Landing({ handleClick }: { handleClick: () => void }) {
	return (
		<>
			<Frame>
				<Welcome handleClick={handleClick} />
			</Frame>
		</>
	);
}

function Welcome({ handleClick }: { handleClick: () => void }) {
	return (
		<div className="flex h-full flex-col place-items-center justify-center-safe gap-5 bg-[url('clouds.jpg')] bg-cover bg-center p-8">
			<h2>
				<i>welcome</i>
			</h2>
			<img src="logo.png" className="h-1/2"></img>
			<button onClick={handleClick}>Start Login</button>
		</div>
	);
}
