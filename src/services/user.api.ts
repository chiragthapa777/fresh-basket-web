import { baseUrl } from "@/constant";
import { UserModel } from "@/models/User.model";
import Axios from "@/utils/Axios";
import { AxiosInstance } from "axios";

export const getCustomers = async (
	query: Record<string, any>
): Promise<UserModel[]> => {
	const params = "?" + new URLSearchParams(query);
	const axios: AxiosInstance = Axios;
	const data = await axios.get(
		baseUrl + "/users?role=customer&page=1&limit=1000"
	);
	return data?.data?.items;
};

export const getProfile = async (): Promise<UserModel> => {
	const axios: AxiosInstance = Axios;
	const data = await axios.get(baseUrl + "/users/userProfile");
	return data?.data;
};
export const addDetail = async (
	body: Record<string, any>
): Promise<UserModel[]> => {
	console.log("🚀 ~ file: user.api.ts:19 ~ body:", body);
	const axios: AxiosInstance = Axios;
	const data = await axios.post(baseUrl + "/user-details", body);
	return data?.data;
};
