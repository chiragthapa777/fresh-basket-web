"use client";
import OrderItem from "@/components/OrderItem";
import PageLoader from "@/components/PageLoader";
import ProductCard from "@/components/ProductCard";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdNavigateNext, MdOutlineShoppingBag, MdSearch } from "react-icons/md";
function Home() {
	const { authContext, loadUser } = useAuthContext();
	const router = useRouter();

	const [activeTab, setActiveTab] = useState(0);

	const tabs = [
		{ label: "Next, July 10", content: "Content for Tab 1" },
		{ label: "2033 jun 16", content: "Content for Tab 2" },
		{ label: "2033 may 33", content: "Content for Tab 3" },
	];

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};

	useEffect(() => {}, []);

	return (
		<div className="p-2">
			<div className=" text-sm p-2 bg-primary text-primary-content rounded-md mb-4">
				Choose A Subscription
			</div>
			<p className="mb-4">Subscription for daily items</p>
			<div className="flex flex-col">
				<div className="bg-primary flex w-full h-32 rounded-lg justify-center items-center text-primary-content font-bold text-center mb-4">
					<div>
						<p className="text-2xl">1 Month Subscription</p>
						<p className="text-xl">Rs 3000</p>
					</div>
				</div>
				<div className="bg-primary flex w-full h-32 rounded-lg justify-center items-center text-primary-content font-bold text-center mb-4">
					<div>
						<p className="text-2xl">1 Month Subscription</p>
						<p className="text-xl">Rs 3000</p>
					</div>
				</div>
				<div className="bg-primary flex w-full h-32 rounded-lg justify-center items-center text-primary-content font-bold text-center">
					<div>
						<p className="text-2xl">1 Month Subscription</p>
						<p className="text-xl">Rs 3000</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default withAuth(Home);
