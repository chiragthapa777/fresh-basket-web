"use client";
import OrderItem from "@/components/OrderItem";
import PageLoader from "@/components/PageLoader";
import ProductCard from "@/components/ProductCard";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
	MdSearch,
} from "react-icons/md";
function Home() {
	const { authContext, loadUser, logout } = useAuthContext();
	const router = useRouter();

	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};

	const handleLogin = () => {
		logout();
	};

	useEffect(() => {}, []);

	return (
		<div className="p-2">
			<div className="border-b py-2 mb-4">
				<img
					src="https://avatars.githubusercontent.com/u/4737348?s=48&v=4"
					alt=""
					className="h-28 w-28 rounded-full object-cover"
				/>
				<p className="font-bold text-2xl flex justify-start items-center">
					Chirag Thapa{" "}
					<MdOutlineDownloadDone className="ml-3 text-success" />
				</p>
				<p className="text-xs text-gray-400">
					chiragthapa777@gmail.com
				</p>
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
					href={`/public/account/address`}
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
					href={`/public/account/orders`}
					className="flex p-2 my-1 rounded-lg justify-between items-center bg-base-100"
				>
					<div className="flex justify-center items-center text-lg">
						<MdOutlineShoppingBag className="mr-2" />
						Orders
					</div>
					<MdNavigateNext />
				</Link>
				<Link
					href={`/public/account/items`}
					className="flex p-2 my-1 rounded-lg justify-between items-center bg-base-100"
				>
					<div className="flex justify-center items-center text-lg">
						<MdOutlinePlaylistAddCheck className="mr-2" />
						Selected Item
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
