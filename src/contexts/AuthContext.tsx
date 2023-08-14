"use client";

import { AuthContextDataType } from "@/models/AuthContextType";
import React, { createContext, useContext, useState } from "react";
import { getCookie } from "cookies-next";
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
	const login = async () => {};
	const loadUser = async () => {
		const token = getCookie("token");
		if (token) {
			setAuthContext((prev: AuthContextDataType) => {
				prev.authenticated = true;
				return prev;
			});
		}else{
			logout();
			router.push("/login")
		}
	};
	const logout = async () => {
		setAuthContext(initialState);
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
