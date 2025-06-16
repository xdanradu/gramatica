export interface Product {
    id: number;
    name: string,
    oldPrice?: string, // Keep oldPrice as string for now, assuming it might not always have currency
    price: number, // Changed type to number
    currency: string, // Added currency property
    description: string,
    nutritionLabel?: string,
    nutrition: string,
    largeImage: string,
    thumb: string
}