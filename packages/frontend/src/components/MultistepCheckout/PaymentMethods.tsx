import React from "react";
import { Typography, Box, Button } from "@mui/material";

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
        Payment Methods
      </Typography>
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
    </React.Fragment>
  );
};

export default PaymentMethods;
