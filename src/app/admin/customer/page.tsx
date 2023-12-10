"use client";
import Breadcrump from "@/components/Breadcrump";
import Modal from "@/components/Modal";
import withAuth from "@/hoc/withAuth";
import { UserDetailModel, UserModel } from "@/models/User.model";
import { getCustomers } from "@/services/user.api";
import { Toaster } from "@/utils/Toast";
import { Axios } from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";

function page() {
	const [loading, setloading] = useState(false);
	const [details, setDetails] = useState<UserDetailModel | null>(null);
	const [customers, setCustomers] = useState<UserModel[]>([]);
	const getUser = useCallback(async () => {
		try {
			setloading(true);
			const data = await getCustomers({});
			setCustomers(data);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setloading(false);
		}
	}, []);
	useEffect(() => {
		getUser();
	}, []);

	const getAddress = useMemo((): string => {
		const arr = [
			details?.address?.address?.toString(),
			details?.address?.street?.toString(),
			details?.address?.district?.toString(),
			details?.address?.ward?.toString(),
		].filter((n) => n);
		return arr.join(", ") || "-";
	}, [details?.address]);

	return (
		<div className="bg-base-100">
			<Modal
				isOpen={!!details}
				onClose={() => {
					setDetails(null);
				}}
				title="User details"
			>
				<table className="table w-full">
					<tbody>
						<tr className="border-t-2">
							<th className="w-3/12">Address:</th>
							<td className="w-9/12">{getAddress}</td>
						</tr>
						<tr className="border-t-2">
							<th className="w-3/12">Date Of Birth:</th>
							<td className="w-9/12">
								{details?.dateOfBirth
									? moment(details?.dateOfBirth).format(
											"YYYY-MM-DD"
									  )
									: "-"}
							</td>
						</tr>
						<tr className="border-t-2">
							<th className="w-3/12">Height:</th>
							<td className="w-9/12">{details?.height || "-"}</td>
						</tr>
						<tr className="border-t-2">
							<th className="w-3/12">Weight:</th>
							<td className="w-9/12">{details?.weight || "-"}</td>
						</tr>
						<tr className="border-t-2">
							<th className="w-3/12">Preferences:</th>
							<td className="w-9/12 flex gap-1">
								{details?.preference.map((s, index) => (
									<div
										key={index}
										className="badge badge-outline"
									>
										{s}
									</div>
								))}
							</td>
						</tr>
						<tr className="border-t-2">
							<th className="w-3/12">Diseases:</th>
							<td className="w-9/12 flex gap-1">
								{details?.healthCondition.map((s, i) => (
									<div
										key={i}
										className="badge badge-outline "
									>
										{s}
									</div>
								))}
							</td>
						</tr>
					</tbody>
				</table>
			</Modal>
			<Breadcrump current="customer" />
			<h1 className="font-semibold text-xl my-2">Customers</h1>
			<div className="overflow-x-auto">
				<table className="table table-zebra border">
					{/* head */}
					<thead className="bg-slate-200">
						<tr>
							<th>S.No</th>
							<th>Name</th>
							<th>Email</th>
							<th>Joined At</th>
							<th>Detail</th>
						</tr>
					</thead>
					<tbody>
						{!loading ? (
							customers.map(
								(customer: UserModel, index: number) => (
									<tr key={String(index)}>
										<th>{index + 1}</th>
										<td>{customer.name}</td>
										<td>{customer.email}</td>
										<td>
											{moment(customer.createdAt).format(
												"YYYY-MM-DD"
											)}
										</td>
										<td>
											<button
												className="btn btn-xs btn-primary btn-ghost"
												disabled={!customer.userDetail}
												onClick={() =>
													setDetails(
														customer.userDetail ??
															null
													)
												}
											>
												Open
											</button>
										</td>
									</tr>
								)
							)
						) : (
							<tr>
								<td colSpan={5} className="text-center">
									<span className="loading loading-spinner loading-md"></span>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default withAuth(page, { role: "admin" });
