"use client";
import { baseUrl } from "@/constant";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

const Axios = axios.create({
	baseURL: baseUrl,
	// You can add other default configuration options here
});

Axios.interceptors.request.use((config) => {
	const token = getCookie("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

Axios.interceptors.response.use(
	(response : AxiosResponse) => {
		console.log("🚀 ~ file: Axios.ts:21 ~ response:", response);
		return response.data;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			window.location.href = "/login";
		}
		return Promise.reject(error.response.data);
	}
);

export default Axios;
