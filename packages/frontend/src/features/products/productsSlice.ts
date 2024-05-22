import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../api/apiSlice";

// Create a slice for products
const productsSlice = createSlice({
  name: "products",
  initialState: [] as Product[],
  reducers: {
    // Reducer to set the products state
    setProducts: (_state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
