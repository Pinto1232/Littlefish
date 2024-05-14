import React from 'react';
import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const JumbotronContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw', // Full viewport width
  height: '46vh',
  marginBottom: theme.spacing(10),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  color: '#fff',
  textAlign: 'center',
}));

const OverlayText = styled(Typography)(({ theme }) => ({
  fontSize: '10rem',
  fontWeight: 'bold',
  opacity: 0.1,
  [theme.breakpoints.down('sm')]: {
    fontSize: '5rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '3rem',
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(5),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  width: '100%',
  maxWidth: '600px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: theme.spacing(0.5),
  },
}));

interface JumbotronProps {
  backgroundImage: string;
}

const Jumbotron: React.FC<JumbotronProps> = ({ backgroundImage }) => {
  return (
    <JumbotronContainer style={{ backgroundImage: `url(${backgroundImage})` }}>
      <OverlayText variant="h1">Shop</OverlayText>
      <Typography variant="h4" component="h2" gutterBottom>
        Give All You Need
      </Typography>
      <SearchContainer>
        <TextField
          variant="outlined"
          placeholder="Search on Stuffsus"
          fullWidth
          sx={{
            marginBottom: { xs: 1, sm: 0 },
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              backgroundColor: '#f5f5f5',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: '#ccc',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3f51b5',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '50px',
            padding: '10px 20px',
            marginLeft: { sm: 1, xs: 0 },
            marginTop: { xs: 1, sm: 0 },
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Search
        </Button>
      </SearchContainer>
    </JumbotronContainer>
  );
};

export default Jumbotron;
