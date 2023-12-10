"use client";
import { orderData } from "@/data";
import withAuth from "@/hoc/withAuth";
import { Toaster } from "@/utils/Toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
	MdOutlineAdd,
	MdOutlineKeyboardArrowLeft,
	MdModeEditOutline,
} from "react-icons/md";
import OrderTableRow from "./OrderTableRow";
import { getAllOrders, updateOrderStatus } from "@/services/orderApiService";
import { OrderType } from "@/models/OrderType";
import Modal from "@/components/Modal";
import { OrderStausEnum, orderStatusArrObj } from "@/enums/orderStatusEnum";
import OverLayLoader from "@/components/OverLayLoader";

function page() {
	const router = useRouter();
	const [isOpen, setisOpen] = useState(false);
	const [form, setForm] = useState<{
		status: OrderStausEnum;
		orderId?: number;
	}>({
		status: OrderStausEnum.CONFIRMED,
		orderId: undefined,
	});
	const [loading, setloading] = useState(false);
	const [orders, setOrders] = useState<OrderType[]>([]);
	const [order, setOrder] = useState<OrderType | null>();

	const getOrders = async () => {
		try {
			setloading(true);
			const data = await getAllOrders();
			setOrders(data);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setloading(false);
		}
	};

	const updateStatus = async () => {
		try {
			setloading(true);
			const data = await updateOrderStatus(form);
			setOrders(
				orders.map((o) => {
					if (o?.id && o?.id === order?.id) {
						o.status = form.status;
					}
					return o;
				})
			);
			setForm({ ...form, orderId: undefined });
			setOrder(null);
			Toaster("Order Status updated successfully", "success");
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setloading(false);
		}
	};
	useEffect(() => {
		getOrders();
	}, []);
	useEffect(() => {
		if (order?.id) {
			setForm({ ...form, orderId: order?.id });
		}
	}, [order?.id]);

	const disableButton = useMemo(
		() => order?.status === form.status,
		[order?.id, form?.status]
	);

	return (
		<div>
			<Modal
				isOpen={!!order}
				title="Update Order Status"
				onClose={() => setOrder(null)}
			>
				<OverLayLoader loading={loading}>
					<div className="w-full flex flex-col p-6 justify-center items-center gap-3">
						<label className="form-control w-full ">
							<div className="label">
								<span className="label-text">
									Pick the best fantasy franchise
								</span>
							</div>
							<select
								className="select select-bordered"
								value={form.status}
								onChange={(e) =>
									setForm({ ...form, status: e.target.value })
								}
							>
								{orderStatusArrObj.map((d) => (
									<option key={d.value} value={d.value}>
										{d.label}
									</option>
								))}
							</select>
						</label>
						<button
							disabled={disableButton}
							className={`btn btn-success btn-block ${
								disableButton && "btn-disabled"
							}`}
							onClick={updateStatus}
						>
							Save
						</button>
					</div>
				</OverLayLoader>
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
							<a>Order</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="w-full ">
				<div className="header p-2 flex justify-between items-center  ">
					<h1 className="font-semibold text-xl">Orders</h1>
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
								{orders.map((d, index) => (
									<OrderTableRow
										key={d.id}
										index={index}
										data={d}
										setOrder={setOrder}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withAuth(page, { role: "admin" });
