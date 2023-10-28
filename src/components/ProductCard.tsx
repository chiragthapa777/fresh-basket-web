'use client'
import React from 'react'
import { MdOutlineAddShoppingCart } from 'react-icons/md';

type Props = {}

export default function ProductCard({}: Props) {
  return (
		<div className="bg-base-100 shadow-sm rounded-md w-full">
			<img
				src="https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg"
				alt=""
				className="w-full h-28 object-cover rounded-t-md"
			/>
			<div className="flex justify-between items-center p-2">
				<div>
					<p className="text-base-content text-xs">
						Product Item Name
					</p>
					<p className="text-base-content text-sm font-bold">
						Rs. 3000.567{" "}
					</p>
				</div>
				<MdOutlineAddShoppingCart className="text-base-content text-lg" />
			</div>
		</div>
  );
}