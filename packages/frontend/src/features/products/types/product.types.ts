export interface Product {
  reviews: number;
  rating: number;
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  category: {
    name: string;
    description: string;
  };
  attributes: {
    name: string;
    value: string;
  }[];
  __v?: number; 
}