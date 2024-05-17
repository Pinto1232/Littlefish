import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

const PersonalInfo: React.FC = () => {
  const cartData: CartItem[] = [
    {
      id: 1,
      name: "Example Item",
      quantity: 2,
      price: 19.99,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Example Item",
      quantity: 23,
      price: 19.99,
      image: "https://via.placeholder.com/100",
    },

    {
      id: 3,
      name: "Example Item",
      quantity: 3,
      price: 19.99,
      image: "https://via.placeholder.com/100",
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ p: 4 }}>
        <Grid item xs={12} md={7} spacing={3}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Personal Info
          </Typography>
          <Grid container sx={{ m: 1 }}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="fullName"
                      name="fullName"
                      label="Full Name"
                      fullWidth
                      autoComplete="name"
                      variant="filled"
                   
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
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address"
                      name="address"
                      label="Street Address"
                      fullWidth
                      autoComplete="shipping address-line1"
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="City"
                      fullWidth
                      autoComplete="shipping address-level2"
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="state"
                      name="state"
                      label="State/Province"
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="zip"
                      name="zip"
                      label="Zip / Postal code"
                      fullWidth
                      autoComplete="shipping postal-code"
                      variant="filled"
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
                      variant="filled"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Basket Section */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            Basket
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Prod</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <img
                        src={row.image}
                        alt={row.name}
                        style={{ maxWidth: "30px", maxHeight: "30px" }}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PersonalInfo;
