import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Button,
  Divider,
  Grid,
  Paper,
  Badge,
} from "@mui/material";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Theme, useTheme } from "@mui/material/styles";

type Item = {
  id: number;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
};

const NavbarContainer = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
  boxShadow: "none",
  padding: theme.spacing(1, 2),
  backgroundImage: "unset",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const OverlayBackground = styled(Box)(({ theme }: { theme: Theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: theme.zIndex.drawer - 1,
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 350,
  padding: theme.spacing(2),
  background: "linear-gradient(135deg, #f5f5f5 30%, #e0e0e0 100%)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius,
}));

const CloseButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

const ItemContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [items] = useState<Item[]>([
    {
      id: 1,
      name: "Product 1",
      brand: "Brand A",
      image: "https://example.com/product1.jpg",
      quantity: 2,
      price: 19.99,
    },
    {
      id: 2,
      name: "Product 2",
      brand: "Brand B",
      image: "https://example.com/product2.jpg",
      quantity: 1,
      price: 24.99,
    },

    {
      id: 3,
      name: "Product 3",
      brand: "Brand B",
      image: "https://example.com/product2.jpg",
      quantity: 1,
      price: 54.99,
    },
    // Add more sample items as needed
  ]);
  const theme = useTheme();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <>
      <NavbarContainer
        position="sticky"
        sx={{ top: 0, zIndex: 1100 }}
        theme={theme}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img
              src=""
              alt="Logo"
              style={{ height: "40px", marginRight: "16px" }}
            />
            <Typography variant="h6" component="div">
              Stuffsus
            </Typography>
          </Box>
          <NavLinks theme={theme}>
            <Typography variant="body1">Beranda</Typography>
            <Typography variant="body1">Shop</Typography>
            <Typography variant="body1">Blog</Typography>
          </NavLinks>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={toggleDrawer(true)}>
              <Badge
                badgeContent={4}
                color="secondary"
                sx={{
                  "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "red",
                  },
                }}
              >
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
            <Avatar alt="User" src="https://via.placeholder.com/40" />
          </Box>
        </Toolbar>
      </NavbarContainer>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          hideBackdrop: true,
        }}
      >
        <DrawerContent role="presentation" theme={theme}>
          <CloseButtonContainer>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon
                sx={{ bgcolor: "#000", color: "#fff", borderRadius: "50%" }}
              />
            </IconButton>
          </CloseButtonContainer>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              maxHeight: items.length > 3 ? "calc(100% - 200px)" : "auto",
              overflowY: items.length > 3 ? "scroll" : "visible",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent",
              },
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
            }}
          >
            <List>
              {items.map((item) => (
                <ItemContainer key={item.id} theme={theme}>
                  <ListItem
                    style={{ paddingRight: 16 }}
                    ContainerProps={{
                      style: { display: "flex", alignItems: "center" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={item.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={item.brand}
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    />

                    <ListItemSecondaryAction
                      style={{ position: "static", transform: "none" }}
                    >
                      <IconButton edge="end">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2" sx={{ mx: 1 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton edge="end">
                        <AddIcon />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{
                          ml: 2,
                          bgcolor: "#000",
                          color: "#fff",
                          px: 1,
                          py: 0.4,
                          fontSize: 10,
                        }}
                      >
                        R{item.price.toFixed(2)}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                </ItemContainer>
              ))}
            </List>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">Subtotal:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body2">R100.01</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Shipping Fee:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body2">R9.99</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Total:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="h6">R110.07</Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#000",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Confirm Order
            </Button>
          </Box>
        </DrawerContent>
      </Drawer>
      {drawerOpen && <OverlayBackground theme={theme} />}
      {drawerOpen && <OverlayBackground theme={theme} />}
    </>
  );
};

export default Navbar;
