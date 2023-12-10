"use client";
import OverLayLoader from "@/components/OverLayLoader";
import PageLoader from "@/components/PageLoader";
import ProductCard from "@/components/ProductCard";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/hoc/withAuth";
import { ProductType } from "@/models/ProductType";
import { getProductsApi } from "@/services/product.service";
import { Toaster } from "@/utils/Toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdNavigateNext, MdOutlineShoppingBag, MdSearch } from "react-icons/md";
function Home() {
	const { authContext, loadUser } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<ProductType[]>([]);
	const router = useRouter();

	const getProduct = async () => {
		try {
			const data = await getProductsApi({});
			setProducts(data);
		} catch (error) {
			Toaster(error, "error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProduct();
	}, []);

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
					Upcomming Delivery
				</div>
				<MdNavigateNext className="text-xl mr-1" />
			</Link>
			<h1 className="text-primary font-bold mb-4 border-b border-primary">
				Products
			</h1>
			{loading ? (
				<div className="w-full flex justify-center items-center">
					<span className="loading loading-spinner loading-md"></span>
				</div>
			) : (
				<div className="grid grid-cols-2 gap-2 mb-24 min-h-[100px]">
					{products.map((product) => (
						<ProductCard key={product?.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
}
export default withAuth(Home);
