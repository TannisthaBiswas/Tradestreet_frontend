import React, { useState, useContext } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";
import { currency } from "../../App";
//backend_url,
const ProductDisplay = ({ product }) => {


  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const { addToCart } = useContext(ShopContext);
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
        <div className="productdisplay-img">
        {product.images.length > 1 && (<button onClick={prevImage} className="carousel-button">❮</button>)}
          <img
            src={
              product.images[currentIndex].url instanceof File
                ? URL.createObjectURL(product.images[currentIndex].url)
                : product.images[currentIndex].url
            }
            alt={`Product ${currentIndex + 1}`}
            className="productdisplay-main-img"
          />
          {product.images.length > 1 && (<button onClick={nextImage} className="carousel-button">❯</button>)}
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
