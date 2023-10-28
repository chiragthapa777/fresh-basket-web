"use client";

import { AuthContextDataType } from "@/models/AuthContextType";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

const initialState: AuthContextDataType = {
	jwt: "",
	user: null,
	authenticated: false,
	loading: true,
	error: "",
};

interface AuthContextType {
	authContext: AuthContextDataType;
	login: () => void;
	logout: () => void;
	loadUser: () => void;
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
		await loadUser();
		router.push("/");
	};

	const loadUser = async () => {
		if (!authContext.authenticated) {
			const token: any = getCookie("token");
			if (token) {
				setAuthContext((prev: AuthContextDataType) => {
					prev.authenticated = true;
					prev.jwt = token;
					try {
						const decoded = jwt_decode(token);
						prev.user = decoded;
					} catch (error) {
						logout();
					}

					return prev;
				});
			} else {
				logout();
			}
		}
	};

	const logout = async () => {
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

export const useAuthContext = () => useContext(AuthContext);
