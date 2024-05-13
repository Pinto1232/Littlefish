import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../api/apiSlice';

const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;