export enum OrderStausEnum {
	PLACED = "0",
	CONFIRMED = "1",
	PROCESSING = "2",
	DELIVERED = "3",
	CANCELLED = "-1",
}
export const orderStatusObj: Record<string, string> = {
	"0": "PLACED",
	"1": "CONFIRMED",
	"2": "PROCESSING",
	"3": "DELIVERED",
	"-1": "CANCELLED",
};

export const orderStatusArr = [
	"PLACED",
	"CONFIRMED",
	"PROCESSING",
	"DELIVERED",
	"CANCELLED",
];
export const orderStatusArrObj: { value: OrderStausEnum; label: string }[] = [
	{
		value: OrderStausEnum.PLACED,
		label: "PLACED",
	},
	{
		value: OrderStausEnum.CONFIRMED,
		label: "CONFIRMED",
	},
	{
		value: OrderStausEnum.PROCESSING,
		label: "PROCESSING",
	},
	{
		value: OrderStausEnum.DELIVERED,
		label: "DELIVERED",
	},
	{
		value: OrderStausEnum.CANCELLED,
		label: "CANCELLED",
	},
];
