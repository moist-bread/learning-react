import Image from "next/image";

function Greeting({ name } : {name: string}) {
	return <h1>Hello, {name}</h1>;
}

export default function App() {
	return (
		<>
			<Greeting name="PLAYER" />
			<h1>ARE YOU READY FOR SOME GAMING?</h1>
			<div className="board-row">
				<button className="square">X</button>
				<button className="square">X</button>
				<button className="square">X</button>
			</div>
			<div className="board-row">
				<button className="square">X</button>
				<button className="square">X</button>
				<button className="square">X</button>
			</div>
			<div className="board-row">
				<button className="square">X</button>
				<button className="square">X</button>
				<button className="square">X</button>
			</div>
		</>
	);
}

