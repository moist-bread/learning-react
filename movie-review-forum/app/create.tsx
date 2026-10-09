import { ReviewInformation } from './reviews';

export default function CreateButton({ createReview } : {createReview: (info: ReviewInformation) => void}) {
	return (
		<>
			<button command="show-modal" commandfor="create-review-popup" 
				className="border rounded-lg px-4 py-1 text-center bg-(--highlight) text-(--foreground) font-bold hover:cursor-pointer">
				CREATE YOUR REVIEW
			</button>

			<dialog id="create-review-popup" className='border rounded-lg border-(--foreground) w-2/3 h-2/3 bg-(--accent) place-self-center p-10 text-(--foreground) backdrop:bg-(--background) backdrop:opacity-50'>
				<div>
					<div className="flex justify-between place-items-center font-mono mb-8">
						<h2 className="bg-(--highlight) font-bold text-xl px-4 py-1">CREATE YOUR REVIEW</h2>
						<button command="close" commandfor="create-review-popup" 
							className="border rounded-lg px-4 py-1 text-center bg-(--highlight) font-bold hover:cursor-pointer">
							CLOSE
						</button>
					</div>
					<CreateForm createReview={createReview} />
				</div>
			</dialog>
		</>
	);
}

function CreateForm({ createReview } : {createReview: (info: ReviewInformation) => void}) {
	return (
		<form className='flex flex-col gap-5' method="post"
			onSubmit={(e: React.SubmitEvent) => {

				e.preventDefault();
				const form = e.target;
				const formData = new FormData(form);
				const formJson = Object.fromEntries(formData.entries());
				console.log(formJson);

				createReview(
				{
					id: 0,
					posterPath: "lilichouchou2001.jpg",
					movieName: formJson.mname.toString(),
					movieYear: parseInt(formJson.myear.toString()),
					rating: parseInt(formJson.rating.toString()),
					review: formJson.review.toString(),
					reviewerName: formJson.aname.toString(),
					hype: 0
				});
			}}>
			<label>Rating:
				<select id="rating" name="rating" className='bg-(--background)' required>
					<option>Select…</option>
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
			<label>
				Movie Name: <input type="text" id="mname" name="mname" className='bg-(--background)' required/>
			</label>
			<label>
				Movie Year: <input type="number" id="myear" name="myear" className='bg-(--background)' required/>
			</label>
			<label>
				Your Name: <input type="text" id="aname" name="aname" className='bg-(--background)' required/>
			</label>
			<label>
				Your Review: <input type="text" id="review" name="review" className='bg-(--background)' required/>
			</label>
			<div>
				<button className="border rounded-lg px-4 py-1 text-center bg-(--highlight) font-bold mt-8 hover:cursor-pointer" 
					type="submit">Submit</button>
			</div>
		</form>
	);
}
