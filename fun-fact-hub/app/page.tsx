'use client';
import { useState } from 'react';

export default function Home() {
	const [highlightTheme, setHighlightTheme] = useState("none");

	return (
		<>
			<h1 className="font-mono font-bold text-4xl">FUN FACT HUB</h1>
			<h2 className="font-sans text-xl m-5">HERE'S THE THING</h2>
			<br />
			<h2 className="font-mono text-xl m-5">HIGHLIGHT A THEME</h2>
			<select className="border rounded-lg p-3 text-center w-xl self-center text-(--highlight) hover:cursor-pointer"
					defaultValue="none"
					onChange={e => setHighlightTheme(e.target.value)}
			>
				<option value="none">None</option>
				<option value="tech">Technology</option>
				<option value="animal">Animal</option>
			</select>
			<HubFeed>
				<Facts theme={highlightTheme} />
			</HubFeed>
		</>
	);
}

function HubFeed({ children } : {children: React.JSX.Element}) {
	
	return (
		<div className="flex flex-col justify-center-safe text-center items-center">
			<ul>
				{children}
			</ul>
		</div>
	);
}

function Facts({ theme } : {theme: string}) : React.JSX.Element[] {

	const facts = [
		{ id:1, theme:"tech", title: "When Did Phones Get So Smart?", author: "Redditor", fact: "The very first Smartphone was the IBM Simon, released on 1994. It combined the functions of a mobile phone and a personal digital assistant (PDA).", image: "/ibmsimon.jpg" },
		{ id:2, theme:"animal", title: "Quick Animal Fact", author: "A Marine Biologist Probably", fact: "Everything in the universe is either an Octopus or not an Octopus.", image: "/octopus.jpeg" },
		{ id:3, theme:"animal", title: "Title 3", author: "Author 3", fact: "Fact Explanation 3", image: "/favicon.ico" },
		{ id:4, theme:"animal", title: "Small but Hefty", author: "Nosferatu", fact: "At birth a Baby Bat weighs 25% of the Adult Bat. Which is quite helfty comparing to Human Babies with only 5%.", image: "/babybat.jpg" }
	];

	const listItems = facts.map( post =>

		<li className="border rounded-lg w-xl my-8 p-8 flex flex-col" key={post.id}>
			<div className="text-left">
				<h2 className="font-mono font-bold text-xl">{post.title}</h2>
				<h4 className="text-(--highlight) font-mono text-sm mb-5">by {post.author}</h4>
				<p>{post.fact}</p>
			</div>
			<div className="self-center max-w-md pt-8">
				<img
					src={post.image}
				/>
			</div>
			<span className="flex text-(--highlight) font-mono text-sm mt-8 justify-between">
				<p>FACT #{post.id}</p>
				{post.theme == theme && <p className="font-bold bg-(--color-foreground) ">HIGHLIGHTED ★</p>}
			</span>
		</li>
	);

	return listItems;
}
