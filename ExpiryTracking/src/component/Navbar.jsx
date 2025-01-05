import React, { useState } from "react";
import "../styles/navbar.css";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const [open, SetOpen] = useState(false);

  const Toggle = () => {
    if (open) {
      SetOpen(false);
    } else {
      SetOpen(true);
    }
  };

  return (
    <nav className="navbar">
      <a href="#" className="logo">
        Veriprod
      </a>
      <button
        className="menu-toggle"
        aria-label="Toggle navigation"
        onClick={Toggle}
      >
        {open ? <IoCloseSharp /> : <FaBarsStaggered />}
      </button>     
      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/addproduct">Add Product</a>
        </li>
        <li>
          <a href="/Login">Login</a>
        </li>
        <li>
          <a href="/SignUp">Sign Up</a>
        </li>
        <li>
          <img src="https://cdn-icons-png.flaticon.com/512/219/219969.png" className="profileImageNav" alt="Profile Image"/>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
