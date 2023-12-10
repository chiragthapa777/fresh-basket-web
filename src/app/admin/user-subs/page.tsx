"use client";
import Breadcrump from "@/components/Breadcrump";
import Modal from "@/components/Modal";
import OverLayLoader from "@/components/OverLayLoader";
import TrLoader from "@/components/TrLoader";
import withAuth from "@/hoc/withAuth";
import { UserSubscriptionModel } from "@/models/SubsModel";
import { getUserSubscription, veifyUserSubs } from "@/services/subsApi";
import { MySwal } from "@/utils/Swal";
import { Toaster } from "@/utils/Toast";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

function page() {
	const [loading, setloading] = useState(false);
	const [loadingVerify, setloadingVerify] = useState(false);
	const [details, setDetails] = useState<UserSubscriptionModel | null>(null);
	const [userSubs, setUserSubs] = useState<UserSubscriptionModel[]>([]);
	const getUser = useCallback(async () => {
		try {
			setloading(true);
			const data = await getUserSubscription({});
			setUserSubs(data);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setloading(false);
		}
	}, []);
	useEffect(() => {
		getUser();
	}, []);

	const verifySubs = async (userSubs: UserSubscriptionModel) => {
		try {
			setloadingVerify(true);
			await veifyUserSubs(userSubs.id);
			setUserSubs((prev: UserSubscriptionModel[]) =>
				prev.map((us) => {
					if (us.id === userSubs.id) {
						us.active = !userSubs.active;
					}
					return us;
				})
			);
		} catch (error) {
			console.log("🚀 ~ file: page.tsx:51 ~ verifySubs ~ error:", error);
			Toaster(error, "error");
		} finally {
			setloadingVerify(false);
		}
	};

	const confirmVerify = async (userSubs: UserSubscriptionModel) => {
		MySwal.fire({
			title: "Do you want to change active status?",
			showCancelButton: true,
			confirmButtonText: "Save",
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				verifySubs(userSubs);
			} else if (result.isDenied) {
				MySwal.fire("Changes are not saved", "", "info");
			}
		});
	};

	return (
		<div className="bg-base-100">
			{!!details && (
				<Modal
					isOpen={!!details}
					onClose={() => {
						setDetails(null);
					}}
					title="User details"
				>
					<h1>Verify User Subscription</h1>
					<p>Are you sure you wan to verify user subscription</p>
					<div className="flex">
						<button
							className="btn btn-error"
							onClick={() => setDetails(null)}
						>
							Cancel
						</button>
						<button className="btn btn-success">Confirm</button>
					</div>
				</Modal>
			)}

			<Breadcrump current="customer" />
			<div className="overflow-x-auto">
				<OverLayLoader loading={loadingVerify}>
					<table className="table table-zebra border ">
						{/* head */}
						<thead className="bg-slate-200">
							<tr>
								<th className="w-1/12">S.No</th>
								<th className="w-2/12">Customer Name</th>
								<th className="w-2/12">Subscrition</th>
								<th className="w-2/12">Start</th>
								<th className="w-2/12">End</th>
								<th className="w-2/12">Active</th>
								<th className="w-1/12">left</th>
							</tr>
						</thead>
						<tbody>
							{!loading ? (
								userSubs.length === 0 ? (
									<tr>
										<td colSpan={7} className="text-center">
											No Items
										</td>
									</tr>
								) : (
									userSubs.map(
										(
											subs: UserSubscriptionModel,
											index: number
										) => (
											<tr key={String(index)}>
												<th>{index + 1}</th>
												<td>{subs.user.name}</td>
												<td>{subs.subscriptionType}</td>
												<td>
													{moment(
														subs.startDate
													).format("YYYY-MM-DD")}
												</td>
												<td>
													{moment(
														subs.endDate
													).format("YYYY-MM-DD")}
												</td>
												<td>
													<input
														type="checkbox"
														className="toggle toggle-success"
														checked={subs.active}
														onClick={() =>
															confirmVerify(subs)
														}
														readOnly
													/>
												</td>
												<td>{subs.deliveriesLeft}</td>
											</tr>
										)
									)
								)
							) : (
								<TrLoader colSpan={7} />
							)}
						</tbody>
					</table>
				</OverLayLoader>
			</div>
		</div>
	);
}
export default withAuth(page, { role: "admin" });
