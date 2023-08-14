"use client";
import PageLoader from "@/components/PageLoader";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
	const { authContext, loadUser } = useAuthContext();
	const router = useRouter();

	useEffect(() => {
		loadUser();
		if (authContext.authenticated) {
			router.push("/admin/dashboard");
		} else {
			router.push("/login");
		}
		return () => {};
	}, []);

	return (
		<PageLoader />
	);
}
