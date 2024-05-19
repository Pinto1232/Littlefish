import React, { useState, useEffect } from "react";
import { useCreateProductMutation } from "../api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Product } from "../products/types/product.types";
import ProductForm from "./ProductForm";

interface CreateProductProps {
  product?: Product | null;
  onClose: () => void;
  setIsUpdating: (isUpdating: boolean) => void;
  refetch: () => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({
  product,
  onClose,
  setIsUpdating,
  refetch,
}) => {
  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: { name: "", description: "" },
    attributes: [{ name: "", value: "" }],
    imageFile: null as File | null,
    __v: 0,
  });

  useEffect(() => {
    if (product) {
      setProductData({
        ...product,
        imageFile: null,
        __v: product.__v || 0,
      });
    } else {
      setProductData({
        name: "",
        description: "",
        price: 0,
        category: { name: "", description: "" },
        attributes: [{ name: "", value: "" }],
        imageFile: null,
        __v: 0,
      });
    }
  }, [product]);

  const handleSubmit = async (formData: FormData) => {
    setIsUpdating(true);
    try {
      console.log("Submitting product:", productData);
      await createProduct(formData).unwrap();
      alert("Product created successfully");
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
      isLoading={isLoading}
      error={isFetchBaseQueryError(error) ? error : null}
    />
  );
};

const MemoizedCreateProduct = React.memo(CreateProduct);
export default MemoizedCreateProduct;
