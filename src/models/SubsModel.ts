export interface UserSubscriptionModel {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	subscriptionType: string;
	startDate: Date;
	endDate: Date;
	active: boolean;
	deliveriesLeft: number;
	user: User;
	subscribed: Subscribed;
}

export interface Subscribed {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	subscriptionType: string;
	name: null;
	durationDays: null;
	totalDelivery: number;
}

export interface User {
	isActive: boolean;
	id: number;
	name: string;
	role: string;
	Contact_no: string;
	gender: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}
