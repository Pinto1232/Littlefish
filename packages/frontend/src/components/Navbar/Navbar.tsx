import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';


const NavbarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#000', 
  color: '#fff', 
  boxShadow: 'none',
  padding: theme.spacing(1, 2),
  backgroundImage: 'unset',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const Navbar: React.FC = () => {
  return (
    <NavbarContainer position="sticky" sx={{ top: 0, zIndex: 1100 }}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <img src="" alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
          <Typography variant="h6" component="div">
            Stuffsus
          </Typography>
        </Box>
        <NavLinks>
          <Typography variant="body1">Beranda</Typography>
          <Typography variant="body1">Shop</Typography>
          <Typography variant="body1">Blog</Typography>
        </NavLinks>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <SearchIcon  sx={{ color: 'white' }}/>
          </IconButton>
          <IconButton>
            <ShoppingCartIcon  sx={{ color: 'white' }} />
          </IconButton>
          <Avatar alt="User" src="https://via.placeholder.com/40" />
        </Box>
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
