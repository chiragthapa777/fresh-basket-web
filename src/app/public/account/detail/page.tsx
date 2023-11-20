"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { DevTool } from "@hookform/devtools";

const animatedComponents = makeAnimated();

interface IDetailForm {
	name: string;
	email: string;
	contact?: string;
	district: string;
	address: string;
	street: string;
	ward?: number;
	preferences?: { value: string; label: string }[];
	diseases?: { value: string; label: string }[];
}

export default function page() {
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields, touchedFields },
		control,
		setValue,
	} = useForm<IDetailForm>({
		defaultValues: {
			name: "",
			email: "",
			contact: "",
			district: "",
			address: "",
			street: "",
			ward: 0,
			preferences: [],
			diseases: [],
		},
		mode: "all",
	});
	const [selectedOptions, setSelectedOptions] = useState([]);

	const onSubmit = (data: any) => {
		console.log(data, selectedOptions); // Replace with your form submission logic
	};

	const handleSelectChange = (selectedOptions: any): void => {
		// Extract the values from the selected options
		const selectedValues = selectedOptions.map(
			(option: any) => option.value
		);

		// Update the form field value using react-hook-form's setValue
		setValue("preferences", selectedValues);
	};

	return (
		<div className="p-4">
			<DevTool control={control} />
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* User Details */}
				<h2 className="text-lg font-semibold border-b mb-1">
					User Details
				</h2>
				<div className="">
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							{...register("name", { required: true })}
							id="name"
							type="text"
							className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
								errors.name
									? "border-red-500"
									: "border-gray-300"
							}`}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm mt-1">
								{errors.name.message}
							</p>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							{...register("email", { required: true })}
							id="email"
							type="email"
							className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
								errors.email
									? "border-red-500"
									: "border-gray-300"
							}`}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="number"
							className="block text-sm font-medium text-gray-700"
						>
							Phone Number
						</label>
						<input
							{...register("contact", { required: true })}
							id="number"
							type="tel"
							className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
								errors.contact
									? "border-red-500"
									: "border-gray-300"
							}`}
						/>
						{errors.contact && (
							<p className="text-red-500 text-sm mt-1">
								{errors.contact.message}
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
							{...register("district", { required: true })}
							id="district"
							className={`mt-1 p-2 block w-full border rounded-md bg-base-100 ${
								errors.district
									? "border-red-500"
									: "border-gray-300"
							}`}
						>
							<option value="">Select District</option>
							<option value="district1">District 1</option>
							<option value="district2">District 2</option>
							{/* Add more district options */}
						</select>
						{errors.district && (
							<p className="text-red-500 text-sm mt-1">
								{errors.district.message}
							</p>
						)}
					</div>
				</div>
				{/* Add other address fields (province, ward, area, street) similarly */}

				{/* Preference */}
				<h2 className="text-2xl font-semibold mt-4 border-b mb-1">
					Preference
				</h2>
				<div className="mb-4">
					<label
						htmlFor="number"
						className="block text-sm font-medium text-gray-700"
					>
						Preferences
					</label>
					<Controller
						name="preferences"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Select
								closeMenuOnSelect={false}
								components={animatedComponents}
								// defaultValue={[colourOptions[4], colourOptions[5]]}
								// {...register("pre", { required: true })}
								// value={selectedOptions} // Set the selected values
								// onChange={handleSelectChange} // Handle value changes/ Handle value changes
								{...field}
								// onChange={handleSelectChange}
								isMulti // Enable multi-select
								options={[
									{ value: "disease1", label: "Disease 1" },
									{ value: "disease2", label: "Disease 2" },
									{ value: "disease3", label: "Disease 3" },
									{ value: "disease4", label: "Disease 4" },
								]}
								// getOptionValue={(option) => option.value}
								// getOptionLabel={(option) => option.label}
							/>
						)}
					/>

					{errors.preferences && (
						<p className="text-red-500 text-sm mt-1">
							Preferences is required
						</p>
					)}
				</div>
				{/* <div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Diseases
					</label>
					<Controller
						control={control}
						as={<Select />}
						options={[
							{ value: "disease1", label: "Disease 1" },
							{ value: "disease2", label: "Disease 2" },
							{ value: "disease3", label: "Disease 3" },
							{ value: "disease4", label: "Disease 4" },
							{ value: "disease5", label: "Disease 5" },
							{ value: "disease6", label: "Disease 6" },
							{ value: "disease7", label: "Disease 7" },
							{ value: "disease8", label: "Disease 8" },
							{ value: "disease9", label: "Disease 9" },
							// Add more disease options
						]}
						isMulti
						name="diseases"
					/>
					<Controller
						name="country"
						control={control}
						render={({ onChange, value, ref }) => (
							<Select
								options={[
									{ value: "disease1", label: "Disease 1" },
									{ value: "disease2", label: "Disease 2" },
									{ value: "disease3", label: "Disease 3" },
									{ value: "disease4", label: "Disease 4" },
									{ value: "disease5", label: "Disease 5" },
									{ value: "disease6", label: "Disease 6" },
									{ value: "disease7", label: "Disease 7" },
									{ value: "disease8", label: "Disease 8" },
									{ value: "disease9", label: "Disease 9" },
								]}
								options={country}
								value={country.find((c) => c.value === value)}
								onChange={(val) => onChange(val.value)}
								isMulti
								name="diseases"
							/>
						)}
						rules={{ required: true }}
					/>
					{errors.diseases && (
						<p className="text-red-500 text-sm mt-1">
							Can select upto 5 disease only
						</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Vegetable Preference
					</label>
					<Select
						{...register("vegetablePreference")}
						options={[
							{ value: "vegetable1", label: "Vegetable 1" },
							{ value: "vegetable2", label: "Vegetable 2" },
							// Add more vegetable options
						]}
						isMulti
						name="vegetablePreference"
					/>
					{errors.vegetablePreference && (
						<p className="text-red-500 text-sm mt-1">
							Select between 1 and 5 preference
						</p>
					)}
				</div> */}
				<div className="mt-4">
					<button
						type="submit"
						className="bg-primary text-white px-4 py-2 rounded-md"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
