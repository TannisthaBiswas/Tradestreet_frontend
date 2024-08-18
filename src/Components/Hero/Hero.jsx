import React from "react";
import "./Hero.css";
import Banner_image from "../Assets/Banner_image.png";
import Img3 from "../Assets/Img3.png";
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

        {/* <div className="hero-latest-btn" >
          <Link to="/" style={{ textDecoration: "none" }}>
          Explore More
        </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
