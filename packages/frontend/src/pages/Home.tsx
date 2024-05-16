import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import { useGetProductsQuery } from "../features/api/apiSlice";
import ProductCard from "../components/ProductCard/ProductCard";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Navbar from "../components/Navbar/Navbar";
import GlobalStyle from "../GlobalStyle/GlobalStyle";
import AuthForm from "../components/AuthForm/AuthForm";

const Home: React.FC = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const itemsPerPage = 4;

  if (isLoading) {
    return <CircularProgress />;
  }

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
  const paginatedProducts = products?.slice(startIndex, endIndex);

  return (
    <>
      <GlobalStyle />
      <Navbar setTab={setTab} setAuthModalOpen={setAuthModalOpen} />
      <Jumbotron backgroundImage="https://wallpapers.com/images/hd/shop-background-2y3skz5z6mp0qca3.jpg" />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {paginatedProducts?.map((product) => (
          <Grid item key={product._id}>
            <ProductCard
              id={product._id}
              brand={product.brand || "Default Brand"}
              image={product.imageUrl || "defaultImageUrl"}
              name={product.name}
              description={product.description}
              price={product.price.toString()}
              category={product.category}
              rating={product.rating}
              reviews={product.reviews}
            />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil((products?.length || 0) / itemsPerPage)}
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
    </>
  );
};

export default Home;
