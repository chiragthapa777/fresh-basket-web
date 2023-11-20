import { baseUrl } from "@/constant";
import { ProductType } from "@/models/ProductType";
import Axios from "@/utils/Axios";
import { AxiosError, AxiosInstance } from "axios";

export const getProductsApi = async (
	query: Record<string, any>
): Promise<ProductType[]> => {
	const params = "?" + new URLSearchParams(query);
	const axios: AxiosInstance = Axios;
	const data = await axios.get(baseUrl + "/product" + params);
	return data.data;
};
