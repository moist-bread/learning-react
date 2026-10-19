"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  return (
    <>
			<NavBar />
    
    </>
  );
}


function NavBar() {
	return (
		<div className="bg-(--accent) p-2 sticky top-0 text-center">
			<h1 className="font-bold text-xl">YOUR FILES</h1>
			<h2 className="font-sans text-sm">RIGHT WHERE THEY'RE SUPPOSE TO BE</h2>
		</div>
	);
}