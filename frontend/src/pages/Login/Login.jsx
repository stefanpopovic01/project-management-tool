import React from 'react';
import './Login.css'
import footer from "../../assets/footer.png"
import { useNavigate } from 'react-router-dom';

function Login() {

const navigate = useNavigate();

  return (
    <div className="login-container">
      <form className="login-form" >
        <h2>Login</h2>

        <label>Email</label>
        <input type="email" placeholder="Enter email" required />

        <label>Password</label>
        <input type="password" placeholder="Enter password" required />

        <button type="submit">Submit</button>

        <p className="register-link">
          Not registered? <span onClick={() => navigate("/register")}>Register</span>
        </p>

      </form>

    </div>
  )
}

export default Login;
