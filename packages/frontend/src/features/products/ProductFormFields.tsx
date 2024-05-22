import React from "react";
import { Grid, TextField } from "@mui/material";
import { ProductFormFieldsProps } from "../products/types/product.types";
import {
  handleAttributeChange,
  handleImageChange,
} from "./ProductFormHandlers";

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
  productData,
  setProductData,
}) => {
  return (
    <>
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
                handleAttributeChange(
                  index,
                  "name",
                  e.target.value,
                  productData,
                  setProductData
                )
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={`Attribute ${index + 1} Value`}
              value={attribute.value}
              onChange={(e) =>
                handleAttributeChange(
                  index,
                  "value",
                  e.target.value,
                  productData,
                  setProductData
                )
              }
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12} sm={6}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, productData, setProductData)}
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
    </>
  );
};

const MemoizedProductFormFields = React.memo(ProductFormFields);
export default MemoizedProductFormFields;
