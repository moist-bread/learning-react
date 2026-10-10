import { ReviewInformation } from './reviews';
import { FilteringOptions, FilteringRating, FilteringHype, FilteringMovieYear } from './filter';
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

export function Filters({ filters, ratingFilterToggle, hypeFilterToggle } : 
	{filters: FilteringOptions, ratingFilterToggle: (key: keyof FilteringRating, value: boolean) => void, hypeFilterToggle: (key: keyof FilteringHype, value: boolean) => void}) {
	
	let rateFilterEntries = Object.entries(filters.filteringRating);
	let ratingFilterToggles = rateFilterEntries.map((e, i) => {
		return(
			<div key={i} className='flex flex-row gap-3 pb-1'>
				<input type="checkbox" checked={e[1]} id={i.toString()} name={e[0]}
					onChange={() => {
						ratingFilterToggle(e[0] as keyof FilteringRating, !e[1]);
					}}/>
				<label className="font-symbol font-bold text-xl tracking-wide">{ratingStars(i)}</label>
				<p className='font-mono text-sm'>({i})</p>
			</div>
		);
	});

	let hypeFilterEntries = Object.entries(filters.filteringHype);
	let hypeFilterToggles = hypeFilterEntries.map((e, i) => {
		return(
			<div key={i} className='flex flex-row gap-3 pb-1'>
				<input type="checkbox" checked={e[1]} id={i.toString()} name={e[0]}
					onChange={() => {
						hypeFilterToggle(e[0] as keyof FilteringHype, !e[1]);
					}}/>
				<label className="font-mono font-bold text-lg">{i * 15} - { i !=  hypeFilterEntries.length - 1 && ((i + 1) * 15) - 1}</label>
				{i ==  hypeFilterEntries.length - 1 && <p className='font-symbol font-bold text-3xl'>∞</p>}
			</div>
		);
	});

	return (
		<>
			<h2 className="font-mono text-(--highlight) font-bold text-base">BE PICKY WITH THE REVIEWS</h2>
			<FilterMenu title='RATINGS'>
				<form>
					{ratingFilterToggles}
				</form>
				<button className="font-mono text-base text-left text-(--highlight) tracking-wide underline hover:cursor-pointer"
					onClick={() => {
						rateFilterEntries.forEach((e) => {
							ratingFilterToggle(e[0] as keyof FilteringRating, true);})
					}}>
					reset selection</button>
			</FilterMenu>
			<FilterMenu title='NUMBER OF BOOSTS'>
				<form>
					{hypeFilterToggles}
				</form>
				<button className="font-mono text-base text-left text-(--highlight) tracking-wide underline hover:cursor-pointer"
					onClick={() => {
						hypeFilterEntries.forEach((e) => {
							hypeFilterToggle(e[0] as keyof FilteringHype, true);})
					}}>
					reset selection</button>
			</FilterMenu>

			<FilterMenu title='MOVIE RELEASE YEAR'>
				<form>
					{/* hypeFilterToggles */}
				</form>
				<button className="font-mono text-base text-left text-(--highlight) tracking-wide underline hover:cursor-pointer"
					onClick={() => {
						/* hypeFilterEntries.forEach((e) => {
							hypeFilterToggle(e[0] as keyof FilteringHype, true);}) */
					}}>
					reset selection</button>
			</FilterMenu>
		</>
	);
}

function FilterMenu({ title, children } : {title: string, children: Array<React.JSX.Element>}) {
	return (
		<div className="border rounded-lg bg-(--background) w-full mt-6 p-6 flex flex-col gap-3 mb-6 text-left">
			<h2 className="font-mono font-bold text-lg">{title}</h2>
			{children}
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
		<>
			<h2 className="font-mono text-(--highlight) font-bold text-base">HIGHLY ACLAIMED REVIEWS</h2>
			<ul>
				{reviewArray}
			</ul>
		</>
	);
}

function ThumbnailReview({ review } : {review: ReviewInformation}) {
	return (
		<div className="border rounded-lg bg-(--background) w-full p-6 flex flex-col gap-3 text-left">
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
