"use client";
import PageLoader from "@/components/PageLoader";
import ProductCard from "@/components/ProductCard";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdNavigateNext, MdOutlineShoppingBag, MdSearch } from "react-icons/md";
function Home() {
	const { authContext, loadUser } = useAuthContext();
	const router = useRouter();

	const getProduct = async () => {
		
	}

	useEffect(() => {}, []);

	return (
		<div className="p-2">
			<div className="relative rounded-full shadow-lg mb-4">
				<input
					type="text"
					placeholder="Search for vegetable, grocery amd more"
					className="w-full text-sm px-4 py-2 pr-10 leading-tight bg-white border border-gray-300 rounded-full focus:outline-none focus:shadow-outline"
				/>
				<div className="absolute inset-y-0 right-0 flex items-center pr-3">
					<MdSearch className="h-5 w-5 text-gray-400" />
				</div>
			</div>
			<div className="relative bg-cover bg-center h-32 bg-hero-image rounded-md mb-4">
				<div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
				<Link
					href={"/public/subscription"}
					className="absolute inset-0 flex flex-col items-center justify-center text-white text-2xl font-bold"
				>
					FreshBasket
					<h1 className="text-base font-semibold">Subscription</h1>
				</Link>
			</div>
			<Link
				href={"/public/delivery"}
				className="bg-primary flex p-2 rounded-md text-primary-content items-center justify-between mb-4"
			>
				<div className="flex">
					<MdOutlineShoppingBag className="text-xl mr-1" />
					Upcomming Delivery, 13 items
				</div>
				<MdNavigateNext className="text-xl mr-1" />
			</Link>
			<h1 className="text-primary font-bold mb-4 border-b border-primary">
				Products
			</h1>
			<div className="grid grid-cols-2 gap-2 mb-24">
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		</div>
	);
}
export default withAuth(Home);
