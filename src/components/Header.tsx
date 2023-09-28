"use client";
import React, { useState } from "react";
import Drawer from "./Drawer";
import SiderBar from "./SiderBar";
import { MdMenu } from "react-icons/md";
import { MdPerson, MdOutlineLogout } from "react-icons/md";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function Header({ children }: any) {
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useAuthContext();
	const logoutUser = () => {
		deleteCookie("token")
		logout();
	};
	return (
		<main className="bg-base-200 min-h-screen">
			<nav>
				<div className="navbar bg-base-100 border-b fixed top-0 left-0 right-0 z-40 h-[64px]">
					<div className="flex-none">
						<button
							className="btn btn-square btn-ghost block lg:hidden"
							onClick={() => setIsOpen(!isOpen)}
						>
							<MdMenu className="inline-block text-2xl text-primary" />
						</button>
					</div>
					<div className="flex-1">
						<a className="btn btn-ghost text-primary font-bold normal-case text-xl">
							Fresh Basket
						</a>
					</div>
					<div className="flex-none">
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="m-1">
								<div className="avatar placeholder">
									<div className="bg-base-300 text-base-content rounded-full w-12">
										<span className="text-xs">MX</span>
									</div>
								</div>
							</label>
							<ul
								tabIndex={0}
								className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-1"
							>
								<li>
									<a>
										{" "}
										<MdPerson className="text-lg" /> Profile
									</a>
								</li>
								<li>
									<a onClick={logoutUser}>
										{" "}
										<MdOutlineLogout className="text-lg" />{" "}
										Logout
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
			<section className="flex overflow-hidden">
				<div className="sidebar w-[230px] bg-base-100 overflow-y-auto fixed top-[64px] left-0 h-[calc(100%-64px)] hidden lg:block border-r">
					<SiderBar setIsOpen={setIsOpen} />
				</div>
				<div className="flex-1 p-2 overflow-y-auto lg:ml-[230px] mt-[64px] ">
					{children}
				</div>
			</section>
			<Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
				<SiderBar setIsOpen={setIsOpen} />
			</Drawer>
		</main>
	);
}
