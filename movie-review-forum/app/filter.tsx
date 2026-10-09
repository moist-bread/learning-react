export interface FilteringOptions {
	filteringMovieYear: FilteringMovieYear,
	filteringRating: FilteringRating,
	filteringHype: FilteringHype
}

interface FilteringMovieYear {
	twentytwenty : boolean,
	twentyten : boolean,
	twenty : boolean,
	nineties : boolean,
	eighties : boolean,
	seventies : boolean,
	older : boolean
}

export interface FilteringRating {
	zero : boolean,
	one : boolean,
	two : boolean,
	three : boolean,
	four : boolean,
	five : boolean,
	six : boolean,
	seven : boolean,
	eight : boolean,
	nine : boolean,
	ten : boolean
}

interface FilteringHype {
	hundredplus : boolean,
	lessfifty : boolean,
	lessthirty : boolean,
	lessten : boolean
}

export const startingFilters : FilteringOptions = {

	filteringMovieYear: {
		twentytwenty : true,
		twentyten : true,
		twenty : true,
		nineties : true,
		eighties : true,
		seventies : true,
		older : true
	},

	filteringRating: {
		zero : true,
		one : true,
		two : true,
		three : true,
		four : false,
		five : true,
		six : true,
		seven : true,
		eight : false,
		nine : true,
		ten : true
	},

	filteringHype: {
		hundredplus : true,
		lessfifty : true,
		lessthirty : true,
		lessten : true
	}
};
