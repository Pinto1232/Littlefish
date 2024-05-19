import React, { useState, useEffect } from "react";
import { useCreateProductMutation } from "../api/apiSlice";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Product } from "../products/types/product.types";

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

  const handleAttributeChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newAttributes = [...productData.attributes];
    newAttributes[index] = { ...newAttributes[index], [field]: value };
    setProductData({ ...productData, attributes: newAttributes });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductData({ ...productData, imageFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
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

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {product ? "" : ""}
      </Typography>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={productData.price}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    price: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category Name"
                value={productData.category.name}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    category: { ...productData.category, name: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category Description"
                value={productData.category.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    category: {
                      ...productData.category,
                      description: e.target.value,
                    },
                  })
                }
              />
            </Grid>
            {productData.attributes.map((attribute, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`Attribute ${index + 1} Name`}
                    value={attribute.name}
                    onChange={(e) =>
                      handleAttributeChange(index, "name", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`Attribute ${index + 1} Value`}
                    value={attribute.value}
                    onChange={(e) =>
                      handleAttributeChange(index, "value", e.target.value)
                    }
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Version"
                type="number"
                value={productData.__v}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    __v: Number(e.target.value),
                  })
                }
              />
            </Grid>
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
                ) : product ? (
                  "Edit Product"
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

const MemoizedCreateProduct = React.memo(CreateProduct);
export default MemoizedCreateProduct;


