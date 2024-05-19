import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Pagination,
  Box,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { useGetProductsQuery } from "../features/api/apiSlice";
import ProductCard from "../components/ProductCard/ProductCard";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Navbar from "../components/Navbar/Navbar";
import GlobalStyle from "../GlobalStyle/GlobalStyle";
import AuthForm from "../components/AuthForm/AuthForm";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import { Dimensions } from "../features/products/types/product.types";
import theme from "../custom/theme";
import Footer from "../components/Footer/Footer";

const Home: React.FC = () => {
  const { data: products, error } = useGetProductsQuery();
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const itemsPerPage = 6;

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (query: string) => {
    if (query) {
      const filtered = products?.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      if (filtered?.length === 0) {
        setSnackbarMessage("The product you are looking for does not exist.");
        setSnackbarOpen(true);
      }
    } else {
      setFilteredProducts(products);
      setSnackbarOpen(false); // Close the Snackbar when the search query is cleared
    }
  };

  // Extract unique categories
  const categories = Array.from(
    new Set(products?.map((product) => product.category.name))
  );

  const handleFilter = (selectedCategory: string) => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products?.filter(
          (product) => product.category.name === selectedCategory
        )
      );
    }
  };

  const handlePriceChange = (priceRange: number[]) => {
    const [minPrice, maxPrice] = priceRange;
    setFilteredProducts(
      products?.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      )
    );
  };

  const handleColorChange = (color: string) => {
    setFilteredProducts(products?.filter((product) => product.color === color));
  };

  const handleSizeChange = (size: string) => {
    setFilteredProducts(products?.filter((product) => product.size === size));
  };

  const handleDimensionChange = (dimension: string, newValue: number[]) => {
    setFilteredProducts((prevProducts) => {
      return prevProducts?.filter((product) => {
        const productDimension =
          product.dimensions[dimension as keyof Dimensions];
        return (
          productDimension >= newValue[0] && productDimension <= newValue[1]
        );
      });
    });
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error fetching products
      </Typography>
    );
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts?.slice(startIndex, endIndex);

  return (
    <>
      <GlobalStyle />
      <Navbar setTab={setTab} setAuthModalOpen={setAuthModalOpen} />
      <Jumbotron
        backgroundImage="https://wallpapers.com/images/hd/shop-background-2y3skz5z6mp0qca3.jpg"
        onSearch={handleSearch}
      />
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="flex-start"
      >
        {isSmallScreen && (
          <Grid item xs={12}>
            <Grid container>
              {paginatedProducts?.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <ProductCard
                    id={product._id}
                    brand={product.brand || "Default Brand"}
                    image={product.imageUrl || "defaultImageUrl"}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    category={product.category}
                    rating={product.rating ?? 0}
                    reviews={
                      Array.isArray(product.reviews) ? product.reviews : []
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sm={3}>
          <CategoryFilter
            categories={categories}
            onFilter={handleFilter}
            onPriceChange={handlePriceChange}
            onColorChange={handleColorChange}
            onSizeChange={handleSizeChange}
            onDimensionChange={handleDimensionChange}
          />
        </Grid>
        {!isSmallScreen && (
          <Grid item xs={12} sm={9}>
            <Grid container>
              {paginatedProducts?.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <ProductCard
                    id={product._id}
                    brand={product.brand || "Default Brand"}
                    image={product.imageUrl || "defaultImageUrl"}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    category={product.category}
                    rating={product.rating ?? 0}
                    reviews={
                      Array.isArray(product.reviews) ? product.reviews : []
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Box
        display="flex"
        justifyContent={isSmallScreen ? "center" : "center"}
        sx={{ marginBottom: "10px" }}
        mt={4}
      >
        <Pagination
          count={Math.ceil((filteredProducts?.length || 0) / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              "&.Mui-selected": {
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                },
              },
            },
          }}
        />
      </Box>
      <AuthForm
        tab={tab}
        setTab={setTab}
        open={authModalOpen}
        setOpen={setAuthModalOpen}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#333",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
          },
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
};

export default Home;
