export interface Product {
  image: string;
  name: string;
  price: string;
  category: { name: string; description: string };
  rating: number;
  reviews: number;
}

export interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}
