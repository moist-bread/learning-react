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
		<div className="bg-[url('clouds.jpg')] flex flex-col h-full bg-cover bg-center justify-center-safe place-items-center  p-8 gap-5">
			<h2>
				<i>welcome</i>
			</h2>
			<img src="logo.png" className="h-1/2"></img>
			<button onClick={handleClick}>Start Login</button>
		</div>
	);
}
