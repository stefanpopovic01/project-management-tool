import { React, useContext, useState} from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/services/authServices';
import { AuthContext } from '../../contex/AuthContext';


function Login() {

const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [success, setSuccess] = useState(false);
const [error, setError] = useState("");
const { loginContext } = useContext(AuthContext);

const handeLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      setSuccess(true);
      setError("");
      loginContext(res.data.user, res.data.accessToken);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Wrong credentials.");
      setSuccess(false);
    }
};



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handeLogin}>
        <h2>Login</h2>

        <label>Email</label>
        <input type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Submit</button>

        <p className="register-link">
          Not registered? <span onClick={() => navigate("/register")}>Register</span>
        </p>

        {success && <p className="success-msg">Success!</p>}
        {error && <p className="error-msg">{error}</p>}

      </form>

    </div>
  )
}

export default Login;
