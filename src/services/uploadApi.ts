import { baseUrl } from "@/constant";
import { FileType } from "@/models/FileType";
import Axios from "@/utils/Axios";
import { AxiosInstance } from "axios";

export const uploadFileApi = async (inputFile: FileList) : Promise<FileType[]> => {
	const formData = new FormData();
	formData.append("files", inputFile[0] as File);
	const axios: AxiosInstance = Axios;
	const data = await axios.post(baseUrl + "/files/photo", formData, {
		withCredentials: false,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});
	return data.data;
};
