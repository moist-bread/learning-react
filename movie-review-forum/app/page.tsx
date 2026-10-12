'use client';
import { useState } from 'react';
import { ReviewInformation, startingReviews } from './reviews';
import { FilteringOptions, startingFilters, FilteringRating, FilteringHype, FilteringMovieYear } from './filter';
import { SideBar, Filters, Popular } from './sidebars';
import CreateButton from './create';

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

	function handleRatingFilterToggle(key: keyof FilteringRating, value: boolean) {
		setFilters((f) => {
			const tempFiltersRate = {...f.filteringRating};
			tempFiltersRate[key] = value;
			return ({...f, filteringRating: tempFiltersRate});
		});
		console.log("updated filters: ", filters);
	}

	function handleHypeFilterToggle(key: keyof FilteringHype, value: boolean) {
		setFilters((f) => {
			const tempFiltersHype = {...f.filteringHype};
			tempFiltersHype[key] = value;
			return ({...f, filteringHype: tempFiltersHype});
		});
		console.log("updated filters: ", filters);
	}

	function handleYearFilterToggle(key: keyof FilteringMovieYear, value: boolean) {
		setFilters((f) => {
			const tempFiltersYear = {...f.filteringMovieYear};
			tempFiltersYear[key] = value;
			return ({...f, filteringMovieYear: tempFiltersYear});
		});
		console.log("updated filters: ", filters);
	}

	return (
		<>
			<Header/>
			<Forum>
				<SideBar title="FILTERS">
					<Filters filters={filters} 
						ratingFilterToggle={handleRatingFilterToggle} 
						hypeFilterToggle={handleHypeFilterToggle} 
						yearFilterToggle={handleYearFilterToggle} />
				</SideBar>
				<Feed reviews={applyFilters(filters, reviews)} createReview={handleReviewCreate} boostReview={handleBoostReview} />
				{/* <></> */}
				<SideBar title="POPULAR">
					<Popular reviews={reviews}/>
				</SideBar>
			</Forum>
		</>
	);
}

function applyFilters (filters: FilteringOptions, reviews: Array<ReviewInformation>) : Array<ReviewInformation> {

	let filteredReviews: Array<ReviewInformation> = [];

	let rateFilterEntries = Object.values(filters.filteringRating);
	let hypeFilterEntries = Object.values(filters.filteringHype);
	let yearFilterEntries = Object.values(filters.filteringMovieYear);

	if(!rateFilterEntries.every((e) => e == true) || !hypeFilterEntries.every((e) => e == true) || !yearFilterEntries.every((e) => e == true))
	{
		reviews.forEach((r) => {
			if (rateFilterEntries[r.rating] &&
				hypeFilterEntries[(r.hype >= 60 ? hypeFilterEntries.length - 1 : Math.trunc(r.hype / 15))] &&
				yearFilterEntries[(r.movieYear < 1980 ? yearFilterEntries.length - 1 : Math.ceil(Math.max(2020 - r.movieYear, 0) / 10))])
				filteredReviews.push(r);
		});
	}
	else
		filteredReviews = [...reviews];
	
	return (filteredReviews.reverse());
}

function Header() {
	return (
		<div className="bg-(--accent) p-2 sticky top-0 text-center">
			<h1 className="font-bold text-xl">MOVIE REVIEW FORUM</h1>
			<h2 className="font-sans text-sm">SHARE YOUR OPINION</h2>
		</div>
	);
}

function Forum({ children } : {children: Array<React.JSX.Element>}) {
	return (
		<div className="flex flex-row xl:gap-5 justify-between mt-8 justify-center-safe lg:m-8">
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
		<div className="w-1/2 lg:mx-5 flex flex-col min-w-md">
			<div className="flex justify-between place-items-center">
				<h2 className="bg-(--accent) font-bold text-xl px-8 py-1">USER REVIEWS</h2>
				<CreateButton createReview={createReview} />
			</div>
			{reviewArray.length > 0 ? 
				<ul>{reviewArray}</ul> : 
				<h2 className="font-bold text-lg text-center pt-16">NO REVIEWS MEET THE FILTERS</h2>}
		</div>
	);
}

function Review({ review, boostReview } : {review: ReviewInformation, boostReview: (id: number) => void}) {
	
	return (
		<div className="border rounded-lg bg-(--background) w-full p-10 pb-8 gap-10 flex flex-col lg:flex-row">
			<div className="w-full lg:w-1/4 justify-left gap-4 flex flex-row lg:flex-col lg:gap-2">
				<img className="border max-w-1/4 lg:max-w-sm" 
					src={review.posterPath} />
				<h2 className="font-bold">{review.movieName}</h2>
				<p className="text-(--highlight) text-sm">({review.movieYear})</p>
			</div>
			<div className="lg:w-3/4 pt-1 gap-3">
				<h2 className="font-symbol font-bold text-3xl">{ratingStars(review.rating)}</h2>
				<div className="border rounded-lg border-(--highlight) p-4">
					<p className="text-wrap font-sans">{review.review}</p>
					<h4 className="text-(--highlight) text-xs mt-5">by {review.reviewerName}</h4>
				</div>
				<div className="flex text-(--highlight) text-sm mt-3 justify-between place-items-center">
					<button className="border rounded-lg px-4 py-1 bg-(--highlight) text-(--foreground) whitespace-pre hover:cursor-pointer"
						onClick={() => boostReview(review.id)}>
						{review.hype} boost{(review.hype == 1 ? " " : "s")}</button>
					<p className="font-sans text-xs text-(--highlight) text-right tracking-wide italic">
						movie review forum</p>
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
