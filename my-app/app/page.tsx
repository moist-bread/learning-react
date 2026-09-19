'use client';
import Image from "next/image";
import { useState } from 'react';

export default function App() {
	return (
		<>
			<Greeting name="PLAYER" />
			<h1>ARE YOU READY FOR SOME GAMING?</h1>
			<GameBoard />
		</>
	);
}

function Greeting({ name } : {name: string}) {
	return <h1>Hello, {name}</h1>;
}

function GameBoard() {
	const [grid, setGrid] = useState(Array(9).fill(''));

	function onSquareClick ({ idx = 0 }: {idx: number}) {
		console.log('CLICKED');
		const tempGrid = grid.slice();
    	tempGrid[idx] = ( tempGrid[idx] == '' ? 'X' : '' );
		setGrid(tempGrid);
	}

	// console.log(grid)

	return (
		<>
			<div className="board-row">
				<Square playerSymbol="a"/>
				<Square playerSymbol="a"/>
				<Square playerSymbol="a"/>
			</div>
			<div className="board-row">
				<Square playerSymbol="a"/>
				<Square playerSymbol="a"/>
				<Square playerSymbol="a"/>
			</div>
			<div className="board-row">
				<Square playerSymbol="a"/>
				<Square playerSymbol="a"/>
				<Square playerSymbol="a"/>
			</div>
		</>
	);
}

function Square({ playerSymbol }: {playerSymbol: string}) {
	const [fill, setFill] = useState('')

	function handleClick () {
		console.log('CLICKED');
		setFill(( fill == '' ? playerSymbol : '' ));
	}
	
	return (
		<button className="square" 
				onClick={handleClick}
		>
			{fill}
		</button>
	);
}