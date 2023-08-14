"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineAdd, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import OrderFrom from "../OrderFrom";

export default function page() {
	const router = useRouter();
	return (
		<div>
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
						<li className="">
							<a>Product</a>
						</li>
						<li className="underline">
							<a>Add Product</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="w-full">
				<div className=" p-2 flex justify-between items-center ">
					<h1 className="font-semibold text-xl">Add Orders</h1>
				</div>
				<div className=" p-2 flex justify-between items-center ">
					<OrderFrom></OrderFrom>
				</div>
			</div>
		</div>
	);
}
