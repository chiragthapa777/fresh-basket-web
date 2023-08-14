"use client"
import React from 'react'

export default function PageLoader() {
  return (
		<div className="w-screen h-screen flex justify-center items-center">
			<span className="loading loading-bars text-primary loading-md"></span>
		</div>
  );
}
