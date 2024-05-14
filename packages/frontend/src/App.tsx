import React from "react";
import { Container, Grid, ThemeProvider, createTheme } from "@mui/material";
import ProductList from "./features/products/ProductList";
import SearchBar from "./components/SearchComponent/SearchBar";

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
          <Grid item xs={12}>
            <ProductList />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;