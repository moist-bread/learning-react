'use client';
import { useState } from 'react';
import { ReviewInformation, startingReviews } from './reviews';

export default function Home() {
	
	const [reviews, setReview] = useState<Array<ReviewInformation>>(startingReviews);
	// const [filteredReviews, setFilteredReviews] = useState(reviews);

	return (
		<>
			<Header/>
			<Forum>
				<SideBar>
					<Filters/>
				</SideBar>
				<Feed reviews={reviews} />
				<SideBar>
					<Popular/>
				</SideBar>
			</Forum>
		</>
	);
}

function Header() {
	return (
		<div className="bg-(--accent) p-2 sticky top-0">
			<h1 className="font-mono font-bold text-xl">MOVIE REVIEW FORUM</h1>
			<h2 className="font-sans text-sm">SHARE YOUR OPINION</h2>
		</div>
	);
}

function Forum({ children } : {children: Array<React.JSX.Element>}) {
	return (
		<div className="flex flex-row gap-5 justify-between m-8">
			{children}
		</div>
	);
}

function SideBar({ children } : {children: React.JSX.Element}) {
	return (
		<div className="bg-(--highlight) border rounded-lg w-1/4 p-3">
			<h2 className="font-sans text-xl mb-5">IM A SIDE BAR</h2>
			{children}
		</div>
	);
}

function Feed({ reviews } : {reviews: Array<ReviewInformation>}) {

	const reviewArray = reviews.map( (r) =>
		<li key={r.id} className="pt-8">
			<Review review={r} />
		</li>
	); 

	return (
		<div className="w-1/2 px-5 flex flex-col justify-center-safe text-center">
			<div className="flex justify-between place-items-center font-mono">
				<h2 className="bg-(--accent) font-bold text-xl px-4 py-1">USER REVIEWS</h2>
				<CreateButton/>
			</div>
			<ul>
				{reviewArray}
			</ul>
		</div>
	);
}

function CreateButton() {
	return (
		<>
			<button command="show-modal" commandfor="create-review-popup" 
				className="border rounded-lg px-4 py-1 text-center bg-(--highlight) text-(--foreground) font-bold hover:cursor-pointer">
				CREATE YOUR REVIEW
			</button>

			<dialog id="create-review-popup" className='border rounded-lg border-(--foreground) w-2/3 h-2/3 bg-(--accent) place-self-center p-10 text-(--foreground) backdrop:bg-(--background) backdrop:opacity-50'>
				<div>
					<div className="flex justify-between place-items-center font-mono mb-8">
						<h2 className="bg-(--highlight) font-bold text-xl px-4 py-1">CREATE YOUR REVIEW</h2>
						<button command="close" commandfor="create-review-popup" 
							className="border rounded-lg px-4 py-1 text-center bg-(--highlight) font-bold hover:cursor-pointer">
							CLOSE
						</button>
					</div>
					<CreateForm/>
				</div>
			</dialog>
		</>
	);
}

function CreateForm() {
	return (
		<form /* onSubmit={} */>
			<label>
				Rating:
				<select>
				<option value="nothing">None…</option>
				<option>0</option>
				<option>1</option>
				<option>2</option>
				</select>
			</label>
			<br></br>
			<br></br>
			<label>Movie Name:</label>
			<input type="text" id="mname" name="mname" className='bg-(--background)' required></input>
			<br></br>
			<br></br>
			<label>Movie Year:</label>
			<input type="number" id="myear" name="myear" className='bg-(--background)' required></input>
			<br></br>
			<br></br>
			<label>Rating out of 10:</label>
			<input type="number" id="myear" name="myear" className='bg-(--background)' required></input>
			<br></br>
			<br></br>
			<label>Your Review:</label>
			<input type="text" id="myear" name="myear" className='bg-(--background)' required></input>
			<div>
				<button className="border rounded-lg px-4 py-1 text-center bg-(--highlight) font-bold mt-8 hover:cursor-pointer" type="submit">Confirm</button>
			</div>
		</form>
	);
}

function Review({ review } : {review: ReviewInformation}) {
	
	return (
		<div className="border rounded-lg bg-(--background) w-full p-10 pb-8">
			<div className="flex flex-row gap-10">
				<div className="flex flex-col w-1/4 text-left justify-left gap-2">
					<img className="border" 
						src={review.posterPath} />
					<h2 className="font-mono font-bold text-lg">{review.movieName}</h2>
					<p className="text-(--highlight) font-mono text-sm">({review.movieYear})</p>
				</div>
				<div className="flex flex-col text-left w-3/4 pt-1 gap-3">
					<Rating rating={review.rating} />
					<div className="border rounded-lg border-(--highlight) p-4">
						<p className="text-wrap">{review.review}</p>
						<h4 className="text-(--highlight) font-mono text-sm mt-5">by {review.reviewerName}</h4>
					</div>
					<span className="flex text-(--highlight) font-mono text-sm mt-3 justify-between place-items-center">
						<button className="border rounded-lg px-4 py-1 text-center bg-(--highlight) text-(--foreground) hover:cursor-pointer">{review.hype} boost</button>
						<h2 className="font-sans text-sm text-(--highlight) text-right tracking-wide italic opacity-75">movie review forum</h2>
					</span>
				</div>

			</div>
		</div>
	);
}

function Rating({ rating } : {rating: number} ) {

	let stars : string = "";
	const value : number = (rating > 10 ? 10 : Math.round(rating))
	for (let i = 1; i < value; i += 2)
		stars += "★";
	stars += (value % 2 ? "⯪" : "")
	stars = stars.padEnd(5, "☆");
	return (
		<h2 className="font-symbol font-bold text-3xl">{stars}</h2>
	);
}

function Filters() {
	return (
		<div>
			<p>FILTERS</p>
		</div>
	);
}

function Popular() {
	return (
		<div>
			<p>POPULAR</p>
		</div>
	);
}
