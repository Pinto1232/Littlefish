import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Key, ReactNode } from "react";

export type Dimensions = {
  length: ReactNode;
  width: number;
  height: number;
  depth: number;
};
// product.types.ts
export interface Review {
  _id: string;
  user: string;
  comment: string;
}

export interface Product {
  __v: number;
  _id: string;
  name: string;
  description: string;
  category: {
    description: string;
    name: string;
  };
  price: number;
  attributes: {
    _id: Key | null | undefined;
    name: ReactNode; value: string 
}[];
  imageUrl?: string;
  brand?: string;
  discount?: number;
  stock?: number;
  warranty?: string;
  manufacturer?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;
  tags?: string[];
  ratings?: number[];
  reviews?: Review[]; // Ensure reviews is an array of Review
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


export interface CreateProductProps {
  product?: Product | null;
  onClose: () => void;
  setIsUpdating: (isUpdating: boolean) => void;
  refetch: () => void;
}

export interface ProductData {
  name: string;
  description: string;
  price: number;
  category: { name: string; description: string };
  attributes: { name: string; value: string }[];
  imageFile?: File;
  __v: number;
  _id?: string;
}

export interface ProductFormProps {
  productData: ProductData;
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
  handleSubmit: (formData: FormData) => void;
  isLoading: boolean;
  error: FetchBaseQueryError | null;
}


export interface ProductFormFieldsProps {
  productData: ProductData;
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
}
