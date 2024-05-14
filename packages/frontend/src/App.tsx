import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Container, Grid, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import ProductList from "./features/products/ProductList";
import SearchBar from "./components/SearchComponent/SearchBar";

const theme = createTheme();

const AppContent: React.FC = () => {
  const location = useLocation();

  return location.pathname === "/" ? (
    <Home />
  ) : (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
        <Grid item xs={12} >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;