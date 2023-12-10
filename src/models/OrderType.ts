import { ProductType } from "./ProductType";
import { UserModel } from "./User.model";

export interface OrderType {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	orderNumber: string;
	deliveryDate: Date;
	status: string;
	total: string;
	userSubscription: UserSubscription;
	orderDetails: OrderDetail[];
	orderBy: UserModel;
}

export interface OrderDetail {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	quantity: number;
	total: number;
	price: number;
	product?: ProductType;
}

export interface UserSubscription {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	subscriptionType: string;
	startDate: Date;
	endDate: Date;
	active: boolean;
	deliveriesLeft: number;
}
