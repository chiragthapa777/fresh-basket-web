"use client";

import { AuthContextDataType } from "@/models/AuthContextType";
import React, { createContext, useContext, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

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
	const router = useRouter()
	const [authContext, setAuthContext] =
		useState<AuthContextDataType>(initialState);
	const login = async () => {
		setCookie("token", "test");
		await loadUser();
		router.push("/");
		console.log("--------------------")
	};
	const loadUser = async () => {
		if(!authContext.authenticated){
			const token = getCookie("token");
			if (token) {
				setAuthContext((prev: AuthContextDataType) => {
					prev.authenticated = true;
					return prev;
				});
			}else{
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
