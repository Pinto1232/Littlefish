export interface Review {
  user: string;
  comment: string;
  _id: string;
}

export interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  category: {
    name: string;
    description: string;
  };
  rating: number;
  reviews: Review[]; 
  brand?: string;
  description: string;
}