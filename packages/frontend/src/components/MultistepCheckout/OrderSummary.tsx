import React from 'react';
import { Typography } from '@mui/material';

const OrderSummary: React.FC = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      {/* Add your order summary details here */}
    </React.Fragment>
  );
};

export default OrderSummary;
