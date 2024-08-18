import React, { useEffect, useState } from "react";
import {  useNavigate, useLocation } from "react-router-dom";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";
import { backend_url } from "../App";



const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [sortOption, setSortOption] = useState("");
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [availabilityFilter, setAvailabilityFilter] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();
  const location = useLocation();

  // Parse URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSortOption(params.get("sort") || "");
    setColorFilter(params.get("colors") ? params.get("colors").split(",") : []);
    setSizeFilter(params.get("size") || "");
    setPriceRange(params.get("priceRange") ? params.get("priceRange").split("-").map(Number) : [0, 10000]);
    setAvailabilityFilter(params.get("available") !== "false");
    setCurrentPage(params.get("page") ? parseInt(params.get("page")) : 1);
    setSearchQuery(params.get("search") || ""); 
  }, [location.search]);

  const fetchInfo = () => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const updateURLParams = (params) => {
    const newParams = new URLSearchParams({
      sort: sortOption,
      colors: colorFilter.join(","),
      size: sizeFilter,
      priceRange: priceRange.join("-"),
      available: availabilityFilter,
      page: currentPage,  
      search: searchQuery,
      ...params,
    });

    navigate({
      pathname: location.pathname,
      search: newParams.toString(),
    });
  };

  const filteredProducts = allproducts
    .filter((item) => item.category === props.category)
    .filter((item) => colorFilter.length === 0 || colorFilter.includes(item.colour))
    .filter((item) => sizeFilter === "" || item.sizes.some((size) => size.name === sizeFilter && size.quantity > 0))
    .filter((item) => item.new_price >= priceRange[0] && item.new_price <= priceRange[1])
    .filter((item) => item.available === availabilityFilter)
    .filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return a.new_price - b.new_price;
    } else if (sortOption === "highToLow") {
      return b.new_price - a.new_price;
    } else {
      return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(sortedProducts.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
      updateURLParams({ page: currentPage + 1 });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      updateURLParams({ page: currentPage - 1 });
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    updateURLParams({ search: event.target.value, page: 1 });
  };
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
    updateURLParams({ sort: event.target.value, page: 1 });
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    const newColorFilter = colorFilter.includes(color)
      ? colorFilter.filter((c) => c !== color)
      : [...colorFilter, color];

    setColorFilter(newColorFilter);
    setCurrentPage(1);
    updateURLParams({ colors: newColorFilter.join(","), page: 1 });
  };

  const handleSizeChange = (event) => {
    setSizeFilter(event.target.value);
    setCurrentPage(1);
    updateURLParams({ size: event.target.value, page: 1 });
  };

  const handlePriceRangeChange = (event) => {
    const [min, max] = event.target.value.split("-").map(Number);
    setPriceRange([min, max]);
    setCurrentPage(1);
    updateURLParams({ priceRange: [min, max].join("-"), page: 1 });
  };

  const handleAvailabilityChange = (event) => {
    setAvailabilityFilter(event.target.checked);
    setCurrentPage(1);
    updateURLParams({ available: event.target.checked, page: 1 });
  };

  return (
    <div className="shopcategory">
      <div>
      <input 
        type="text" 
        placeholder="Search products" 
        value={searchQuery} 
        onChange={handleSearchChange} 
        className="shopcategory-search" 
      />
        </div>
      <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? "Hide Filters" : "Filters"}
      </button>
      {showFilters && (
        <div className="shopcategory-filters">
          <div className="filter-section">
            <p>Color</p>
            {["Red", "Blue", "Green", "Yellow", "Black", "White", "Orange", "Pink", "Purple"].map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  value={color.toLowerCase()}
                  checked={colorFilter.includes(color.toLowerCase())}
                  onChange={handleColorChange}
                />
                {color}
              </label>
            ))}
          </div>
          <div className="filter-section">
            <p>Size</p>
            <select onChange={handleSizeChange} value={sizeFilter}>
              <option value="">All Sizes</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          <div className="filter-section">
            <p>Price Range</p>
            <select onChange={handlePriceRangeChange} value={priceRange.join("-")}>
              <option value="0-10000">All Prices</option>
              <option value="0-500">Under ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="1000-2000">₹1000 - ₹2000</option>
              <option value="2000-10000">Over ₹2000</option>
            </select>
          </div>
          <div className="filter-section">
            <p>Availability</p>
            <label>
              <input type="checkbox" checked={availabilityFilter} onChange={handleAvailabilityChange} />
              Available
            </label>
          </div>
        </div>
      )}

      <div className="shopcategory-indexSort">
        <p>
          <span>
            Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedProducts.length)}
          </span>{" "}
          out of {sortedProducts.length} Products
        </p>
        <div className="shopcategory-sort">
          <p>Sort </p>
          <select onChange={handleSortChange} value={sortOption}>
            <option value="">Most Popular</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {currentItems.map((item) => (
          <Item id={item.id} key={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      <div className="shopcategory-pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(sortedProducts.length / itemsPerPage)}>
          Next
        </button>
      </div>
      
    </div>
  );
};

export default ShopCategory;
