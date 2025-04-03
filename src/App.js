import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Components/Order/OrderConfirmation";
import Orders from "./Pages/Orders";

export const admin_url = 'http://localhost:3001';
//'https://tradestreet-admin.onrender.com';
//
export const backend_url = 'http://localhost:4000';
//
//'https://tradestreet-backend.onrender.com';
export const currency = '₹';

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/mens" element={<ShopCategory  category="men" />} />
          <Route path="/womens" element={<ShopCategory  category="women" />} />
          <Route path="/kids" element={<ShopCategory  category="kid" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/login" element={<LoginSignup/>} />
          <Route path="/orderconfirmation" element={<OrderConfirmation />} />
          
          <Route path="/orders" element={<Orders/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
