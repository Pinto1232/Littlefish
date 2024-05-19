import React from 'react';
import { Container, CssBaseline, Box, Stepper, Step, StepLabel, Typography, Paper } from '@mui/material';
import PersonalInfo from './PersonalInfo';
import PaymentMethods from './PaymentMethods';
import OrderSummary from './OrderSummary';
import Footer from '../Footer/Footer';

const steps = ['Personal Info', 'Payment Methods', 'Order Summary'];

const MultistepCheckout: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfo handleNext={handleNext} handleBack={handleBack} />;
      case 1:
        return <PaymentMethods />;
      case 2:
        return <OrderSummary />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <>
    <Container component="main" maxWidth="md" >
      <CssBaseline />
      <Box sx={{ marginTop: 4, marginBottom: 4 }} >
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        <Paper elevation={0} sx={{ padding: 3 }}>
          <Stepper activeStep={activeStep} sx={{ padding: 3, marginBottom: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(activeStep)}
        </Paper>
      </Box>
    </Container>
       <Footer />
    </>
  );
};

export default MultistepCheckout;