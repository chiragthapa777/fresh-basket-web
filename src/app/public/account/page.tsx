"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/hoc/withAuth";
import { UserModel } from "@/models/User.model";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	MdCalendarMonth,
	MdNavigateNext,
	MdOutlineDownloadDone,
	MdOutlineLocationOn,
	MdOutlineLogout,
	MdOutlinePayments,
	MdOutlinePlaylistAddCheck,
	MdOutlineShoppingBag,
	MdPermIdentity,
} from "react-icons/md";
function Home() {
	const { logout } = useAuthContext();
	const [profile, setProfile] = useState<UserModel | null>();
	useEffect(() => {
		setProfile(JSON.parse(localStorage.getItem("profile") || "{}"));
	}, []);

	const handleLogin = () => {
		logout();
	};

	return (
		<div className="p-2">
			<div className="border-b py-2 mb-4">
				<img
					src="https://avatars.githubusercontent.com/u/4737348?s=48&v=4"
					alt=""
					className="h-28 w-28 rounded-full object-cover"
				/>
				<p className="font-bold text-2xl flex justify-start items-center">
					{profile?.name}
					{profile?.userDetail?.id && (
						<MdOutlineDownloadDone className="ml-3 text-success" />
					)}
				</p>
				<p className="text-xs text-gray-400">{profile?.email}</p>
			</div>
			<p className="text-xs text-gray-400">Your Information</p>
			<div className="flex flex-col mb-4">
				<Link
					href={`/public/account/detail`}
					className="flex p-2 my-1 rounded-lg justify-between items-center bg-base-100"
				>
					<div className="flex justify-center items-center text-lg">
						<MdPermIdentity className="mr-2 " />
						User Detail
					</div>
					<MdNavigateNext />
				</Link>
				<Link
					href={`/public/account/detail`}
					className="flex p-2 my-1 rounded-lg justify-between items-center bg-base-100"
				>
					<div className="flex justify-center items-center text-lg">
						<MdOutlineLocationOn className="mr-2" />
						Address
					</div>
					<MdNavigateNext />
				</Link>
			</div>
			<p className="text-xs text-gray-400">Orders</p>
			<div className="flex flex-col">
				<Link
					href={`/public/account/delivery`}
					className="flex p-2 my-1 rounded-lg justify-between items-center bg-base-100"
				>
					<div className="flex justify-center items-center text-lg">
						<MdOutlineShoppingBag className="mr-2" />
						Orders
					</div>
					<MdNavigateNext />
				</Link>
				<Link
					href={`/public/account/payment`}
					className="flex p-2 my-1 rounded-lg justify-between items-center bg-base-100"
				>
					<div className="flex justify-center items-center text-lg">
						<MdOutlinePayments className="mr-2" />
						Payment
					</div>
					<MdNavigateNext />
				</Link>
				<Link
					href={`/public/subscription`}
					className="flex p-2 my-1 rounded-lg justify-between items-center bg-base-100"
				>
					<div className="flex justify-center items-center text-lg">
						<MdCalendarMonth className="mr-2" />
						Subscription
					</div>
					<MdNavigateNext />
				</Link>
			</div>
			<p className="text-xs text-gray-400">Others</p>
			<div className="flex flex-col mb-20">
				<div
					className="flex p-2 my-1 rounded-lg justify-between items-center bg-base-100"
					onClick={() => handleLogin()}
				>
					<div className="flex justify-center items-center text-lg">
						<MdOutlineLogout className="mr-2" />
						Logout
					</div>
					<MdNavigateNext />
				</div>
			</div>
		</div>
	);
}
export default withAuth(Home);
