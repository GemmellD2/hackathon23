// Navbar.js

import React from 'react';
import '../App.css'; // Import your CSS file for styling
import Logo from '../secondary.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"></div>
      <ul className="nav-links">
        <li><a href="/"><img src={Logo} alt='gtrgtr' ></img></a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/orders">Orders</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
