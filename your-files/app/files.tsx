import { useState } from "react";
import { Frame } from "./page";

type viewType = "list" | "grid" | "large";

export default function Files() {
	return (
		<>
			<OptionsBar />
			<SettingsBar />
			<Frame>
				<Content />
			</Frame>
		</>
	);
}

function SettingsBar() {
	return (
		<div className="flex justify-between">
			<div className="flex pl-2">
				<div className="group">
					<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
						_File
					</h5>
					<div className="window hidden absolute group-hover:block">
						<p>thing 1</p>
						<p>thing 2</p>
						<p>thing 3</p>
					</div>
				</div>
				<div className="group">
					<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
						_Edit
					</h5>
				</div>
				<div className="group">
					<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
						_View
					</h5>
				</div>
				<div className="group">
					<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
						_Help
					</h5>
				</div>
			</div>
		</div>
	);
}

function OptionsBar() {
	return (
		<div className="window flex justify-between m-2 mb-1 p-1! pb-1! place-items-center">
			<div className="flex gap-2 w-7/8">
				<button className="min-w-10! min-h-0! p-0!">&lt;&lt;</button>
				<button className="min-w-10! min-h-0! p-0!">&gt;&gt;</button>
				<div className="field-border px-2! w-full truncate">/home</div>
			</div>
			<div className="group">
				<h5 className="px-1 group-hover:bg-(--accent) group-hover:text-(--foreground)">
					_Profile
				</h5>
				<div className="window hidden absolute group-hover:block">
					<p>thing 1</p>
					<p>thing 2</p>
					<p>thing 3</p>
				</div>
			</div>
		</div>
	);
}

function Content() {
	return (
		<>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>There's so much room for activities!</p>
			<p>Work area</p>
		</>
	);
}
