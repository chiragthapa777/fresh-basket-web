"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
	MdOutlineAdd,
	MdOutlineKeyboardArrowLeft,
	MdModeEditOutline,
} from "react-icons/md";
import ProductFrom from "./ProductFrom";
import Modal from "@/components/Modal";
import { getProductsApi } from "@/services/product.service";
import { ProductType } from "@/models/ProductType";
import { Toaster } from "@/utils/Toast";

export default function page() {
	const router = useRouter();
	const [isOpen, setisOpen] = useState(false);
	const [loading, setloading] = useState(false);
	const [products, setProducts] = useState<ProductType[]>([]);
	const edit = (id: number) => {
		setisOpen(true);
	};

	const getProducts = async () => {
		try {
			setloading(true);
			const data: ProductType[] = await getProductsApi({});
			setProducts(data);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setloading(false);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setisOpen(false);
				}}
			>
				<ProductFrom />
			</Modal>
			<div className="flex">
				<button
					className="btn btn-xs btn-link capitalize my-auto"
					onClick={() => {
						router.back();
					}}
				>
					<MdOutlineKeyboardArrowLeft /> Back
				</button>
				<div className="text-xs breadcrumbs ml-2">
					<ul>
						<li>
							<a>Home</a>
						</li>
						<li className="underline">
							<a>Product</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="w-full ">
				<div className="header p-2 flex justify-between items-center  ">
					<h1 className="font-semibold text-xl">Products</h1>
					<div>
						<button
							className="btn btn-primary btn-sm capitalize text-xs"
							onClick={() => {
								router.push("/admin/product/add");
							}}
						>
							<MdOutlineAdd className="text-sm" /> Add Product
						</button>
					</div>
				</div>
				<div className="content p-2">
					<div className="overflow-x-auto">
						<table className="table table-sm border drop-shadow-2xl rounded-2xl ">
							{/* head */}
							<thead className="bg-base-300/10">
								<tr>
									<th className="w-1/12">S.No</th>
									<th className="w-2/12">Name</th>
									<th className="w-4/12">Desc</th>
									<th className="w-4/12">Favorite Color</th>
									<th className="w-1/12">Action</th>
								</tr>
							</thead>
							<tbody className="bg-base-100">
								{loading ? (
									<tr>
										{" "}
										<td colSpan={5} className="text-center">
											<span className="loading loading-spinner loading-lg"></span>
										</td>
									</tr>
								) : products?.length > 0 ? (
									products.map(
										(
											product: ProductType,
											index: number
										) => (
											<tr key={product.id}>
												<th>{index + 1}</th>
												<td>{product.name}</td>
												<td>{product.description}</td>
												<td>
													{product.healthCondition}
												</td>
												<td className="flex flex-row gap-1">
													<div
														className="btn btn-success btn-xs btn-outline"
														onClick={() => edit(10)}
													>
														<MdModeEditOutline />
													</div>
												</td>
											</tr>
										)
									)
								) : (
									<tr>
										<td className="text-center" colSpan={5}>No Items Found</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
