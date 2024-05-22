import React, { useState, useEffect } from "react";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  CreateProductProps,
  ProductData,
} from "../products/types/product.types";
import ProductForm from "./ProductForm";

const CreateProduct: React.FC<CreateProductProps> = ({
  product,
  onClose,
  setIsUpdating,
  refetch,
}) => {
  const [createProduct, { isLoading: isCreating, error: createError }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    description: "",
    price: 0,
    category: { name: "", description: "" },
    attributes: [{ name: "", value: "" }],
    imageFile: undefined,
    __v: 0,
  });

  // Update product data if a product is provided
  useEffect(() => {
    if (product) {
      setProductData({
        ...product,
        imageFile: undefined,
        category: {
          ...product.category,
          description: product.category.description || "",
        },
        attributes: product.attributes.map((attr) => ({
          name: attr.name as string,
          value: attr.value,
        })),
        __v: product.__v,
      });
    } else {
      setProductData({
        name: "",
        description: "",
        price: 0,
        category: { name: "", description: "" },
        attributes: [{ name: "", value: "" }],
        imageFile: undefined,
        __v: 0,
      });
    }
  }, [product]);

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    setIsUpdating(true);
    try {
      console.log("Submitting product:", productData);
      if (productData._id) {
        // Logic for updating a product
        await updateProduct({ productId: productData._id, formData }).unwrap();
      } else {
        // Logic for creating a new product
        await createProduct(formData).unwrap();
      }
      alert("Product saved successfully");
      refetch();
      onClose();
    } catch (err) {
      console.error("Failed to save the product: ", err);
      let errorMessage = "Unknown error";
      if ((err as FetchBaseQueryError).data) {
        errorMessage = JSON.stringify((err as FetchBaseQueryError).data);
      }
      alert(`Failed to save the product: ${errorMessage}`);
    } finally {
      setIsUpdating(false);
    }
  };

  // Type guard for FetchBaseQueryError
  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "status" in error;
  };

  return (
    <ProductForm
      productData={productData}
      setProductData={setProductData}
      handleSubmit={handleSubmit}
      isLoading={isCreating || isUpdating}
      error={
        isFetchBaseQueryError(createError)
          ? createError
          : isFetchBaseQueryError(updateError)
          ? updateError
          : null
      }
    />
  );
};

// Memoize the CreateProduct component
const MemoizedCreateProduct = React.memo(CreateProduct);
export default MemoizedCreateProduct;
