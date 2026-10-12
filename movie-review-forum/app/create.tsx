import { ReviewInformation } from './reviews';

// !! TO DO
// -- change dialog to work with effects
// -- create form CLOSE on submit

export default function CreateButton({ createReview } : {createReview: (info: ReviewInformation) => void}) {
	return (
		<>
			<button command="show-modal" commandfor="create-review-popup" 
				className="border rounded-lg px-4 py-1 bg-(--highlight) text-(--foreground) font-bold hover:cursor-pointer">
				CREATE REVIEW
			</button>

			<dialog id="create-review-popup" className='border rounded-lg border-(--foreground) w-2/5 min-w-md h-2/3 bg-(--background) place-self-center p-10 text-(--foreground) backdrop:bg-(--background) backdrop:opacity-50'>
				<div className="flex justify-between place-items-center mb-8">
					<h2 className="bg-(--accent) font-bold text-xl px-8 py-1">CREATE YOUR REVIEW</h2>
					<button command="close" commandfor="create-review-popup" 
						className="border rounded-lg px-3 py-1 bg-(--highlight) font-bold hover:cursor-pointer">
						X
					</button>
				</div>
				<CreateForm createReview={createReview} />
			</dialog>
		</>
	);
}

function CreateForm({ createReview } : {createReview: (info: ReviewInformation) => void}) {
	return (
		<form className='flex flex-col gap-5' 
			id="create-form" method="post"
			onSubmit={(e: React.SubmitEvent) => {

				e.preventDefault();
				const form = e.target;
				const formData = new FormData(form);
				const formJson = Object.fromEntries(formData.entries());
				createReview(
				{
					id: 0,
					posterPath: "movieposter.jpg",
					movieName: formJson.mname.toString(),
					movieYear: parseInt(formJson.myear.toString()),
					rating: parseInt(formJson.rating.toString()),
					review: formJson.review.toString(),
					reviewerName: formJson.aname.toString(),
					hype: 0
				});
				e.target.reset();
			}}>

			<div className='flex flex-row gap-5'>
				<label className='flex flex-col w-2/3'>
					MOVIE NAME:
					<input type="text" id="mname" name="mname" className='bg-(--background) border placeholder:text-gray-500 px-2 py-1' placeholder='eg. Incredibles' required/>
				</label>
				<label className='flex flex-col w-1/3'>
					MOVIE YEAR:
					<input type="number" min="1000" max="9999" id="myear" name="myear" className='bg-(--background) border placeholder:text-gray-500 px-2 py-1' placeholder='eg. 2011' required/>
				</label>
			</div>
			
			<div className='flex flex-row gap-5'>
				<label className='flex flex-col w-2/3'>
					YOUR DISPLAYNAME:
					<input type="text" id="aname" name="aname" className='bg-(--background) border placeholder:text-gray-500 px-2 py-1' placeholder='eg. anonymous' required/>
				</label>
				<label className='flex flex-col w-1/3'>
					RATING:
					<select defaultValue="" id="rating" name="rating" className='bg-(--background) border px-2 py-1' required>
						<option value="">Select…</option>
						<option value="10">(10) Masterpiece</option>
						<option value="9">(9) Amazing</option>
						<option value="8">(8) Very Good</option>
						<option value="7">(7) Good</option>
						<option value="6">(6) Fine</option>
						<option value="5">(5) Mid</option>
						<option value="4">(4) Bad</option>
						<option value="3">(3) Very Bad</option>
						<option value="2">(2) Horrible</option>
						<option value="1">(1) Appalling</option>
						<option value="0">(0) Unwatch</option>
					</select>
				</label>
			</div>
			<label className='flex flex-col'>
				YOUR REVIEW:
				<textarea id="review" name="review" className='bg-(--background) border placeholder:font-mono placeholder:text-gray-500 px-2 py-1 min-h-24 font-sans' placeholder='Write your review here...' required/>
			</label>
			<div>
				<button className="border rounded-lg px-4 py-1 bg-(--highlight) font-bold mt-5 hover:cursor-pointer" 
					type="submit">
					SUBMIT</button>
			</div>
		</form>
	);
}
