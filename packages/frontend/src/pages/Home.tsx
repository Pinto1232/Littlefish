import React from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import { useGetProductsQuery } from "../features/api/apiSlice";
import ProductCard from "../components/ProductCard/ProductCard";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import GlobalStyle from "../GlobalStyle/GlobalStyle";

const Home: React.FC = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error fetching products</Typography>;
  }

  return (
    <>
    <GlobalStyle /> 
      <Jumbotron backgroundImage="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/2560px-Fronalpstock_big.jpg" />
      <Grid 
        container 
        spacing={2} 
        justifyContent="center" 
        alignItems="center"
      >
        {products?.map((product) => (
          <Grid item key={product._id}>
            <ProductCard
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
    </>
  );
};

export default Home;
