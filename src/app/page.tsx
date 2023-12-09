"use client";
import PageLoader from "@/components/PageLoader";
import { useAuthContext } from "@/contexts/AuthContext";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function Home() {
	const { authContext } = useAuthContext();
	const router = useRouter();

	useEffect(() => {
		console.log("===>",authContext);
		if (authContext.authenticated) {
			if (authContext.user?.role === "customer") {
				router.push("/public");
			} else if (authContext.user?.role === "admin") {
				router.push("/admin/dashboard");
			} else {
				router.push("/login");
			}
		} else {
			router.push("/login");
		}
		return () => {};
	}, []);

	return <PageLoader />;
}
export default withAuth(Home, { role: "admin" });
