import React from 'react';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/services/authServices';
import { useState } from 'react';

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await register({ username, email, password });

      setSuccess(true);
      setError("");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong..");
      setSuccess(false);
    }
  };

  if (success) {
    setTimeout(() => {
      navigate("/login");
    }, 1500); 
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        <label>Username</label>
        <input type="text" placeholder="Enter username" required value={username} onChange={(e) => setUsername(e.target.value)}/>

        <label>Email</label>
        <input type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Submit</button>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>

        {success && <p className="success-msg">You've successfully registered.</p>}
        {error && <p className="error-msg">{error}</p>}

      </form>
    </div>
  )
}

export default Register;
