import React, { ReactNode } from "react";

export default function OverLayLoader({
	children,
	loading,
}: {
	children: ReactNode;
	loading: boolean;
}) {
	return (
		<div className="w-full relative">
			{loading && (
				<div className="absolute w-full h-full opacity-50 bg-base-300 flex justify-center items-center bottom-0 left-0 z-40 ">
					<span className="loading loading-spinner loading-md "></span>
				</div>
			)}
			{children}
		</div>
	);
}
