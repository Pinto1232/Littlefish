import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice';
import productsReducer from '../features/products/productsSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Add API slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer, 
    // Add products slice reducer
    products: productsReducer, 
  },
  
  middleware: (getDefaultMiddleware) =>
    // Add API middleware
    getDefaultMiddleware().concat(apiSlice.middleware), 
});

// Setup listeners for refetching on focus or reconnect
setupListeners(store.dispatch);

// Export types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;