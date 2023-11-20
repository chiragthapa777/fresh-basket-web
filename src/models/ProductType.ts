export interface ProductType {
    id:              number;
    createdAt:       Date;
    updatedAt:       Date;
    name:            string;
    description:     string;
    nutritionData:   string[];
    healthCondition: string[];
    productCategory: string;
}
