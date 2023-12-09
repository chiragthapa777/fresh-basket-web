import { OrderStausEnum } from "./enums/orderStatusEnum";

export const orderData = [
	{
		id: 1,
		createdAt: new Date(),
		updatedAt: new Date(),
		orderNumber: "orderNumber00012",
		status: OrderStausEnum.PLACED,
		total: 1200.0,
		orderBy: {
			id: 1,
			email: "chirag777@g.com",
			name: "chirag",
		},
		userSubscription: {
			id: 1,
			subscribed: {
				id: 1,
				name: "subscription A",
			},
		},
		orderDetails: [
			{
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
				quantity: 2,
				price: 50,
				total: 100,
				product: {
					id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
					name: "orange",
					image: {
						url: "https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg",
					},
				},
			},
			{
				id: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
				quantity: 2,
				price: 50,
				total: 100,
				product: {
					id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
					name: "apple",
					image: {
						url: "https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg",
					},
				},
			},
		],
	},
	{
		id: 3,
		createdAt: new Date(),
		updatedAt: new Date(),
		orderNumber: "orderNumber00012",
		status: OrderStausEnum.PLACED,
		total: 1200.0,
		orderBy: {
			id: 1,
			email: "chirag777@g.com",
			name: "chirag",
		},
		userSubscription: {
			id: 1,
			subscribed: {
				id: 1,
				name: "subscription A",
			},
		},
		orderDetails: [
			{
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
				quantity: 2,
				price: 50,
				total: 100,
				product: {
					id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
					name: "orange",
					image: {
						url: "https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg",
					},
				},
			},
			{
				id: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
				quantity: 2,
				price: 50,
				total: 100,
				product: {
					id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
					name: "apple",
					image: {
						url: "https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg",
					},
				},
			},
		],
	},
	{
		id: 2,
		createdAt: new Date(),
		updatedAt: new Date(),
		orderNumber: "orderNumber00012",
		status: OrderStausEnum.PLACED,
		total: 1200.0,
		orderBy: {
			id: 1,
			email: "chirag777@g.com",
			name: "chirag",
		},
		userSubscription: {
			id: 1,
			subscribed: {
				id: 1,
				name: "subscription A",
			},
		},
		orderDetails: [
			{
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
				quantity: 2,
				price: 50,
				total: 100,
				product: {
					id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
					name: "orange",
					image: {
						url: "https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg",
					},
				},
			},
			{
				id: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
				quantity: 2,
				price: 50,
				total: 100,
				product: {
					id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
					name: "apple",
					image: {
						url: "https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg",
					},
				},
			},
		],
	},
];
