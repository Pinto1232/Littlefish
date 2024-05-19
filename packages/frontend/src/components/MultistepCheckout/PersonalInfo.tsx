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

const PersonalInfoForm: React.FC = () => (
  <Box bgcolor={"#fff"} p={5}>
    <Grid container spacing={2}>
      {[
        { id: "firstName", label: "First Name", autoComplete: "given-name" },
        { id: "lastName", label: "Last Name", autoComplete: "family-name" },
        { id: "email", label: "Email", autoComplete: "email" },
        { id: "phone", label: "Phone Number", autoComplete: "tel" },
        { id: "address1", label: "Address Line 1", autoComplete: "address-line1" },
        { id: "address2", label: "Address Line 2", autoComplete: "address-line2" },
        { id: "city", label: "City", autoComplete: "address-level2" },
        { id: "state", label: "State/Province/Region", autoComplete: "address-level1" },
        { id: "postalCode", label: "Postal Code", autoComplete: "postal-code" },
        { id: "country", label: "Country", autoComplete: "country" },
      ].map((field, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <TextField
            required
            id={field.id}
            name={field.id}
            label={field.label}
            fullWidth
            autoComplete={field.autoComplete}
            variant="standard"
            margin="normal"
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

const CartSummary: React.FC<{ cart: CartItem[] }> = ({ cart }) => {
  const calculateCartTotals = (cart: CartItem[]) => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = subtotal * 0.1;
    const tax = subtotal * 0.15;
    const discount = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax - discount;
    return { deliveryFee, tax, discount, total };
  };

  const { deliveryFee, tax, discount, total } = calculateCartTotals(cart);

  return (
    <Box p={3} component={Paper}>
      <Typography variant="body1">Delivery: R {deliveryFee.toFixed(2)}</Typography>
      <Typography variant="body1">Tax: R {tax.toFixed(2)}</Typography>
      <Typography variant="body1">Discount: R {discount.toFixed(2)}</Typography>
      <Typography variant="body1"> Total: R {total.toFixed(2)}</Typography>
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
  );
};

const CartTable: React.FC<{ cart: CartItem[] }> = ({ cart }) => (
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
  </TableContainer>
);

const PersonalInfo: React.FC<PersonalInfoProps> = ({ handleNext, handleBack }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ p: 4, bgcolor: "#f8f8f8", width: "100%" }}>
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h6" gutterBottom>
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ mr: 1, color: "blue" }} /> Personal Information
              </Box>
            </Typography>
            <PersonalInfoForm />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                {/* Back */}
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
              <ShoppingCartIcon sx={{ mr: 1, color: "blue" }} /> Basket
            </Box>
          </Typography>
          <CartTable cart={cart} />
          <CartSummary cart={cart} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const MemoizedPersonalInfo = React.memo(PersonalInfo);
export default MemoizedPersonalInfo;