import React, { useState, useContext } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Typography, Paper, Box,MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { backend_url, currency } from "../App";
import "./CSS/Checkout.css";

const steps = [
  'Delivery Address',
  'Order Summary',
  'Payment',
  'Order Confirmation',
];

const Checkout = () => {

  const [paymentMethod, setPaymentMethod] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const navigate = useNavigate();
  const { cartItems, getTotalCartAmount, fetchCartItems } = useContext(ShopContext);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      //handlePlaceOrder();
      console.log("handle place order");
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  // Handle going back to the previous step
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleCheckout = async() => {
    const token = localStorage.getItem('auth-token');
  
    if (token) {
      const shippingAddress = `${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`;
  

      if (paymentMethod === "cod") {
        fetch(`${backend_url}/placeorder`, {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
          body: JSON.stringify({
            shippingAddress: shippingAddress,
          }),
        })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            console.log('Checkout successful:', result.order);
            fetchCartItems();
            navigate('/orderconfirmation'); 
          } else {
            alert('Checkout failed: ' + result.message);
            setMessage(`Checkout failed: ${result.message}`); 
          }
        })
        .catch((error) => {
          console.error('Error during checkout:', error);
          alert('An error occurred during checkout.');
          setMessage('An error occurred during checkout.'); 
        });
      }

      if (paymentMethod === "online") {  fetch(`${backend_url}/create-checkout-session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        body: JSON.stringify({
            shippingAddress,
            paymentMethod: "Online",
        }),
    })
        .then((res) => res.json())
        .then((session) => {
            if (session.url) {
                window.location.href = session.url; // Redirect to Stripe checkout page
            
              } else {
                alert('Failed to initiate online payment.');
            }
        })
        .catch((error) => {
            console.error("Stripe Checkout error:", error);
            alert("Error initiating payment.");
        });
      }
      
    } else {
      alert('User not authenticated.');
      setMessage('User not authenticated.'); 
    }
  };
  
  const [message, setMessage] = useState(''); 

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Delivery Address</Typography>
            <TextField
              name="street"
              label="Street Address"
              placeholder="123 Main St, Apt 4B"
              fullWidth
              margin="normal"
              variant="outlined"
              value={address.street}
              onChange={handleAddressChange}
            />
            <TextField
              name="city"
              label="City"
              placeholder="New York"
              fullWidth
              margin="normal"
              variant="outlined"
              value={address.city}
              onChange={handleAddressChange}
            />
            <TextField
              name="state"
              label="State/Province"
              placeholder="NY"
              fullWidth
              margin="normal"
              variant="outlined"
              value={address.state}
              onChange={handleAddressChange}
            />
            <TextField
              name="postalCode"
              label="Postal Code"
              placeholder="10001"
              fullWidth
              margin="normal"
              variant="outlined"
              value={address.postalCode}
              onChange={handleAddressChange}
            />
            <TextField
              name="country"
              label="Country"
              placeholder="United States"
              fullWidth
              margin="normal"
              variant="outlined"
              value={address.country}
              onChange={handleAddressChange}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Paper elevation={3} sx={{ padding: 3 }}>
              {cartItems.length === 0 ? (
                <Typography>No items in the cart.</Typography>
              ) : (
                cartItems.map((item, index) => (
                  <Box key={index} sx={{ marginBottom: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        className="cartitems-product-icon"
                        src={item.image}
                        alt="Product"
                        style={{ width: 80, height: 80, marginRight: 16 }}
                      />
                      <Box>
                        <Typography variant="body1">{item.name}</Typography>
                        <Typography variant="body2">{item.size}</Typography>
                        <Typography variant="body2">{currency}{item.new_price}</Typography>
                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                        <Typography variant="body2">
                          Total: {currency}{item.new_price * item.quantity}
                        </Typography>
                      </Box>
                    </Box>
                    <hr />
                  </Box>
                ))
              )}
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Cart Totals</Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1">Subtotal: {currency}{getTotalCartAmount()}</Typography>
                  <Typography variant="body1">Shipping Fee: Free</Typography>
                  <Typography variant="h6">Total: {currency}{getTotalCartAmount()}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">Payment</Typography>
            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
        <InputLabel>Select Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          label="Select Payment Method"
        >
          <MenuItem value="cod">Cash on Delivery (COD)</MenuItem>
          <MenuItem value="online">Online Payment</MenuItem>
        </Select>
      </FormControl>
            
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6">Order Confirmation</Typography>
            <Typography>Confirm your order</Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Paper elevation={3} className="checkout-container">
      <Stepper activeStep={activeStep} alternativeLabel className="checkout-stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box className="checkout-content">
        {renderStepContent(activeStep)}
        <Box className="checkout-buttons">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={activeStep === steps.length - 1 ? handleCheckout : handleNext}
          >
            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
          </Button>
        </Box>
        {message && <Typography className="checkout-message">{message}</Typography>}
      </Box>
    </Paper>
  );
};

export default Checkout;
