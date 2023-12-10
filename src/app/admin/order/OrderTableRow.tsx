"use client";
import { orderStatusObj } from "@/enums/orderStatusEnum";
import { OrderType } from "@/models/OrderType";
import moment from "moment";
import React, { useState } from "react";

export default function OrderTableRow({
	index,
	data,
	setOrder,
}: {
	index: number;
	data: OrderType;
	setOrder: (orderType: OrderType) => void;
}) {
	const [open, setopen] = useState(false);
	return (
		<>
			<tr>
				<th>{index + 1}</th>
				<td>{data?.orderNumber}</td>
				<td>{data?.orderBy?.name}</td>
				<td>{moment(data?.deliveryDate).format("yyyy-mm-DD")}</td>
				<td>{data?.userSubscription?.subscriptionType}</td>
				<td className="cursor-pointer " onClick={() => setOrder(data)}>
					<div className="badge badge-secondary badge-outline">
						{orderStatusObj[data?.status]}
					</div>
				</td>
				<td>{data?.total}</td>
				<td onClick={() => setopen(!open)}>open</td>
			</tr>
			{open && (
				<tr>
					<td></td>
					<td colSpan={7} className="p-2">
						<table className="table table-sm border drop-shadow-2xl rounded-2xl ">
							<thead className="bg-base-300/10">
								<tr>
									<th className="w-2/10">S.No</th>
									<th className="w-2/10">Name</th>
									<th className="w-2/10">Price</th>
									<th className="w-2/10">Quantity</th>
									<th className="w-2/10">Total</th>
								</tr>
							</thead>
							<tbody>
								{data?.orderDetails?.map((d, i) => (
									<tr className="">
										<td>{i + 1}</td>
										<td>{d?.product?.name}</td>
										<td>{d?.price}</td>
										<td>{d?.quantity}</td>
										<td>{d?.total}</td>
									</tr>
								))}
							</tbody>
						</table>
					</td>
				</tr>
			)}
		</>
	);
}
