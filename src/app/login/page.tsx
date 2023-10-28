"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";
import { useState } from "react";
import { Toaster } from "@/utils/Toast";
import { AxiosResponse } from "axios";
import Axios from "@/utils/Axios";
import { baseUrl } from "@/constant";

type LoginFormInputs = {
	email: string;
	password: string;
	name?: string;
	rePassword?: string;
};

export default function login() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
		setValue,
	} = useForm<LoginFormInputs>();
	const pwWatcher: string = watch("password");
	const { authContext, login } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [tab, setTab] = useState("login");
	const onSubmit = (data: LoginFormInputs) => {
		if (loading) return;
		setLoading(true);
		if (tab === "login") {
			handleLogin(data);
		} else {
			handleRegister(data);
		}
	};
	const handleLogin = async (data: LoginFormInputs) => {
		try {
			const response: AxiosResponse = await Axios.post("/login", {
				email: data.email,
				password: data.password,
			});
			console.log(
				"🚀 ~ file: page.tsx:49 ~ handleLogin ~ response:",
				response
			);

			if (!response?.data?.token) {
				throw "Some error occured";
			}
			Toaster("Login successful", "success");
			login(response.data.token);
		} catch (error: any) {
			console.log(error);
			Toaster(error, "error");
		} finally {
			setLoading(false);
		}
	};
	const handleRegister = async (data: LoginFormInputs) => {
		try {
			const response: AxiosResponse = await Axios.post("/register", {
				email: data.email,
				password: data.password,
				name: data.name,
			});
			Toaster("Register successful", "success");
			reset();
			setTab("login");
			setValue("email", data.email);
		} catch (error: any) {
			Toaster(error, "error");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="mb-40">
				<h1 className="bold font-bold text-3xl text-primary text-center mb-8">
					Fresh Basket
				</h1>
				<form
					className="my-5 w-80 sm:w-96 "
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="w-full rounded-md flex border bg-base-100 p-1 mb-4">
						<div
							className={`w-1/2 p-2 flex justify-center items-center rounded-md ${
								tab === "login" &&
								`bg-primary/30  text-primary font-bold `
							}`}
							onClick={() => setTab("login")}
						>
							<FiUserCheck className="mr-2" /> Login
						</div>
						<div
							className={`w-1/2 p-2 flex justify-center items-center rounded-md ${
								tab === "register" &&
								`bg-primary/30  text-primary font-bold `
							}`}
							onClick={() => setTab("register")}
						>
							<FiUserPlus className="mr-2" /> Register
						</div>
					</div>
					<div className="wrapper bg-base-100 border p-4 rounded-md">
						{tab === "register" && (
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">
										Full Name
									</span>
								</label>
								<input
									type="text"
									placeholder="Full Name"
									className={`input input-bordered w-full ${
										errors.name && "border-red-500"
									}`}
									{...register("name", {
										required: "Name is required",
									})}
								/>
								<label className="label">
									<span className="label-text-alt text-error">
										{errors?.name?.message}
									</span>
								</label>
							</div>
						)}

						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="text"
								placeholder="Email"
								className={`input input-bordered w-full ${
									errors.email && "border-red-500"
								}`}
								{...register("email", {
									required: "Email is required",
									pattern: {
										// Regular expression for a simple email validation
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
							/>
							<label className="label">
								<span className="label-text-alt text-error">
									{errors?.email?.message}
								</span>
							</label>
						</div>
						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="Password"
								className={`input input-bordered w-full ${
									errors.password && "border-red-500"
								}`}
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 5,
										message: "Password must have 5 letter",
									},
								})}
							/>
							<label className="label">
								<span className="label-text-alt text-error">
									{errors?.password?.message}
								</span>
							</label>
						</div>
						{tab === "register" && (
							<div className="form-control w-full ">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder="Password"
									className={`input input-bordered w-full ${
										errors.rePassword && "border-red-500"
									}`}
									{...register("rePassword", {
										validate: (value) => {
											if (value !== pwWatcher) {
												return "Password doesnot match";
											}
											return true;
										},
									})}
								/>
								<label className="label">
									<span className="label-text-alt text-error">
										{errors?.rePassword?.message}
									</span>
								</label>
							</div>
						)}
					</div>
					<button
						className={`btn btn-primary btn-block my-3 uppercase`}
					>
						{loading && (
							<span className="loading loading-spinner"></span>
						)}
						{tab}
					</button>
				</form>
			</div>
		</div>
	);
}
