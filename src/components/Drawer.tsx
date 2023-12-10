"use client";
import React from "react";

export default function Drawer({ children, isOpen, setIsOpen }: any) {
	return (
		<div className={`fixed inset-0 z-30  ${isOpen ? "" : "hidden"}`}>
			{/* Overlay */}
			<div
				className={`absolute inset-0 bg-black opacity-50 transition-opacity ${
					isOpen ? "opacity-50" : "opacity-0"
				}`}
				onClick={() => setIsOpen(false)}
			></div>
			{/* Drawer */}
			<div
				className={`fixed inset-y-0 left-0 min-w-64 bg-base-100 shadow-lg transition-transform duration-1000  ${
					isOpen
						? "transform translate-x-0"
						: "transform -translate-x-full"
				}`}
			>
				<div className="mt-[64px]">{children}</div>
			</div>
		</div>
	);
}
