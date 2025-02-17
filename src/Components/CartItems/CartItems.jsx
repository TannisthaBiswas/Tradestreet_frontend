import React, { useContext } from "react";
import "./CartItems.css";
import { useNavigate } from 'react-router-dom';
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const CartItems = () => {
  const { cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <div className="cartitems-format-main">
      <p className="cartitems-heading">Item</p>      
      <p className="cartitems-heading">Name</p>
        <p className="cartitems-heading">Size</p>
        <p className="cartitems-heading">Price</p>
        <p className="cartitems-heading">Quantity</p>
        <p className="cartitems-heading">Total Price</p>
        <p className="cartitems-heading">Delete</p>
      </div>
      <hr />
      
      {cartItems.map((item, index) => (
        <div key={index}>
          <div className="cartitems-format-main cartitems-format">
            <img
              className="cartitems-product-icon"
              src={item.image}
              
              alt="img"
            />
            <p className="cartitems-product-title">{item.name}</p>
            <p>{item.size}</p>
            <p>{currency}{item.new_price}</p>
            <button className="cartitems-quantity">{item.quantity}</button>
            <p>{currency}{item.new_price * item.quantity}</p>
            <img
              onClick={() => removeFromCart(item.productId, item.size)}
              className="cartitems-remove-icon"
              src={cross_icon}
              alt="Remove item"
            />
          </div>
          <hr />
        </div>
      ))}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{currency}{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
