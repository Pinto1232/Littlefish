export interface ProductCardProps {
    id: string;
    image: string;
    name: string;
    price: string;
    category: { name: string; description: string };
    description: string;
    rating?: number;
    reviews?: number;
    brand?: string;
  }