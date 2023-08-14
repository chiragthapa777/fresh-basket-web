"use client";
import React from "react";

export default function login() {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="bg-base-100 p-8 border rounded-2xl">
				<h1 className="bold font-bold text-3xl text-primary my-3">
					Login
				</h1>
				<p>
					<span className="text-base-content/50">Welcome to</span>{" "}
					<a href="" className="text-primary hover:underline">
						Fresh Basket
					</a>
				</p>
				<form className="my-5 w-80">
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Username</span>
						</label>
						<input
							type="text"
							placeholder="Username"
							className="input input-bordered w-full"
						/>
						<label className="label">
							<span className="label-text-alt text-error"></span>
						</label>
					</div>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="Password"
							className="input input-bordered w-full "
						/>
						<label className="label">
							<span className="label-text-alt text-error"></span>
						</label>
					</div>
					<button className="btn btn-primary btn-block my-3">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
