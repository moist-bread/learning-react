import Image from "next/image";

export default function Home() {
	return (
		<>
			<h1 className="font-mono font-bold text-4xl">FUN FACT HUB</h1>
			<h2 className="font-sans text-1xl m-5">HERE'S THE THING</h2>
			<HubFeed/>
		</>
	);
}

function HubFeed() {
	
	return (
		<div className="flex flex-col justify-center-safe text-center items-center">
			<ul><Facts/></ul>
		</div>
	);
}

/* type Post = ({ title, author, fact, image } : {
	title: string; author:string; fact:string; image: string;}) => void */

function Facts() {

	const facts = [
		{ title: "Quick Animal Fact #6", author: "Marine Biologist", fact: "Everything in the universe is either an Octopus or not an Octopus.", image: "/octopus.jpeg" },
		{ title: "Title 2", author: "Author 2", fact: "Fact Explanation 2", image: "/favicon.ico" },
		{ title: "Title 3", author: "Author 3", fact: "Fact Explanation 3", image: "/favicon.ico" }
	];

	const listItems = facts.map( post =>
		<li className="border rounded-lg w-xl my-8 p-8 flex flex-col">
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
		</li>
	);

	return (<>{listItems}</>);
}
