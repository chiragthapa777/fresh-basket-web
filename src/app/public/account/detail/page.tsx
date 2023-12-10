"use client";

import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { DevTool } from "@hookform/devtools";
import { UserDetailModel, UserModel } from "@/models/User.model";
import * as z from "zod";
import { NepalDistrict, healthConditionArr, preferences } from "@/data";
import { Toaster } from "@/utils/Toast";
import { addDetail } from "@/services/user.api";
import { useRouter } from "next/navigation";
import OverLayLoader from "@/components/OverLayLoader";
import { useAuthContext } from "@/contexts/AuthContext";

const animatedComponents = makeAnimated();

type FormType = Omit<
	UserDetailModel,
	"createdAt" | "updatedAt" | "preference" | "healthCondition"
> & { preference: any[]; healthCondition: any[] };

const formSchema = z.object({
	height: z.coerce
		.number({
			invalid_type_error: "Height should be number feet",
		})
		.gte(1)
		.lte(10),
	weight: z.coerce
		.number({
			invalid_type_error: "Height should be number feet",
		})
		.gte(20)
		.lte(200),
	dateOfBirth: z.string(),
	address: z.object({
		address: z.string(),
		street: z.string(),
		district: z.string(),
		ward: z.string(),
	}),
	preference: z.array(z.any()).nonempty(),
	healthCondition: z.array(z.any()).nonempty(),
});
export default function page() {
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState<UserModel | null>();
	const { loadUser } = useAuthContext();
	const router = useRouter();
	const [isFormReadOnly, setFormReadOnly] = useState(false);
	useEffect(() => {
		setProfile(JSON.parse(localStorage.getItem("profile") || "{}"));
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields, touchedFields },
		control,
		setValue,
	} = useForm<FormType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			height: profile?.userDetail?.height || "",
			weight: profile?.userDetail?.weight || "",
			dateOfBirth: profile?.userDetail?.dateOfBirth || "",
			address: {
				address: profile?.userDetail?.address?.address || "",
				district: profile?.userDetail?.address?.district || "",
				street: profile?.userDetail?.address?.street || "",
				ward: profile?.userDetail?.address?.ward || undefined,
			},
			preference:
				profile?.userDetail?.preference?.map((d) => {
					return { value: d, label: d };
				}) || [],
			healthCondition:
				profile?.userDetail?.healthCondition?.map((d) => {
					return { value: d, label: d };
				}) || [],
		},
		mode: "all",
	});
	useEffect(() => {
		// Set values in the form again when profile changes
		if (profile?.userDetail?.id) {
			setValue("height", profile?.userDetail?.height || "");
			setValue("weight", profile?.userDetail?.weight || "");
			setValue("dateOfBirth", profile?.userDetail?.dateOfBirth || "");
			setValue(
				"address.address",
				profile?.userDetail?.address?.address || ""
			);
			setValue(
				"address.district",
				profile?.userDetail?.address?.district || ""
			);
			setValue(
				"address.street",
				profile?.userDetail?.address?.street || ""
			);
			setValue(
				"address.ward",
				profile?.userDetail?.address?.ward || undefined
			);
			setValue(
				"preference",
				profile?.userDetail?.preference?.map((d) => {
					return { value: d, label: d };
				}) || []
			);
			setValue(
				"healthCondition",
				profile?.userDetail?.healthCondition?.map((d) => {
					return { value: d, label: d };
				}) || []
			);

			// Set the form to read-only
			setFormReadOnly(true);
		}
	}, [profile?.id]);
	const { ref: dateInputRef } = register("dateOfBirth");
	const [selectedOptions, setSelectedOptions] = useState([]);

	const onSubmit = async (data: any) => {
		try {
			setLoading(true);
			await addDetail({
				...data,
				preference: data.preference.map((n: any) => n?.value),
				healthCondition: data.healthCondition.map((n: any) => n?.value),
			});
			await loadUser();
			router.back();
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setLoading(false);
		}
		console.log(data, selectedOptions); // Replace with your form submission logic
	};

	const handleSelectChange = (selectedOptions: any): void => {
		// Extract the values from the selected options
		const selectedValues = selectedOptions.map(
			(option: any) => option.value
		);

		// Update the form field value using react-hook-form's setValue
		setValue("preference", selectedValues);
	};

	return (
		<div className="p-4">
			<DevTool control={control} />
			{isFormReadOnly && (
				<div role="alert" className="alert alert-success">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Your user detail is completed</span>
				</div>
			)}
			<OverLayLoader loading={loading}>
				<form className="mb-28" onSubmit={handleSubmit(onSubmit)}>
					{/* User Details */}
					<h2 className="text-2xl font-semibold mt-4 border-b mb-1">
						User Details
					</h2>
					<div className="">
						<div className="mb-4">
							<label
								htmlFor="height"
								className="block text-sm font-medium text-gray-700"
							>
								Height (feet)
							</label>
							<input
								{...register("height", { required: true })}
								id="name"
								type="text"
								readOnly={isFormReadOnly}
								className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
									errors.height
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{errors.height && (
								<p className="text-red-500 text-sm mt-1">
									{errors.height.message}
								</p>
							)}
						</div>
						<div className="mb-4">
							<label
								htmlFor="weight"
								className="block text-sm font-medium text-gray-700"
							>
								weight (kg)
							</label>
							<input
								{...register("weight", { required: true })}
								id="email"
								type="text"
								readOnly={isFormReadOnly}
								className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
									errors.weight
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{errors.weight && (
								<p className="text-red-500 text-sm mt-1">
									{errors.weight.message}
								</p>
							)}
						</div>
						<div className="mb-4">
							<label
								htmlFor="dateOfBirth"
								className="block text-sm font-medium text-gray-700"
							>
								dateOfBirth
							</label>
							<input
								id="number"
								type="date"
								readOnly={isFormReadOnly}
								{...register("dateOfBirth")}
								ref={dateInputRef}
								className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
									errors.dateOfBirth
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{errors.dateOfBirth && (
								<p className="text-red-500 text-sm mt-1">
									{errors.dateOfBirth.message}
								</p>
							)}
						</div>
					</div>
					{/* Address */}
					<h2 className="text-2xl font-semibold mt-4 border-b mb-1">
						Address
					</h2>
					<div>
						<div className="mb-4">
							<label
								htmlFor="district"
								className="block text-sm font-medium text-gray-700"
							>
								District
							</label>
							<select
								{...register("address.district", {
									required: true,
								})}
								id="district"
								className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
									errors?.address?.district
										? "border-red-500"
										: "border-gray-300"
								}`}
								disabled={isFormReadOnly}
							>
								{NepalDistrict.map((name) => (
									<option key={name} value={name}>
										{name}
									</option>
								))}
							</select>
							{errors?.address?.district && (
								<p className="text-red-500 text-sm mt-1">
									{errors?.address?.district?.message}
								</p>
							)}
						</div>
						<div className="mb-4">
							<label
								htmlFor="height"
								className="block text-sm font-medium text-gray-700"
							>
								Ward
							</label>
							<input
								{...register("address.ward", {
									required: true,
								})}
								readOnly={isFormReadOnly}
								id="name"
								type="text"
								className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
									errors?.address?.address
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{errors?.address?.ward && (
								<p className="text-red-500 text-sm mt-1">
									{errors.address.ward?.message}
								</p>
							)}
						</div>
						<div className="mb-4">
							<label
								htmlFor="height"
								className="block text-sm font-medium text-gray-700"
							>
								Address
							</label>
							<input
								{...register("address.address", {
									required: true,
								})}
								readOnly={isFormReadOnly}
								id="name"
								type="text"
								className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
									errors?.address?.address
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{errors?.address?.address && (
								<p className="text-red-500 text-sm mt-1">
									{errors.address.address?.message}
								</p>
							)}
						</div>
						<div className="mb-4">
							<label
								htmlFor="height"
								className="block text-sm font-medium text-gray-700"
							>
								Street
							</label>
							<input
								{...register("address.street", {
									required: true,
								})}
								readOnly={isFormReadOnly}
								id="name"
								type="text"
								className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
									errors?.address?.street
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{errors?.address?.street && (
								<p className="text-red-500 text-sm mt-1">
									{errors.address.street?.message}
								</p>
							)}
						</div>
					</div>
					{/* Add other address fields (province, ward, area, street) similarly */}

					{/* Preference */}
					<h2 className="text-2xl font-semibold mt-4 border-b mb-1">
						Metrics of order
					</h2>
					<div className="mb-4">
						<label
							htmlFor="number"
							className="block text-sm font-medium text-gray-700"
						>
							Preferences
						</label>
						<Controller
							name="preference"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Select
									closeMenuOnSelect={false}
									components={animatedComponents}
									{...field}
									isDisabled={isFormReadOnly}
									isMulti // Enable multi-select
									options={preferences.map((n) => {
										return { value: n, label: n };
									})}
								/>
							)}
						/>

						{/* {errors.preference && (
						<p className="text-red-500 text-sm mt-1">
							Preferences is required {errors.preference.message}
						</p>
					)} */}
					</div>
					<div className="mb-4">
						<label
							htmlFor="number"
							className="block text-sm font-medium text-gray-700"
						>
							Health Conditons
						</label>
						<Controller
							name="healthCondition"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Select
									closeMenuOnSelect={false}
									components={animatedComponents}
									{...field}
									isDisabled={isFormReadOnly}
									isMulti // Enable multi-select
									options={healthConditionArr.map((n) => {
										return { value: n, label: n };
									})}
								/>
							)}
						/>

						{/* {errors.healthCondition && (
						<p className="text-red-500 text-sm mt-1">
							Health Condition is required
						</p>
					)} */}
					</div>
					<div className="mt-4">
						<button
							type="submit"
							className="bg-primary text-white px-4 py-2 rounded-md btn-block"
							disabled={isFormReadOnly}
						>
							Submit
						</button>
					</div>
				</form>
			</OverLayLoader>
		</div>
	);
}
