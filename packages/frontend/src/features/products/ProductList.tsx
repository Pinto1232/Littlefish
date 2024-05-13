import React from 'react';
import { useGetProductsQuery } from '../api/apiSlice';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';

const ProductList: React.FC = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <List>
      {products?.map((product) => (
        <ListItem key={product.id}>
          <ListItemText primary={product.name} secondary={product.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;