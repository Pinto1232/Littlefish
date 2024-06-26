import React from "react";
import { Typography, Paper, Grid, Button, Box } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import ProductFormFields from "./ProductFormFields";
import { ProductFormProps } from "../products/types/product.types";

const ProductForm: React.FC<ProductFormProps> = ({
  productData,
  setProductData,
  handleSubmit,
  isLoading,
  error,
}) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("category[name]", productData.category.name);
    formData.append("category[description]", productData.category.description);
    productData.attributes.forEach((attr, index) => {
      formData.append(`attributes[${index}][name]`, attr.name);
      formData.append(`attributes[${index}][value]`, attr.value);
    });
    if (productData.imageFile) {
      formData.append("image", productData.imageFile);
    }
    formData.append("__v", productData.__v.toString());

    // Check if productData has an _id to determine if it's an update
    if (productData._id) {
      formData.append("productId", productData._id);
    }
    handleSubmit(formData); // Pass only one argument
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {productData._id ? "Edit Product" : "Create Product"}
      </Typography>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <ProductFormFields
              productData={productData}
              setProductData={setProductData}
            />
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <Box></Box>
                ) : productData._id ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">
                  Error: {JSON.stringify((error as FetchBaseQueryError).data)}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </>
  );
};

const MemoizedProductForm = React.memo(ProductForm);
export default MemoizedProductForm;
