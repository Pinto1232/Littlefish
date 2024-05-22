export interface Product {
  image: string;
  name: string;
  price: string;
  category: { name: string; description: string };
  rating: number;
  reviews: number;
  size?: string; 
}



export interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    image: string;
    name: string;
    price: string;
    category: { name: string; description: string };
    rating: number;
    reviews: number;
  };
}