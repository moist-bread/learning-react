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
		posterPath: "saw2004.jpg",
		movieName: "Saw",
		movieYear: 2004,
		rating: 7,
		review: "Definitely the best type of movie to watch with company it was so fun",
		reviewerName: "person",
		hype: 51
	},

	{
		id: 2,
		posterPath: "lilichouchou2001.jpg",
		movieName: "All About Lily Chou-Chou",
		movieYear: 2001,
		rating: 10,
		review: "music as a comforting place. i see you. you see me.",
		reviewerName: "person",
		hype: 0
	},
	
	{
		id: 3,
		posterPath: "labyrinth1986.jpg",
		movieName: "Labyrinth",
		movieYear: 1986,
		rating: 7,
		review: "A magical movie",
		reviewerName: "person",
		hype: 0
	},
	
	{
		id: 4,
		posterPath: "soundofmetal2019.jpg",
		movieName: "Sound of Metal",
		movieYear: 2019,
		rating: 8,
		review: "There's a moment about 10 minutes into this film when Ruben (Riz Ahmed) is at a hearing specialist's office. \
		The specialist is explaining to him that the majority of his hearing is gone, and all his efforts at the moment should be dedicated to preserving what's left.\
		The film smash cuts to Ruben performing at another metal concert that very night, seemingly disregarding the specialist's advice.\
		It's a stunning depiction of that innate human desire to maintain normality, to act like nothing's wrong, to carry on as though everything's fine.",
		reviewerName: "person",
		hype: 15
	},

	{
		id: 5,
		posterPath: "catchmeifyoucan2002.jpg",
		movieName: "Catch Me If You Can",
		movieYear: 2002,
		rating: 7,
		review: "I like the part where they try to catch him.",
		reviewerName: "person",
		hype: 34
	}
];