"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
	MdDashboard,
	MdInventory,
	MdCategory,
	MdOutlineAllInbox,
	MdToc,
} from "react-icons/md";

const iconsClasses = "text-xl ";

const routes = [
	{
		title: "Dashboard",
		icons: <MdDashboard className={iconsClasses} />,
		link: "/admin/dashboard",
	},
	{
		title: "Products",
		icons: <MdOutlineAllInbox className={iconsClasses} />,
		link: "/admin/product",
	},
	{
		title: "Category",
		icons: <MdCategory className={iconsClasses} />,
		link: "/admin/category",
	},
	{
		title: "Stocks",
		icons: <MdInventory className={iconsClasses} />,
		link: "/admin/stock",
	},
	{
		title: "Orders",
		icons: <MdToc className={iconsClasses} />,
		link: "/admin/order",
	},
];

export default function SiderBar({ setIsOpen }: any) {
	const router = useRouter();
	const handleNavigation = (path: string) => {
		setIsOpen(false);
		router.push(path);
	};
	return (
		<ul className="menu w-56 rounded-box bg-base-100">
			{routes.map((route: any) => {
				return (
					<li
						className=""
						key={route.title}
						onClick={() => handleNavigation(route.link)}
					>
						<a>
							{route.icons}
							{route.title}
						</a>
					</li>
				);
			})}
		</ul>
	);
}
