import { React, useContext} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contex/AuthContext';

function Navbar() {

  const navigate = useNavigate();
  const { user, token, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

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
            <button className="login-btn" onClick={() => { token ? navigate(`/profile/${user.id}`) : navigate("/login")}}>{token ? "Profile" : "Login"}</button>
            <button className="register-btn" onClick={() => { token ? handleLogout() : navigate("/register")}}>{token ? "Logout" : "Register"}</button>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
