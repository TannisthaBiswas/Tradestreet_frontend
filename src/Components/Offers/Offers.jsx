import React from "react";
import "./Offers.css";
import Img7 from "../Assets/Img7.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Free Shipping!</h1>
        <p>Platform wide</p>
      </div>
      <div className="offers-right">
        <img src={Img7} alt="" />
      </div>
    </div>
  );
};

export default Offers;
