// CartContext.tsx
import React, { createContext, useState, Dispatch, SetStateAction } from "react";

interface Product {
  id: string | number;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
  category: { name: string; description: string };
  rating: number;
  reviews: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  setCart: Dispatch<SetStateAction<Product[]>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    // Load cart from local storage initially
    const savedCart = localStorage.getItem('cart');
    return savedCart? JSON.parse(savedCart) : [];
  });

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let newCart;
      if (existingProduct) {
        newCart = prevCart.map((item) =>
          item.id === product.id? {...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prevCart, {...product, quantity: 1 }];
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));

      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};