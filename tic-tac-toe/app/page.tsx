'use client';
import { useState } from 'react';

export default function Game() {

	const [finished, setFinished] = useState(false);
	const [turn, setTurn] = useState(1);
	const [nextPlayer, setNextPlayer] = useState(turn % 2 == 1 ? 'X' : 'O');
	const [history, setHistory] = useState([Array<string>(9).fill('')]);
	const currentBoard: Array<string> = history[history.length - 1]; 

	function onPlayerAct(grid: Array<string>) {
		setHistory([...history, grid]);
		if (checkWinner(grid))
			return setFinished(true);
		setTurn(turn + 1);
		setNextPlayer((turn + 1) % 2 == 1 ? 'X' : 'O');
	}

	function createHistoryList() {
		return (
			history.map((squares, move: number) => {
				
				let description: string;
				if (move > 0)
					description = "Go to move #" + move;
				else
					description = "Reset to game start";
				
				return (
					<li key={move}>
						<button onClick={() => jumpTo(move + 1)}>{description}</button>
					</li>);
			})
		);
	}

	function jumpTo (move: number) {
		const tempHistory = history.slice(0, move);
		setHistory(tempHistory);
		setFinished(false);
		setTurn(move);
		setNextPlayer(move % 2 == 1 ? 'X' : 'O');
	}

	return (
		<>
			<Greeting name="PLAYER" />
			<h2>ARE YOU READY FOR SOME <b>EXTREME</b> GAMING?</h2>
			<h1>TIC TAC TOE</h1>
			<div className="game">
				<div className="game-board">
					<GameBoard finished={finished} nextPlayer={nextPlayer} grid={currentBoard} onPlayerAct={onPlayerAct} />
					<p>current turn: {turn}</p>
				</div>
				<div className="game-info">
					<div className="status">history list</div>
					<ol>{createHistoryList()}</ol>
				</div>
			</div>
		</>
	);
}

function Greeting({ name } : {name: string}) {
	return <h2>HELLO, {name}</h2>;
}

function GameBoard({ finished, nextPlayer, grid, onPlayerAct } 
	: {finished: boolean, nextPlayer: string, grid: Array<string>, onPlayerAct: (grid: Array<string>) => void }) {

	let status: string;

	if (!finished)
		status = "now playing: " + nextPlayer;
	else
		status = "THE WINNER: " + nextPlayer;

	function onSquareClick (idx: number) {
		const tempGrid = grid.slice();
		if (tempGrid[idx] || finished)
			return;
    	tempGrid[idx] = nextPlayer;
		onPlayerAct(tempGrid);
	}

	return (
		<>
			<div className="status">{status}</div>
			<div className="board-row">
				<Square value={grid[0]} onSquareClick={() => onSquareClick(0)}/>
				<Square value={grid[1]} onSquareClick={() => onSquareClick(1)}/>
				<Square value={grid[2]} onSquareClick={() => onSquareClick(2)}/>
			</div>
			<div className="board-row">
				<Square value={grid[3]} onSquareClick={() => onSquareClick(3)}/>
				<Square value={grid[4]} onSquareClick={() => onSquareClick(4)}/>
				<Square value={grid[5]} onSquareClick={() => onSquareClick(5)}/>
			</div>
			<div className="board-row">
				<Square value={grid[6]} onSquareClick={() => onSquareClick(6)}/>
				<Square value={grid[7]} onSquareClick={() => onSquareClick(7)}/>
				<Square value={grid[8]} onSquareClick={() => onSquareClick(8)}/>
			</div>
		</>
	);
}

function checkWinner(grid: Array<string>): string {

	let lines : Array<Array<number>> = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] : number[] = lines[i];
		if (grid[a] && grid[a] == grid[b] && grid[b] == grid[c])
			return grid[a];
	}
	return '';
}

function Square({ value, onSquareClick } : {value: string, onSquareClick: () => void}) {

	return (
		<button className="square" 
				onClick={onSquareClick}
		>
			{value}
		</button>
	);
}