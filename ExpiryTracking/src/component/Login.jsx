import React from 'react'
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
      const navigate = useNavigate();
      const navigateToHome = () => {
        navigate("/");
      };

  return (
   <div className="main-signup-container">
      <div className="card-signup">
        <div className="header-signup">
          <button className="back-button"onClick={navigateToHome}>←</button>
          <h1 className="title">Login</h1>
          <div />
        </div>
        <form>
          <div className="form-group">
            <input type="text" className="input-signup" placeholder="Username" required />
            <input type="password" className="input-signup" placeholder="Password" required />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login