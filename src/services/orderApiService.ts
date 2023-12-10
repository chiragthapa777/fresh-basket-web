import { baseUrl } from "@/constant";
import { OrderStausEnum } from "@/enums/orderStatusEnum";
import { OrderType } from "@/models/OrderType";
import Axios from "@/utils/Axios";
import { AxiosInstance } from "axios";

export const getAllOrders = async (): Promise<OrderType[]> => {
	const axios: AxiosInstance = Axios;
	const data = await axios.get(baseUrl + "/order");
	return data?.data;
};
export const getAllCurrOrders = async (): Promise<OrderType[]> => {
	const axios: AxiosInstance = Axios;
	const data = await axios.get(baseUrl + "/order/curr");
	return data?.data;
};
export const updateOrderStatus = async (body: {
	status: OrderStausEnum;
	orderId?: number;
}): Promise<OrderType[]> => {
	const axios: AxiosInstance = Axios;
	const data = await axios.patch(baseUrl + "/order/" + body.orderId, {
		status: body.status,
	});
	return data?.data;
};
