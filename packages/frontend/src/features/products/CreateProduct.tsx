import React, { useState } from 'react';
import { useCreateProductMutation } from '../api/apiSlice';
import { TextField, Button, Box } from '@mui/material';

const CreateProduct: React.FC = () => {
  const [createProduct] = useCreateProductMutation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({ name, description, price: parseFloat(price) }).unwrap();
      setName('');
      setDescription('');
      setPrice('');
    } catch (err) {
      console.error('Failed to save the product: ', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Create Product
      </Button>
    </Box>
  );
};

export default CreateProduct;