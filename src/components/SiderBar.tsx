"use client";
import { usePathname, useRouter } from "next/navigation";
import {
	MdOutlineAllInbox,
	MdOutlineSupervisorAccount,
	MdToc,
} from "react-icons/md";
import { PiMoneyBold } from "react-icons/pi";

const iconsClasses = "text-xl ";

const routes = [
	{
		title: "Customer",
		icons: <MdOutlineSupervisorAccount className={iconsClasses} />,
		link: "/admin/customer",
	},
	{
		title: "Products",
		icons: <MdOutlineAllInbox className={iconsClasses} />,
		link: "/admin/product",
	},
	{
		title: "Subscriptions",
		icons: <PiMoneyBold className={iconsClasses} />,
		link: "/admin/user-subs",
	},
	{
		title: "Orders",
		icons: <MdToc className={iconsClasses} />,
		link: "/admin/order",
	},
];

export default function SiderBar({ setIsOpen }: any) {
	const router = useRouter();
	const pathname = usePathname();
	const handleNavigation = (path: string) => {
		setIsOpen(false);
		router.push(path);
	};
	return (
		<ul className="menu w-56 rounded-box bg-base-100">
			{routes.map((route: any) => {
				return (
					<li
						className={`${
							pathname === route.link && "bg-slate-200 rounded-md"
						}`}
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
