import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import { PersonalInfoProps } from "./MultiStepChekout.types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
  category: {
    name: string;
    description: string;
  };
  rating: number;
  reviews: number;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  handleNext,
  handleBack,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const calculateCartTotals = (cart: CartItem[]) => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryFee = subtotal * 0.1;
    const tax = subtotal * 0.15;
    const discount = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax - discount;
    return { deliveryFee, tax, discount, total };
  };

  const { deliveryFee, tax, discount, total } = calculateCartTotals(cart);

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ p: 4, bgcolor: "#f8f8f8", width: "100%" }}>
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h6" gutterBottom>
              <Box display="flex" alignItems="center">
                <PersonIcon /> Personal Information
              </Box>
            </Typography>
            <Box bgcolor={"#fff"} p={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    autoComplete="tel"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address Line 1"
                    fullWidth
                    autoComplete="address-line1"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address Line 2"
                    fullWidth
                    autoComplete="address-line2"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="address-level2"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="address-level1"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code"
                    fullWidth
                    autoComplete="postal-code"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="country"
                    variant="standard"
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1, bgcolor: "#000" }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            <Box display="flex" alignItems="center">
              <ShoppingCartIcon sx={{ mr: 1 }} /> Basket
            </Box>
          </Typography>
          <TableContainer component={Paper} sx={{ overflow: "hidden" }}>
            <Table>
              <TableBody>
                <Box
                  sx={{
                    bgcolor: "#efefef",
                    maxHeight: cart.length > 4 ? 200 : "auto",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            maxWidth: "30px",
                            maxHeight: "30px",
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            whiteSpace: "nowrap",
                          }}
                        >
                          R {item.price}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </Box>
              </TableBody>
            </Table>
            <Box p={3}>
              <Typography variant="body1">
                Delivery: R {deliveryFee.toFixed(2)}
              </Typography>
              <Typography variant="body1">Tax: R {tax.toFixed(2)}</Typography>
              <Typography variant="body1">
                Discount: R {discount.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Total: R {total.toFixed(2)}
              </Typography>
              <Box mt={2} display="flex">
                <TextField
                  variant="outlined"
                  placeholder="Use Coupon Code"
                  size="small"
                  style={{ marginRight: "8px" }}
                />
                <Button variant="contained" sx={{ bgcolor: "#000" }}>
                  APPLY
                </Button>
              </Box>
            </Box>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PersonalInfo;
