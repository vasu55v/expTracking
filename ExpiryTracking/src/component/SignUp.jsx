import React, { useState } from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../Constants";

const SignUp = () => {
  const [previewUrl, setPreviewUrl] = useState("");

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    username: "",
    ProfileImg: null,
    password: "",
  });

  const inputHandler = (e) => {
    e.preventDefault();

    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    setRegisterFormData({
      ...registerFormData,
      ProfileImg: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", registerFormData.email);
    formData.append("username", registerFormData.username);
    formData.append("password", registerFormData.password);

    if (registerFormData.ProfileImg) {
      formData.append("ProfileImg", registerFormData.ProfileImg);
    } else {
      console.warn("No profile photo selected");
    }

    // Log FormData entries (for debugging)
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    api
      .post("track/User/Create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setRegisterFormData({
          email: "",
          username: "",
          ProfileImg: null,
          password: "",
        });
        // window.location.reload();
        Cookies.set("Customer_id", response.data.customer_id);
        if(Cookies.get("Customer_id")){
        navigate('/login');
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <div className="main-signup-container">
      <div className="card-signup">
        <div className="header-signup">
          <button className="back-button" onClick={navigateToHome}>
            ←
          </button>
          <h1 className="title">Register</h1>
          <div />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="photo-upload">
            <div
              className="photo-container"
              onClick={() => document.getElementById("photo-input").click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="preview-image" />
              ) : (
                <span className="plus-icon">+</span>
              )}
              <input
                type="file"
                id="photo-input"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                name="ProfileImg"
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="input-signup"
              placeholder="Username"
              onChange={inputHandler}
              name="username"
              required
            />
            <input
              type="email"
              className="input-signup"
              placeholder="Email"
              onChange={inputHandler}
              name="email"
              required
            />
            <input
              type="password"
              className="input-signup"
              placeholder="Password"
              onChange={inputHandler}
              name="password"
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

export default SignUp;
