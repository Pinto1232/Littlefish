import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import {  Grid, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import ProductList from "./features/products/ProductList";
import SearchBar from "./components/SearchComponent/SearchBar";
import { CartProvider } from "./Context/CartContext";
import MultistepCheckout from "./components/MultistepCheckout/MultistepCheckout";

const theme = createTheme();

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname!== "/" && location.pathname!== "/checkout" && (
        <Grid item sx={{ marginBottom: 4}} xs={12}>
          <SearchBar />
        </Grid>
      )}
      <Grid item xs={12}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/checkout" element={<MultistepCheckout />} />
        </Routes>
      </Grid>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <CartProvider>
        <AppContent />
        </CartProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;