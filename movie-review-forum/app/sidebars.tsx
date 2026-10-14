import { ReviewInformation } from "./reviews";
import {
	FilteringOptions,
	FilteringRating,
	FilteringHype,
	FilteringMovieYear,
} from "./filter";
import { ratingStars } from "./page";

export function SideBar({
	title,
	children,
}: {
	title: string;
	children: React.JSX.Element;
}) {
	return (
		<div className="bg-(--highlight) border w-0 h-auto invisible lg:visible lg:min-w-1/4 lg:p-4 lg:pt-17">
			<div className="bg-(--background) border rounded-b-xl h-full">
				<h2 className="bg-(--accent) border-b font-bold text-center text-xl lg:px-4 lg:py-1">
					{title}
				</h2>
				<div className="lg:p-7">{children}</div>
			</div>
		</div>
	);
}

export function Filters({
	filters,
	ratingFilterToggle,
	hypeFilterToggle,
	yearFilterToggle,
}: {
	filters: FilteringOptions;
	ratingFilterToggle: (key: keyof FilteringRating, value: boolean) => void;
	hypeFilterToggle: (key: keyof FilteringHype, value: boolean) => void;
	yearFilterToggle: (key: keyof FilteringMovieYear, value: boolean) => void;
}) {
	let rateFilterEntries = Object.entries(filters.filteringRating);
	let ratingFilterToggles = rateFilterEntries.map((e, i) => {
		return (
			<div key={i} className="flex flex-row lg:gap-3 lg:pb-1">
				<input
					type="checkbox"
					checked={e[1]}
					id={i.toString()}
					name={e[0]}
					onChange={() => {
						ratingFilterToggle(
							e[0] as keyof FilteringRating,
							!e[1],
						);
					}}
				/>
				<label className="text-md xl:text-lg font-symbol font-bold tracking-wide">
					{ratingStars(i)}
				</label>
				<p className="text-xs invisible xl:visible">({i})</p>
			</div>
		);
	});

	let hypeFilterEntries = Object.entries(filters.filteringHype);
	let hypeFilterToggles = hypeFilterEntries.map((e, i) => {
		return (
			<div key={i} className="flex flex-row lg:gap-3 lg:pb-1">
				<input
					type="checkbox"
					checked={e[1]}
					id={i.toString()}
					name={e[0]}
					onChange={() => {
						hypeFilterToggle(e[0] as keyof FilteringHype, !e[1]);
					}}
				/>
				<label className="text-sm xl:text-base font-bold">
					{i * 15} -{" "}
					{i != hypeFilterEntries.length - 1 && (i + 1) * 15 - 1}
				</label>
				{i == hypeFilterEntries.length - 1 && (
					<p className="font-symbol font-bold text-xl xl:text-2xl">
						∞
					</p>
				)}
			</div>
		);
	});

	let yearFilterEntries = Object.entries(filters.filteringMovieYear);
	let yearFilterToggles = yearFilterEntries.map((e, i) => {
		return (
			<div key={i} className="flex flex-row lg:gap-3 lg:pb-1">
				<input
					type="checkbox"
					checked={e[1]}
					id={i.toString()}
					name={e[0]}
					onChange={() => {
						yearFilterToggle(
							e[0] as keyof FilteringMovieYear,
							!e[1],
						);
					}}
				/>
				<label className="text-sm xl:text-base font-bold">
					{2020 - i * 10}'s
					{i == yearFilterEntries.length - 1 && " and older"}
					{i == 0 && " and beyond"}
				</label>
			</div>
		);
	});

	return (
		<>
			<h2 className="text-(--highlight) font-bold text-center text-base">
				BE PICKY WITH THE REVIEWS
			</h2>
			<FilterMenu title="RATINGS" toggles={ratingFilterToggles}>
				<button
					className="text-sm xl:text-base text-left text-(--highlight) tracking-wide underline hover:cursor-pointer"
					onClick={() => {
						rateFilterEntries.forEach((e) => {
							ratingFilterToggle(
								e[0] as keyof FilteringRating,
								true,
							);
						});
					}}
				>
					reset selection
				</button>
			</FilterMenu>
			<FilterMenu title="NUMBER OF BOOSTS" toggles={hypeFilterToggles}>
				<button
					className="text-sm xl:text-base text-left text-(--highlight) tracking-wide underline hover:cursor-pointer"
					onClick={() => {
						hypeFilterEntries.forEach((e) => {
							hypeFilterToggle(e[0] as keyof FilteringHype, true);
						});
					}}
				>
					reset selection
				</button>
			</FilterMenu>
			<FilterMenu title="MOVIE RELEASE YEAR" toggles={yearFilterToggles}>
				<button
					className="text-sm xl:text-base text-left text-(--highlight) tracking-wide underline hover:cursor-pointer"
					onClick={() => {
						yearFilterEntries.forEach((e) => {
							yearFilterToggle(
								e[0] as keyof FilteringMovieYear,
								true,
							);
						});
					}}
				>
					reset selection
				</button>
			</FilterMenu>
		</>
	);
}

function FilterMenu({
	title,
	toggles,
	children,
}: {
	title: string;
	toggles: Array<React.JSX.Element>;
	children: React.JSX.Element;
}) {
	return (
		<div className="border rounded-lg bg-(--background) w-0 lg:w-full lg:p-6 flex flex-col lg:gap-3 lg:my-6">
			<h2 className="font-bold text-md xl:text-lg">{title}</h2>
			<form>{toggles}</form>
			{children}
		</div>
	);
}

export function Popular({ reviews }: { reviews: Array<ReviewInformation> }) {
	let topReviews = [...reviews];
	topReviews.sort((a, b) => b.hype - a.hype);
	topReviews = topReviews.slice(
		0,
		topReviews.length < 3 ? topReviews.length : 3,
	);

	const reviewArray = topReviews.map((r) => (
		<li key={r.id} className="lg:pt-6">
			<ThumbnailReview review={r} />
		</li>
	));

	return (
		<>
			<h2 className="text-(--highlight) font-bold text-center text-base">
				HIGHLY ACLAIMED REVIEWS
			</h2>
			<ul>{reviewArray}</ul>
		</>
	);
}

function ThumbnailReview({ review }: { review: ReviewInformation }) {
	return (
		<div className="border rounded-lg bg-(--background) w-0 lg:w-full lg:p-6 flex flex-col lg:gap-3">
			<div className="flex flex-row place-items-center gap-2">
				<h2 className="font-bold text-sm xl:text-base">
					{review.movieName}
				</h2>
				<p className="text-(--highlight) text-xs xl:text-sm">
					({review.movieYear})
				</p>
			</div>
			<h2 className="font-symbol font-bold text-lg xl:text-xl">
				{ratingStars(review.rating)}
			</h2>
			<div className="border rounded-lg border-(--highlight) lg:p-4">
				<p className="text-wrap font-sans text-xs xl:text-sm">
					{review.review}
				</p>
				<p className="text-(--highlight) text-xs mt-5">
					by {review.reviewerName}
				</p>
			</div>
			<h2 className="font-sans text-xs xl:text-sm text-(--highlight) text-right tracking-wide italic">
				{review.hype} boost{review.hype == 1 ? "" : "s"}
			</h2>
		</div>
	);
}
