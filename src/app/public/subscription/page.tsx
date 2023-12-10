"use client";
import OverLayLoader from "@/components/OverLayLoader";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/hoc/withAuth";
import { Subscribed, UserSubscriptionModel } from "@/models/SubsModel";
import { addUserSubs, getCurrSubs, getSubsApi } from "@/services/subsApi";
import { MySwal } from "@/utils/Swal";
import { Toaster } from "@/utils/Toast";
import { useEffect, useState } from "react";
function Home() {
	const [loading, setloading] = useState(false);
	const { authContext } = useAuthContext();
	const [subs, setSubs] = useState<Subscribed[]>([]);
	const [userSubs, setUserSub] = useState<UserSubscriptionModel | null>(null);
	const getSubs = async () => {
		try {
			setloading(true);
			const data = await getSubsApi();
			setSubs(data);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setloading(false);
		}
	};
	const getCurrUserSubs = async () => {
		try {
			setloading(true);
			const data = await getCurrSubs();
			console.log(
				"🚀 ~ file: page.tsx:30 ~ getCurrUserSubs ~ data:",
				data
			);
			setUserSub(data);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setloading(false);
		}
	};

	const addSubscription = async (sub: Subscribed) => {
		try {
			setloading(true);
			const data = await addUserSubs({
				userId: authContext.user?.id,
				subsId: sub?.id,
			});
			console.log(
				"🚀 ~ file: page.tsx:33 ~ addSubscription ~ data:",
				data
			);
			setUserSub(data);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setloading(false);
		}
	};

	const addSubscriptionConfirm = async (data: Subscribed) => {
		MySwal.fire({
			title: "Do you want to add this subscription?",
			showCancelButton: true,
			confirmButtonText: "Save",
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				addSubscription(data);
			} else if (result.isDenied) {
				MySwal.fire("Changes are not saved", "", "info");
			}
		});
	};

	useEffect(() => {
		getCurrUserSubs().then(() => {
			console.log(
				"🚀 ~ file: page.tsx:74 ~ getCurrUserSubs ~ userSubs:",
				userSubs
			);
			if (!userSubs?.id) {
				getSubs();
			}
		});
	}, []);

	return (
		<div className="p-2">
			<div className=" text-sm p-2 bg-primary text-primary-content rounded-md mb-4">
				Choose A Subscription
			</div>
			<p className="mb-4">Subscription for daily items</p>
			{userSubs ? (
				<div className="bg-primary flex w-full h-32 rounded-lg justify-center items-center text-primary-content font-bold text-center mb-4">
					<div>
						<p className="text-2xl">Subscribed</p>
						<p className="text-xl">
							{userSubs?.subscribed?.subscriptionType}
						</p>
						{userSubs?.active ? (
							<p>Verified</p>
						) : (
							<p>Verified Pending...</p>
						)}
					</div>
				</div>
			) : (
				<OverLayLoader loading={loading}>
					<div className="flex flex-col">
						{subs.map((d, i) => (
							<div
								onClick={() => addSubscriptionConfirm(d)}
								key={i}
								className="bg-primary flex w-full h-32 rounded-lg justify-center items-center text-primary-content font-bold text-center mb-4"
							>
								<div>
									<p className="text-2xl">{d?.name}</p>
									<p className="text-xl">
										{d?.subscriptionType}
									</p>
								</div>
							</div>
						))}
					</div>
				</OverLayLoader>
			)}
		</div>
	);
}
export default withAuth(Home);
