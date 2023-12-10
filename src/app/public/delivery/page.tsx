"use client";
import Order from "@/components/Order";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/hoc/withAuth";
import { OrderType } from "@/models/OrderType";
import { UserModel } from "@/models/User.model";
import { getAllCurrOrders } from "@/services/orderApiService";
import { Toaster } from "@/utils/Toast";
import { useEffect, useState } from "react";

function Home() {
	const { authContext, loadUser } = useAuthContext();
	const [profile, setProfile] = useState<UserModel | null>();
	useEffect(() => {
		setProfile(JSON.parse(localStorage.getItem("profile") || "{}"));
	}, []);
	const [orders, setOrders] = useState<OrderType[]>([]);
	const [loading, setLoading] = useState(false);

	const getOrders = async () => {
		try {
			setLoading(true);
			const data = await getAllCurrOrders();
			setOrders(data);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getOrders();
	}, []);

	return (
		<div className="p-2">
			<div className=" text-sm p-2 bg-primary text-primary-content rounded-md mb-4">
				Upcomming Deliveries
			</div>
			{/* <div className="flex w-full space-x-[1px] mb-4">
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
			</div> */}
			{loading ? (
				<div className="w-full h-full flex justify-center items-center">

					<span className="loading loading-spinner loading-md"></span>
				</div>
			) : (
				<div className="w-full flex flex-col gap-2">
					{orders.map((d) => (
						<Order key={d.id} order={d} />
					))}
				</div>
			)}
			{/* <div className="grid grid-cols-1 gap-1 mb-24">
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
			</div> */}
		</div>
	);
}
export default withAuth(Home);
