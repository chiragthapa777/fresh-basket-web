import { UserModel } from "./User.model";

export interface AuthContextDataType {
	jwt: string;
	user: UserModel | null;
	authenticated: boolean;
	loading: boolean;
	error: string;
}
