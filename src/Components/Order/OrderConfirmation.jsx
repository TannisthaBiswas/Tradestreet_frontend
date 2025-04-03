import React, { useContext, useEffect, useState } from 'react';
import { Typography, Paper, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { backend_url } from '../../App';
import { ShopContext } from '../../Context/ShopContext';



const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
const { fetchCartItems } = useContext(ShopContext);


  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        if (sessionId) {
          const response = await fetch(`${backend_url}/payment-success?session_id=${sessionId}`, {
            method: 'GET',
          });
          
          
          const data = await response.json();

          if (response.ok && data.success) {
            fetchCartItems();
          } else {
            console.error('Payment success failed:', data.message);
          }
        }
      } catch (error) {
        console.error('Payment success handling failed', error);
      } finally {
        setLoading(false);
      }
    };

    handlePaymentSuccess();
  }, [sessionId, fetchCartItems]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }



  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 500, mx: 'auto', mt: 8 }}>
     
        <>
          <Box mb={2}>
            <img
              src="https://www.svgrepo.com/show/423679/store-verified-shopping.svg"
              alt="Order Confirmation"
              style={{ width: '100px' }}
            />
          </Box>
          <Typography variant="h4" gutterBottom>
            Thank You for Your Order!
          </Typography>
          <Typography variant="body1" mb={2}>
            Your order has been placed successfully.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </>
      
       
      
    </Paper>
  );
};

export default OrderConfirmation;
