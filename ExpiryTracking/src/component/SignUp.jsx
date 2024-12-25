import React, { useState } from 'react';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };


  return (
    <div className="main-signup-container">
      <div className="card-signup">
        <div className="header-signup">
          <button className="back-button"onClick={navigateToHome}>←</button>
          <h1 className="title">Register</h1>
          <div />
        </div>
        <form>
          <div className="photo-upload">
            <div
              className="photo-container"
              onClick={() => document.getElementById('photo-input').click()}
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
              />
            </div>
          </div>
          <div className="form-group">
            <input type="text" className="input-signup" placeholder="Username" required />
            <input type="email" className="input-signup" placeholder="Email" required />
            <input type="password" className="input-signup" placeholder="Password" required />
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
