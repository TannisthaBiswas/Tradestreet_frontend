import React, { useState, useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const ProductDisplay = ({product}) => {

  const {addToCart} = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (sizeName) => {
    setSelectedSize(sizeName);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product.id, selectedSize);
    } else {
      alert("Please select a size before adding to cart.");
    }
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
       
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">{currency}{product.old_price}</div>
          <div className="productdisplay-right-price-new">{currency}{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
        {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
          {Array.isArray(product.sizes) && product.sizes.map((size) => (
              <div
                key={size.name}
                className={`size-option ${size.quantity <= 0 ? 'blurred' : ''} ${selectedSize === size.name ? 'selected' : ''}`}
                onClick={() => handleSizeClick(size.name)}
              >
                {size.name}
              </div>
            ))}
           
          </div>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> {product.category}</p>
        <p className="productdisplay-right-category"><span>Colour :</span> {product.colour}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
