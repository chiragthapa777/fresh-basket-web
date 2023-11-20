"use client";
import OrderItem from "@/components/OrderItem";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
				Upcomming Deliveries
			</div>
			<div className="flex w-full space-x-[1px] mb-4">
				{tabs.map((tab, index) => (
					<button
						key={index}
						onClick={() => handleTabClick(index)}
						className={` px-4  text-xs py-2 transition-colors duration-300 hover:bg-primary hover:text-white w-1/3 rounded-md ${
							activeTab === index
								? "bg-primary text-primary-content "
								: "bg-base-100 text-base-content"
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className="grid grid-cols-1 gap-1 mb-24">
				<OrderItem />
				<OrderItem />
				<OrderItem />
				<OrderItem />
				<OrderItem />
				<OrderItem />
				<OrderItem />
				<OrderItem />
				<OrderItem />
				<OrderItem />
				<OrderItem />
				<OrderItem />
			</div>
		</div>
	);
}
export default withAuth(Home);
