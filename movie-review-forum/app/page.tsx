'use client';
import { useState } from 'react';
import { ReviewInformation, startingReviews } from './reviews';
import { FilteringOptions, startingFilters, FilteringRating } from './filter';
import { SideBar, Filters, Popular } from './sidebars';
import CreateButton from './create';

// !! TO DO
// -- think about filtering options

export default function Home() {
	
	const [reviews, setReview] = useState<Array<ReviewInformation>>(startingReviews);
	const [filters, setFilters] = useState<FilteringOptions>(startingFilters);

	function handleReviewCreate(info: ReviewInformation) {
		info.id = reviews[reviews.length - 1].id + 1;
		setReview([...reviews, info]);
		console.log("updated: ", reviews);
	}

	function handleBoostReview(id: number) {
		let tempReviews = reviews.map((r) => {
			if (r.id != id)
				return (r);
			else
				return ({...r, hype: r.hype + 1}); 
		});
		setReview(tempReviews);
	}

	function handleRatingFilterToggle(key: keyof FilteringRating) {
		const tempFiltersRate = {...filters.filteringRating};
		tempFiltersRate[key] = !tempFiltersRate[key];
		setFilters({...filters, filteringRating: tempFiltersRate});
		console.log("updated filters: ", filters);
	}

	return (
		<>
			<Header/>
			<Forum>
				<SideBar title="FILTERS">
					<Filters filters={filters} ratingFilterToggle={handleRatingFilterToggle}/>
				</SideBar>
				<Feed reviews={applyFilters(filters, reviews)} createReview={handleReviewCreate} boostReview={handleBoostReview} />
				<SideBar title="POPULAR">
					<Popular reviews={reviews}/>
				</SideBar>
			</Forum>
		</>
	);
}

function applyFilters (filters: FilteringOptions, reviews: Array<ReviewInformation>) : Array<ReviewInformation> {
	//const filteredReviews = [...reviews];
	const filteredReviews = [...reviews].reverse();

	return (filteredReviews);
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


function Feed({ reviews, createReview, boostReview } : 
	{reviews: Array<ReviewInformation>, createReview: (info: ReviewInformation) => void, boostReview: (id: number) => void}) {

	const reviewArray = reviews.map( (r) =>
		<li key={r.id} className="pt-8">
			<Review review={r} boostReview={boostReview}/>
		</li>
	); 

	return (
		<div className="w-1/2 px-5 flex flex-col justify-center-safe text-center">
			<div className="flex justify-between place-items-center font-mono">
				<h2 className="bg-(--accent) font-bold text-xl px-8 py-1">USER REVIEWS</h2>
				<CreateButton createReview={createReview} />
			</div>
			<ul>
				{reviewArray}
			</ul>
		</div>
	);
}

function Review({ review, boostReview } : {review: ReviewInformation, boostReview: (id: number) => void}) {
	
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
					<h2 className="font-symbol font-bold text-3xl">{ratingStars(review.rating)}</h2>
					<div className="border rounded-lg border-(--highlight) p-4">
						<p className="text-wrap">{review.review}</p>
						<h4 className="text-(--highlight) font-mono text-sm mt-5">by {review.reviewerName}</h4>
					</div>
					<span className="flex text-(--highlight) font-mono text-sm mt-3 justify-between place-items-center">
						<button className="border rounded-lg px-4 py-1 text-center bg-(--highlight) text-(--foreground) hover:cursor-pointer"
							onClick={() => boostReview(review.id)}>
							{review.hype} boosts</button>
						<h2 className="font-sans text-sm text-(--highlight) text-right tracking-wide italic opacity-75">
							movie review forum</h2>
					</span>
				</div>

			</div>
		</div>
	);
}

export function ratingStars(rating: number) : string {

	let stars : string = "";
	const value : number = (rating > 10 ? 10 : Math.round(rating))
	for (let i = 1; i < value; i += 2)
		stars += "★";
	stars += (value % 2 ? "⯪" : "")
	stars = stars.padEnd(5, "☆");
	return (stars);
}
