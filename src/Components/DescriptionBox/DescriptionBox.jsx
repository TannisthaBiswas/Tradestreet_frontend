import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">About the product</div>
        {/* <div className="descriptionbox-nav-box fade">Reviews</div> */}
      </div>
      <div className="descriptionbox-description">
        <p>All our products are ethically sourced and crafted with care, 
          ensuring sustainable practices throughout our supply chain. 
          We are committed to making a positive impact on both the environment 
          and the communities we work with.By choosing our products, 
          you support a company dedicated to responsible sourcing and the
           well-being of people and the planet. We believe that ethical business 
           is not just a choice, but a responsibility.</p>

              </div>
    </div>
  );
};

export default DescriptionBox;
