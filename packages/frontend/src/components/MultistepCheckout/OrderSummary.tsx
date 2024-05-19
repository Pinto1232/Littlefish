import React from "react";
import { Typography, Box, Button } from "@mui/material";

interface OrderSummaryProps {
  handleNext: () => void;
  handleBack: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  handleNext,
  handleBack,
}) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Summary
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

export default OrderSummary;
