"use client";
import { orderData } from "@/data";
import withAuth from "@/hoc/withAuth";
import { Toaster } from "@/utils/Toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
	MdOutlineAdd,
	MdOutlineKeyboardArrowLeft,
	MdModeEditOutline,
} from "react-icons/md";
import OrderTableRow from "./OrderTableRow";

function page() {
	const router = useRouter();
	const [isOpen, setisOpen] = useState(false);
	const [loading, setloading] = useState(false);
	const [orders, setOrders] = useState<any[]>([]);

	const getOrders = async () => {
		try {
			setOrders(orderData);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setloading(false);
		}
	};

	useEffect(() => {}, []);

	return (
		<div>
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
							<a>Order</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="w-full ">
				<div className="header p-2 flex justify-between items-center  ">
					<h1 className="font-semibold text-xl">Orders</h1>
					<div>
						<button
							className="btn btn-primary btn-sm capitalize text-xs"
							onClick={() => {
								router.push("/admin/order/add");
							}}
						>
							<MdOutlineAdd className="text-sm" /> Add Order
						</button>
					</div>
				</div>
				<div className="content p-2">
					<div className="overflow-x-auto">
						<table className="table table-sm border drop-shadow-2xl rounded-2xl ">
							{/* head */}
							<thead className="bg-base-300/50">
								<tr>
									<th className="w-1/12">S.No</th>
									<th className="w-1.5/12">Order Number</th>
									<th className="w-1.5/12">Customer Name</th>
									<th className="w-2/12">Order Time</th>
									<th className="w-2/12">Subscription</th>
									<th className="w-1.5/12">Status</th>
									<th className="w-2/12">Total</th>
									<th className="w-0.5/12">Detail</th>
								</tr>
							</thead>
							<tbody className="bg-base-100">
								<OrderTableRow />
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withAuth(page, { role: "admin" });
