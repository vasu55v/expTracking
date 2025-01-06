import React, { useState } from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const inputHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("password", userData.password);

    api
      .post("track/token/", formData)
      .then((response) => {
        console.log(response);
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-signup-container">
      <div className="card-signup">
        <div className="header-signup">
          <button className="back-button" onClick={navigateToHome}>
            ←
          </button>
          <h1 className="title">Login</h1>
          <div />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="input-signup"
              name="username"
              onChange={inputHandler}
              placeholder="Username"
              required
            />
            <input
              type="password"
              className="input-signup"
              name="password"
              onChange={inputHandler}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
