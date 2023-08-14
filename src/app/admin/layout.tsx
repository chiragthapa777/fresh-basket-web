"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import { useAuthContext } from "@/contexts/AuthContext";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { authContext, loadUser } = useAuthContext();
	useEffect(() => {
		if(!authContext.authenticated){
			loadUser()
		}
		return () => {};
	}, []);

	return (
		<main>
			<Header>{children}</Header>
		</main>
	);
}
