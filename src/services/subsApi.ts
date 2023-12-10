import { baseUrl } from "@/constant";
import { UserSubscriptionModel } from "@/models/SubsModel";
import Axios from "@/utils/Axios";
import { AxiosInstance } from "axios";

export const getUserSubscription = async (
	query: Record<string, any>
): Promise<UserSubscriptionModel[]> => {
	const params = "?" + new URLSearchParams(query);
	const axios: AxiosInstance = Axios;
	const data = await axios.get(baseUrl + "/subscription/user-sub/all");
	return data?.data;
};

export const veifyUserSubs = async (userSubsId: number): Promise<void> => {
	const axios: AxiosInstance = Axios;
	await axios.patch(baseUrl + "/subscription/user-sub/verify/" + userSubsId);
};

export const getSubsApi = async () => {
	const axios: AxiosInstance = Axios;
	const data = await axios.get(baseUrl + "/subscription");
	return data?.data;
};

export const addUserSubs = async (body: any) => {
	const axios: AxiosInstance = Axios;
	const data = await axios.post(baseUrl + "/subscription/user-sub", body);
	return data?.data;
};
