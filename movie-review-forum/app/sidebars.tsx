import { ReviewInformation } from './reviews';
import { FilteringOptions, FilteringRating } from './filter';
import { ratingStars } from './page';

export function SideBar({ title, children } : {title: string, children: React.JSX.Element}) {
	return (
		<div className="bg-(--highlight) border w-1/4 p-4 pt-17">
			<div className="bg-(--background) border rounded-b-xl h-full">
				<h2 className="bg-(--accent) border-b font-mono font-bold text-xl px-4 py-1">{title}</h2>
				<div className='p-7'>
					{children}
				</div>
			</div>
		</div>
	);
}

export function Filters({ filters, ratingFilterToggle } : {filters: FilteringOptions, ratingFilterToggle: (key: keyof FilteringRating) => void}) {
	
	let rateFilterEntries = Object.entries(filters.filteringRating);
	
	let ratingFilterToggles = rateFilterEntries.map((v, i) => {
		return(
			<div key={i} className='flex flex-row gap-3 pb-1'>
				<input type="checkbox" defaultChecked={v[1]} id={i.toString()} name={i.toString()}
					onChange={() => {
						ratingFilterToggle(v[0] as keyof FilteringRating);
					}}/>
				<label className="font-symbol font-bold text-xl tracking-wide">{ratingStars(i)}</label>
				<p className='font-mono text-sm'>({i})</p>
			</div>
		);
	});

	return (
		<div>
			<h2 className="font-mono text-(--highlight) font-bold text-base">BE PICKY WITH THE REVIEWS</h2>
			<div className='pt-6'>
				<div className="border rounded-lg bg-(--background) w-full p-6 pb-8 flex flex-col gap-3 text-left">
					<h2 className="font-mono font-bold text-lg">RATINGS</h2>
					<form>
						{ratingFilterToggles}
					</form>
					<button className="font-mono text-base text-left text-(--highlight) tracking-wide underline hover:cursor-pointer">
					reset selection</button>
				</div>
			</div>
		</div>
	);
}

export function Popular({ reviews } : {reviews: Array<ReviewInformation>}) {

	let topReviews = [...reviews];
	topReviews.sort((a, b) => b.hype - a.hype);
	topReviews = topReviews.slice(0, (topReviews.length < 3 ? topReviews.length : 3))

	const reviewArray = topReviews.map( (r) =>
		<li key={r.id} className="pt-6">
			<ThumbnailReview review={r} />
		</li>
	); 

	return (
		<div className="w-full flex flex-col justify-center-safe text-center">
			<h2 className="font-mono text-(--highlight) font-bold text-base">HIGHLY ACLAIMED REVIEWS</h2>
			<ul>
				{reviewArray}
			</ul>
		</div>
	);
}

function ThumbnailReview({ review } : {review: ReviewInformation}) {
	return (
		<div className="border rounded-lg bg-(--background) w-full p-6 pb-8 flex flex-col gap-3 text-left">
			<div className='flex flex-row place-items-center gap-2 font-mono'>
				<h2 className="font-bold text-lg">{review.movieName}</h2>
				<p className="text-(--highlight) text-sm">({review.movieYear})</p>
			</div>
			<h2 className="font-symbol font-bold text-xl">{ratingStars(review.rating)}</h2>
			<div className="border rounded-lg border-(--highlight) p-4 font-sans">
				<p className="text-wrap">{review.review}</p>
				<h4 className="text-(--highlight) text-sm mt-5">by {review.reviewerName}</h4>
			</div>
			<h2 className="font-sans text-sm text-(--highlight) text-right tracking-wide italic">
				{review.hype} boosts</h2>
		</div>
	);
}
