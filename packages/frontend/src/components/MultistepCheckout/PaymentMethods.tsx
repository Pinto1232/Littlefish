import React from "react";
import {
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

interface PaymentMethodsProps {
  handleNext: () => void;
  handleBack: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  handleNext,
  handleBack,
}) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Pay by card
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Amount
              </Typography>
              <RadioGroup>
                <FormControlLabel
                  value="enterAmount"
                  control={<Radio />}
                  label={
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                    >
                      Enter amount
                      <TextField
                        variant="standard"
                        size="small"
                        defaultValue="R0.00"
                        inputProps={{ "aria-label": "Enter amount" }}
                        sx={{
                          ml: 2,
                          flex: 1,
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ccc",
                            },
                            "&:hover fieldset": {
                              borderColor: "#000",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#000",
                            },
                          },
                          "& .MuiInputBase-input": {
                            padding: "10px 12px",
                          },
                        }}
                      />
                    </Box>
                  }
                />
                <FormControlLabel
                  value="unpaidBalance"
                  control={<Radio />}
                  label={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                      mr={2}
                    >
                      Unpaid balance
                      <Typography>R435.00</Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Payment method
              </Typography>
              <RadioGroup defaultValue="card1">
                <FormControlLabel
                  value="card1"
                  control={<Radio />}
                  label={
                    <Box
                      display="flex"
                      justifyContent="space-around"
                      width="100%"
                    >
                      <Box whiteSpace={"nowrap"} mr={10} fontSize={13}>
                        Ending in: ...8845
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          fontSize={13}
                        >
                          Last used: Thu, Mar 18 2021
                        </Typography>
                      </Box>
                      <FaCcVisa size={34} color="red" />
                    </Box>
                  }
                />
                <FormControlLabel
                  value="card2"
                  control={<Radio />}
                  label={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Box whiteSpace={"nowrap"} mr={18} fontSize={13}>
                        Ending in: ...7172
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          whiteSpace={"nowrap"}
                          fontSize={13}
                        >
                          Never used
                        </Typography>
                      </Box>
                      <FaCcMastercard size={34} color="blue" />
                    </Box>
                  }
                />
              </RadioGroup>
              <Button
                variant="outlined"
                sx={{ mt: 2, ":hover": { bgcolor: "#f0f0f0", color: "#000" } }}
              >
                Add new card
              </Button>

              <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                Reference
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Optionally, add a reference note"
                inputProps={{ "aria-label": "Reference note" }}
                sx={{
                  mt: 2,
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px 14px",
                  },
                }}
              />

              <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
  Payment total
</Typography>
                <Typography variant="subtitle1">R435.00</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          onClick={handleBack}
          sx={{ mt: 3, ml: 1, ":hover": { bgcolor: "#f0f0f0" } }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            mt: 3,
            ml: 1,
            bgcolor: "#000",
            ":hover": { bgcolor: "#115293" },
          }}
        >
          Pay
        </Button>
      </Box>
    </React.Fragment>
  );
};

const MemoizedPaymentMethods = React.memo(PaymentMethods);
export default MemoizedPaymentMethods;
