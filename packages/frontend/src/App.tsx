import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import ProductList from "./features/products/ProductList";
import { CartProvider } from "./Context/CartContext";
import MultistepCheckout from "./components/MultistepCheckout/MultistepCheckout";
import DashboardLayout from "./components/DashboardDrawer/DashboardLayout";

const theme = createTheme();

const AppContent: React.FC = () => {
  return (
    <>
      <Grid item xs={12}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/checkout" element={<MultistepCheckout />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
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

const MemoizedApp = React.memo(App);
export default MemoizedApp;


