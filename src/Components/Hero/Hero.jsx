import React from "react";
import "./Hero.css";
import Img7 from "../Assets/Img7.png";

const Hero = () => {
  // const handleButtonClick = () => {
  //   window.location.href = "/newcollections"; // Update the URL to the desired destination
  // };

  return (
    <div className="hero" style={{ backgroundImage: `url(${Img7})` }}>
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-hand-icon">
             </div>
        </div>

        
      </div>
    </div>
  );
};

export default Hero;
