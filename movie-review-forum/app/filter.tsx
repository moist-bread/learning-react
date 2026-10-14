export interface FilteringOptions {
	filteringRating: FilteringRating;
	filteringHype: FilteringHype;
	filteringMovieYear: FilteringMovieYear;
}

export interface FilteringRating {
	zero: boolean;
	one: boolean;
	two: boolean;
	three: boolean;
	four: boolean;
	five: boolean;
	six: boolean;
	seven: boolean;
	eight: boolean;
	nine: boolean;
	ten: boolean;
}

export interface FilteringHype {
	lessfithteen: boolean;
	lessthirty: boolean;
	lessfortyfive: boolean;
	lesssixty: boolean;
	plussixty: boolean;
}

export interface FilteringMovieYear {
	twentytwenty: boolean;
	twentyten: boolean;
	twenty: boolean;
	nineties: boolean;
	eighties: boolean;
	older: boolean;
}

export const startingFilters: FilteringOptions = {
	filteringRating: {
		zero: true,
		one: true,
		two: true,
		three: true,
		four: true,
		five: true,
		six: true,
		seven: true,
		eight: true,
		nine: true,
		ten: true,
	},

	filteringHype: {
		lessfithteen: true,
		lessthirty: true,
		lessfortyfive: true,
		lesssixty: true,
		plussixty: true,
	},

	filteringMovieYear: {
		twentytwenty: true,
		twentyten: true,
		twenty: true,
		nineties: true,
		eighties: true,
		older: true,
	},
};
