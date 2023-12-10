"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function Breadcrump({ current }: { current: string }) {
	const router = useRouter();
	return (
		<div className="flex">
			<button
				className="btn btn-xs btn-link capitalize my-auto"
				onClick={() => {
					router.back();
				}}
			>
				<MdOutlineKeyboardArrowLeft /> Back
			</button>
			<div className="text-xs breadcrumbs ml-2">
				<ul>
					<li>
						<a>Home</a>
					</li>
					<li className="underline">
						<a className="capitalize">{current}</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
