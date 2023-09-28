import React, { ComponentType, useContext, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext"; // Import your AuthContext from the correct location
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: any, options?: any) => {
	return () => {
		const { authContext, loadUser } = useAuthContext();
		const router = useRouter();
		console.log("🚀 ~ file: withAuth.tsx:6 ~ withAuth ~ options:", options)

		useEffect(() => {
			loadUser();
			// Check if the user is authenticated
			if (!authContext.authenticated) {
				// Redirect to the login page
				router.push("/login");
			}
		}, [authContext.authenticated]);

		// If the user is authenticated or after redirection, render the wrapped component
		return <WrappedComponent />;
	};
};

export default withAuth;
