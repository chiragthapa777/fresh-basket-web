"use client";
import React, { useEffect } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		console.log("from login", Date());

		return () => {};
	}, []);

	return <div className={`bg-base-200`}>{children}</div>
}
