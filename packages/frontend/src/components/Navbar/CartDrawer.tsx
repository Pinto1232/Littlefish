import {
  Drawer,
  Box,
  Divider,
  List,
  IconButton,
  Typography,
  Grid,
  Button,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  useTheme,
  CloseIcon,
  AddIcon,
  RemoveIcon,
  useCart,
  DrawerContent,
  ItemContainer,
} from "./cartDrawerImports";
import { CartDrawerProps } from "./NavbarInterfaces";

const CartDrawer: React.FC<CartDrawerProps> = ({
  drawerOpen,
  toggleDrawer,
}) => {
  const { cart } = useCart();
  const theme = useTheme();

  const cartItems = cart.map((product) => ({
    ...product,
    id: String(product.id),
  }));

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      ModalProps={{ hideBackdrop: true }}
    >
      <DrawerContent role="presentation" theme={theme}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon
              sx={{ bgcolor: "#000", color: "#fff", borderRadius: "50%" }}
            />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            maxHeight: cart.length > 3 ? "calc(100% - 200px)" : "auto",
            overflowY: cart.length > 3 ? "scroll" : "visible",
            overflowX: "hidden",
            "&::-webkit-scrollbar": { width: "0.4em" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "transparent" },
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
          }}
        >
          <List>
            {cartItems.map((item) => (
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
              <Typography variant="body2">
                R
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
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
                    (acc, item) => acc + item.price * item.quantity,
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
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Confirm Order
          </Button>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
