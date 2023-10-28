"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProvider = ({ children }:any) => {
	return (
		<>
			{children}
			<ProgressBar
				height="4px"
				color="#2ba69a"
				options={{ showSpinner: false }}
				shallowRouting
			/>
		</>
	);
};

export default ProgressProvider;
