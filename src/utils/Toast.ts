import { toast } from "react-toastify";

export const Toaster = (msg: string | any, status: "error" | "success" | "info") => {
	switch (status) {
		case "success": {
			toast.success(msg || "Successfully completed action", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			break;
		}
		case "info": {
			if(msg){
				toast.info(msg , {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			}
			
			break;
		}
		case "error": {
			const errorMsg = typeof msg === 'string' ? msg : (msg?.message?.reason?.reason || msg?.message?.reason || msg?.message || msg?.message)
			toast.error(errorMsg || "Action cannot be completed", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			break;
		}
	}
};
