import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../products/types/product.types";
export type { Product };

const baseUrl = "http://localhost:5000/api";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => "/products",
        }),
        getProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
        }),
        createProduct: builder.mutation<Product, FormData>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct,
            }),
        }),
        updateProduct: builder.mutation<
            Product,
            { id: string; product: Partial<Product> }
        >({
            query: ({ id, product }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: product,
            }),
        }),
        deleteProduct: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = apiSlice;