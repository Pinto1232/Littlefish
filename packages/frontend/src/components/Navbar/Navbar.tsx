import React, { useEffect, useState } from "react";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useCart } from "../../Context/useCart";

interface CartItem {
  id: string;
  image: string;
  name: string;
  brand: string;
  quantity: number;
  price: number;
}

interface NavbarProps {
  setTab: (tab: number) => void;
  setAuthModalOpen: (open: boolean) => void;
}

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

const Navbar: React.FC<NavbarProps> = ({ setTab, setAuthModalOpen }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { cart } = useCart();

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  const cartItems: CartItem[] = cart.map((product) => ({
    ...product,
    id: String(product.id),
  }));

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    setTab(0);
    setAuthModalOpen(true);
    handleClose();
  };

  const handleRegisterClick = () => {
    setTab(1);
    setAuthModalOpen(true);
    handleClose();
  };

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
                badgeContent={cart.length}
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
            <Avatar
              alt="User"
              src="https://via.placeholder.com/40"
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "&.MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLoginClick}>Login</MenuItem>
              <MenuItem onClick={handleRegisterClick}>Register</MenuItem>
            </Menu>
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
              maxHeight: cart.length > 3 ? "calc(100% - 200px)" : "auto",
              overflowY: cart.length > 3 ? "scroll" : "visible",
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
              {cartItems.map((item: CartItem) => (
                <ItemContainer
                  key={String((item as CartItem).id)}
                  theme={theme}
                >
                  <ListItem
                    style={{ paddingRight: 16 }}
                    ContainerProps={{
                      style: { display: "flex", alignItems: "center" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={(item as CartItem).image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={(item as CartItem).name}
                      secondary={(item as CartItem).brand}
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                    <ListItemSecondaryAction
                      style={{ position: "static", transform: "none" }}
                    >
                      <IconButton edge="end">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2" sx={{ mx: 1 }}>
                        {(item as CartItem).quantity}
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
                        R{(item as CartItem).price.toFixed(2)}
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
                <Typography variant="body2">
                  R
                  {cartItems
                    .reduce(
                      (acc: number, item: CartItem) =>
                        acc + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Shipping Fee:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body2">R0.0</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Total:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="h6">
                  R
                  {(
                    cartItems.reduce(
                      (acc: number, item: CartItem) =>
                        acc + item.price * item.quantity,
                      0
                    ) + 0.0
                  ).toFixed(2)}
                </Typography>
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
    </>
  );
};

export default Navbar;
