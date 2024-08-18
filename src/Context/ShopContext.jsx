import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  
  const fetchCartItems = () => {
    if (localStorage.getItem("auth-token")) {
      fetch(`${backend_url}/getcarttwo`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => setCartItems(data)); 
    }
  };

  useEffect(() => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetchCartItems(); 
  }, []);

 

  const getTotalCartAmount = () => {
      return cartItems.reduce((total, item) => {
        return total + (item.new_price * item.quantity);
      }, 0);
    };

 
    const getTotalCartItems = () => {
      return cartItems.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    };

  const addToCart = (itemId,size) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please Login");
      return;
    }
    if (localStorage.getItem("auth-token")) {
      fetch(`${backend_url}/addtocarttwo`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify({ "itemId": itemId,"size": size }),
      }).then(() => {
        fetchCartItems();});
    }
  };

  const removeFromCart = (itemId, size) => {
    fetch(`${backend_url}/removefromcarttwo`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'auth-token': `${localStorage.getItem("auth-token")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, size }),
    }).then(() => {
      fetchCartItems(); 
    });
  };
console.log("cartItems from ShopContext", cartItems)
  const contextValue = { products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount, fetchCartItems };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
