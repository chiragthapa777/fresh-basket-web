"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import OrderItem from "./OrderItem";
import { orderStatusObj } from "@/enums/orderStatusEnum";
import { OrderType } from "@/models/OrderType";
import moment from "moment";

export default function Order({ order }: { order: OrderType }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Order Details"
			>
				<div className="flex flex-col gap-2">
					{order?.orderDetails?.map((det) => (
						<OrderItem detail={det} key={det?.id} />
					))}
				</div>
			</Modal>
			<div
				className="p-2 border rounded-md flex justify-between bg-base-100"
				onClick={() => setIsOpen(true)}
			>
				<div>
					<div className="font-bold">
						Order Number : {order.orderNumber?.slice(0, 9)}
					</div>
					<div>Status : {orderStatusObj[order.status]} </div>
					<div>Rs {order.total}</div>
				</div>
				<div>{moment(order.deliveryDate).format("yyyy-mm-DD")}</div>
			</div>
		</>
	);
}
