// Navbar.js

import React from 'react';
import '../App.css'; // Import your CSS file for styling
import Logo from '../secondary.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"></div>
      <ul className="nav-links">
        <li><a href="home.component.js"><img src={Logo} ></img></a></li>
        <li><a href="products.component.js">Products</a></li>
        <li><a href="orders.component.js">Orders</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
