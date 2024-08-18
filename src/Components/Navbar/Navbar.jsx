import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import cart_icon from '../Assets/cart_icon.png'

import icon from '../Assets/icon.png'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

import { Menu, MenuItem, IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {

  let [menu,setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const [anchorEl, setAnchorEl] = useState(null); 
const open = Boolean(anchorEl); 

const handleClick = (event) => { 
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className='nav'>
      <Link to='/' onClick={()=>{setMenu("shop")}} style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={icon}  alt="logo" />
        <p class>TRADESTREET</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{ textDecoration: 'none' }}>Home</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
        :<Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
        <Link to="/cart"><img src={cart_icon} alt="cart"/></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
      <IconButton
  aria-controls="user-menu"
  aria-haspopup="true"
  onClick={handleClick}
  color="inherit"
>
  <AccountCircleIcon />
</IconButton>
<Menu
  id="user-menu"
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
>
  <MenuItem component={Link} to="/orders" onClick={handleClose}>My Orders</MenuItem>
  
</Menu>
    </div>
  )
}

export default Navbar
