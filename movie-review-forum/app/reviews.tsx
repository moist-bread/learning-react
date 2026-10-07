export interface  ReviewInformation {
	id: number,
	posterPath: string,
	movieName: string,
	movieYear: number,
	rating: number,
	review: string,
	reviewerName: string,
	hype: number
}

export const startingReviews : Array<ReviewInformation> = [
	{
		id: 1,
		posterPath: "lilichouchou2001.jpg",
		movieName: "All About Lily Chou-Chou",
		movieYear: 2001,
		rating: 10,
		review: "really good movie. recommend.",
		reviewerName: "person",
		hype: 0
	},

	{
		id: 2,
		posterPath: "saw2004.jpg",
		movieName: "Saw",
		movieYear: 2004,
		rating: 7,
		review: "definitely the best type of movie to see with company it was so fun",
		reviewerName: "person",
		hype: 1
	}
];