"use client";
import { FileType } from "@/models/FileType";
import { uploadFileApi } from "@/services/uploadApi";
import { Toaster } from "@/utils/Toast";
import { File } from "buffer";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

type ProductFormInputs = {
	name: string;
	description: string;
	nutritionData: string[];
	healthCondition: string[];
	productCategory: string;
	imageFile?: FileList;
};

export default function ProductFrom() {
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
		setValue,
		control,
		getValues,
	} = useForm<ProductFormInputs>();
	const uploadFile = async (data: FileList): Promise<FileType[] | void> => {
		try {
			setUploading(true);
			if (!uploading) {
				return await uploadFileApi(data);
			}
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setUploading(false);
		}
	};

	const onSubmit = async (data: ProductFormInputs) => {
		if (data.imageFile) {
			const imageRes = await uploadFile(data.imageFile);
			if (imageRes) {
				setThumbnail(imageRes[0]?.url);
			}
			console.log(imageRes);
		}
		if (loading) return;
		setLoading(true);
	};

	const imageWatcher = watch("imageFile");

	useEffect(() => {
		const imageFileList: FileList | undefined = getValues("imageFile");
		if (imageFileList && imageFileList.length) {
			setThumbnail(URL.createObjectURL(imageFileList[0] as Blob));
		}
	}, [imageWatcher]);

	return (
		<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
			<div className="form-control w-full ">
				<label className="label">
					<span className="label-text">Name</span>
				</label>
				<input
					type="text"
					placeholder="Name"
					className={`input input-bordered w-full ${
						errors.name && "border-red-500"
					}`}
					{...register("name", {
						required: "Name is required",
						minLength: {
							value: 3,
							message: "Name must have 3 letter",
						},
					})}
				/>
				<label className="label">
					<span className="label-text-alt text-error">
						{errors?.name?.message}
					</span>
				</label>
			</div>
			<div className="form-control w-full ">
				<label className="label">
					<span className="label-text">Description</span>
				</label>
				<textarea
					placeholder="Description"
					className={`input input-bordered w-full ${
						errors.description && "border-red-500"
					}`}
					{...register("description", {
						required: "Description is required",
						maxLength: {
							value: 100,
							message: "Description can have only 100 letter",
						},
					})}
				></textarea>
				<label className="label">
					<span className="label-text-alt text-error">
						{errors?.description?.message}
					</span>
				</label>
			</div>
			<div className="mb-4">
				<label
					htmlFor="number"
					className="block text-sm font-medium text-gray-700"
				>
					Nutritions
				</label>
				<Controller
					name="nutritionData"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CreatableSelect isMulti {...field} options={[]} />
					)}
				/>

				{errors.nutritionData && (
					<p className="text-red-500 text-sm mt-1">
						Nutritions is required
					</p>
				)}
			</div>
			<div className="mb-4">
				<label
					htmlFor="number"
					className="block text-sm font-medium text-gray-700"
				>
					Health Condition
				</label>
				<Controller
					name="healthCondition"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CreatableSelect isMulti {...field} options={[]} />
					)}
				/>

				{errors.healthCondition && (
					<p className="text-red-500 text-sm mt-1">
						Health Condition is required
					</p>
				)}
			</div>
			<div className="form-control w-full ">
				<label className="label">
					<span className="label-text">Category</span>
				</label>
				<input
					type="text"
					placeholder="Name"
					className={`input input-bordered w-full ${
						errors.productCategory && "border-red-500"
					}`}
					{...register("productCategory")}
				/>
				<label className="label">
					<span className="label-text-alt text-error">
						{errors?.productCategory?.message}
					</span>
				</label>
			</div>
			<div className="form-control w-full ">
				<label className="label">
					<span className="label-text">Image</span>
				</label>
				<input
					type="file"
					placeholder="Name"
					className={`file-input file-input-bordered  w-full ${
						errors.imageFile && "border-red-500"
					}`}
					{...register("imageFile")}
				/>
				<label className="label">
					<span className="label-text-alt text-error">
						{errors?.imageFile?.message}
					</span>
				</label>
			</div>
			{thumbnail && (
				<img
					src={thumbnail}
					className="h-36 w-36 object-contain"
					alt=""
				/>
			)}

			<button className="btn btn-primary" type="submit">
				Save
			</button>
		</form>
	);
}
