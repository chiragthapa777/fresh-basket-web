"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { setCookie } from "cookies-next";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";


export default function login() {
	const {register, formState  } = useForm()
	const {errors, isDirty } = formState
	const { authContext, login } = useAuthContext();
	const handleLogin = (e:FormEvent) => {
		e.preventDefault();
		login();
	}
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
					<button
						className="btn btn-primary btn-block my-3"
						onClick={handleLogin}
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
