import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo-blue.png';

function Navbar() {

  const navigate = useNavigate();

  return (
    <nav className="navbar">
        <div className='nav-logo'>
            <img src={logo} onClick={() => navigate("/")}/>
            <h1 onClick={() => navigate("/")}>PLANSTACK</h1>
        </div>
        <div className='nav-links'>
            <ul>
                <li>Products</li>
                <li>Soultions</li>
                <li>Why Us</li>
                <li>Contact</li>
                <li>More</li>
            </ul>
        </div>
        <div className='nav-profile'>
            <div className="auth-buttons">
            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
            <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
