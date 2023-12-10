"use client";

import { AuthContextDataType } from "@/models/AuthContextType";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import { getProfile } from "@/services/user.api";

const initialState: AuthContextDataType = {
	jwt: "",
	user: null,
	authenticated: false,
	loading: true,
	error: "",
};

interface AuthContextType {
	authContext: AuthContextDataType;
	login: (data: string) => void;
	logout: () => void;
	loadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | any>(initialState);

export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	useEffect(() => {
		console.log("Auth context loaded");
		loadUser();
		return () => {};
	}, []);

	const router = useRouter();

	const [authContext, setAuthContext] =
		useState<AuthContextDataType>(initialState);

	const login = async (jwt: string) => {
		setCookie("token", jwt);
		setAuthContext({...authContext, authenticated:true})
		await loadUser();
		router.push("/");
	};

	const loadUser = async () => {
		if (!authContext.authenticated) {
			const token: any = getCookie("token");
			if (token) {
				const decoded: any = jwt_decode(token);
				if (!decoded?.id) {
					return logout();
				}
				try {
					const data = await getProfile();
					console.log(
						"🚀 ~ file: AuthContext.tsx:59 ~ loadUser ~ data:",
						data
					);
					setAuthContext((prev: AuthContextDataType) => {
						prev.authenticated = true;
						prev.jwt = token;
						try {
							prev.user = data;
							localStorage.setItem(
								"profile",
								JSON.stringify(data)
							);
						} catch (error) {
							logout();
						}
						return prev;
					});
				} catch (error) {
					console.log(
						"🚀 ~ file: AuthContext.tsx:60 ~ loadUser ~ error:",
						error
					);
					return logout();
				}
			} else {
				logout();
			}
		}
	};

	const logout = async () => {
		setCookie("token", "");
		localStorage.setItem("profile", "");
		setAuthContext(initialState);
		router.push("/login");
	};

	const value = {
		authContext,
		login,
		logout,
		loadUser,
	};
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = (): AuthContextType => useContext(AuthContext);
