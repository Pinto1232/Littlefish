import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { Product } from "../../features/products/types/product.types";

const ProductSlider = () => {
  const { data: products } = useGetProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("Data product Slider: ", products);

  useEffect(() => {
    if (products && products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  if (!selectedProduct) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? "column" : "row"}
      alignItems="center"
      bgcolor={"#000"}
      borderRadius={2}
      m={2}
      p={3}
    >
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={isSmallScreen ? 2 : 0}
      >
        <Card
          sx={{
            maxWidth: 343,
            bgcolor: "fff",
            boxShadow: 1,
            borderRadius: "4px",
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            sx={{
              objectFit: "cover",
              borderRadius: "4px 4px 0 0",
            }}
          />
          <CardContent>
            <Typography
              color={"#000"}
              gutterBottom
              variant="h5"
              component="div"
            >
              {selectedProduct.name}
            </Typography>
            <Typography variant="body2" color={"#000"}>
              {selectedProduct.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        flex={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom color={"#fff"}>
          Explore New Products
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            onClick={() => {
              if (products) {
                handleProductClick(
                  products[
                    (products.indexOf(selectedProduct) - 1 + products.length) %
                      products.length
                  ]
                );
              }
            }}
          >
            <ArrowBackIosIcon sx={{ color: "#fff", fontSize: "large" }} />
          </IconButton>
          {products &&
            products.slice(0, 3).map((product) => (
              <Card
                key={product._id}
                sx={{
                  width: 210,
                  height: 200,
                  margin: 1,
                  cursor: "pointer",
                  bgcolor: "#fff",
                  color: "#000",
                  boxShadow: 2,
                  borderRadius: "10px",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => handleProductClick(product)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
                  sx={{
                    objectFit: "cover",
                    borderRadius: "4px 4px 0 0",
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                        backgroundColor: 'blue',
                        color: "#fff",
                        fontSize: "17px",
                        textAlign: "center",
                        borderRadius: '56px',
                        fontsize: "12px",
                    }}
                    textAlign={"center"}
                    component="div"
                  >
                    {product.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          {products && (
            <IconButton
              onClick={() => {
                handleProductClick(
                  products[
                    (products.indexOf(selectedProduct) + 1) % products.length
                  ]
                );
              }}
            >
              <ArrowForwardIosIcon sx={{ color: "#fff", fontSize: "large" }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const MemoizedProductSlider = React.memo(ProductSlider);
export default MemoizedProductSlider;
