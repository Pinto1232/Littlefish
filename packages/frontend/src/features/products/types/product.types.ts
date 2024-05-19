export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export interface Product {
  brand: string;
  id: number;
  reviews?: number;
  rating?: number;
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
  color?: string;
  size?: string;
  price: number;
  quantity?: number; 
  dimensions: Dimensions;
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


export interface ProductData {
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
    description: string;
  };
  attributes: Array<{
    name: string;
    value: string;
  }>;
  imageFile?: File;
  __v: number;
}