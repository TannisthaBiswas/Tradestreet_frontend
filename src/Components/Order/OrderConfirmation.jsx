import React, { useEffect } from 'react';
import { Typography,  Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); 
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
       <img
        src="https://www.svgrepo.com/show/423679/store-verified-shopping.svg"
        alt="Order Confirmation"
        style={{ width: '100px', marginBottom: '20px' }} 
      /><Typography variant="h4">Thank You for Your Order!</Typography>
      <Typography variant="body1">Your order has been placed successfully.</Typography>
      <Typography variant="body2">You will be redirected to the home page shortly.</Typography>
    </Paper>
  );
};

export default OrderConfirmation;
