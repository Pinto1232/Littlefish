import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../api/apiSlice';

const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    setProducts: (_state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;