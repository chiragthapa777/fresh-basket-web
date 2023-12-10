export interface UserModel {
	isActive: boolean;
	id: number;
	name: string;
	role: string;
	Contact_no: null;
	gender: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	roles: any[];
	file: null;
	userDetail?: UserDetailModel;
}

export interface UserDetailModel {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	dateOfBirth: string;
	healthCondition: string[];
	address?: AddressModel;
	preference: string[];
	height: string;
	weight: string;
}

export interface AddressModel {
	district?: string;
	address?: string;
	street?: string;
	ward?: number;
}
