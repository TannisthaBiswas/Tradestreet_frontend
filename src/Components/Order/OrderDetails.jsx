import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { backend_url, currency } from '../../App';
import './OrderDetails.css'; 
import { Stepper, Step, StepLabel } from '@mui/material';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${backend_url}/fetchorders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); 
    const intervalId = setInterval(fetchOrders, 5000); // Poll

    return () => clearInterval(intervalId); 
  }, []);

  const getStepIndex = (status) => {
    switch (status) {
      case 'Processing':
        return 0;
      case 'Shipped':
        return 1;
      case 'Delivered':
        return 2;
      case 'Cancelled':
        return 3;
      default:
        return 0;
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography className="error-message">{error}</Typography>;

  return (
    <Box className="order-details-container">
      <Typography className="order-details-title">Order Details</Typography>
      {orders.length === 0 ? (
        <Typography className="order-empty">No orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Paper key={order._id} className="order-paper">
            <Typography className="order-id">Order ID: {order._id}</Typography>
            <Typography className="order-info">Total Amount: {currency}{order.totalAmount.toFixed(2)}</Typography>
            <Typography className="order-info">Shipping Address: {order.shippingAddress}</Typography>
            <Typography className="order-info">Order Status: {order.orderStatus}</Typography>
            <Typography className="order-info">Payment Status: {order.paymentStatus}</Typography>
            {order.orderStatus !== 'Cancelled' ? (
              <Stepper activeStep={getStepIndex(order.orderStatus)} alternativeLabel>
                <Step><StepLabel>Processing</StepLabel></Step>
                <Step><StepLabel>Shipped</StepLabel></Step>
                <Step><StepLabel>Delivered</StepLabel></Step>
              </Stepper>
            ) : (
              <Typography className="cancelled-text">Cancelled</Typography>
            )}
            <Typography className="order-items">Items:</Typography>
            {order.items.map((item) => (
              <Box key={item.productId._id} className="order-item">
                <Typography className="order-item-details">Product Name: {item.name}</Typography>
                <Typography className="order-item-details">Quantity: {item.quantity}</Typography>
                <Typography className="order-item-details">Price: {currency}{item.new_price.toFixed(2)}</Typography>
                <Typography className="order-item-details">Size: {item.size}</Typography>
                <Typography className="order-item-details">Color: {item.colour}</Typography>
                <hr />
              </Box>
            ))}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default OrderDetails;
