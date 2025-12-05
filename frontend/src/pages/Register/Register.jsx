import React from 'react';
import './Register.css'
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  return (
    <div className="register-container">
      <form className="register-form">
        <h2>Register</h2>

        <label>Username</label>
        <input type="text" placeholder="Enter username" required />

        <label>Email</label>
        <input type="email" placeholder="Enter email" required />

        <label>Password</label>
        <input type="password" placeholder="Enter Password" required />

        <button type="submit">Submit</button>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>

      </form>
    </div>
  )
}

export default Register;
