import React from 'react';
import { Container, Grid } from '@mui/material';
import ProductList from './features/products/ProductList';


const App: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
          <ProductList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;