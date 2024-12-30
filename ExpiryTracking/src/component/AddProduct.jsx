import React, { useState } from "react";
import "../styles/addProduct.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <>
      <div className="addProduct-header">
        <h1>Add Product</h1>
        <FaArrowRightFromBracket
          className="BackToHome"
          onClick={navigateToHome}
        />
      </div>
      <div className="addProduct-main-container">
        <div className="addProduct-container">
          <div
            onClick={triggerFileInput}
            className="upload-box"
            style={
              previewImage
                ? {
                    backgroundImage: `url(${previewImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {!previewImage && (
              <>
                <svg
                  width="27"
                  height="28"
                  viewBox="0 0 27 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 27.5C2.175 27.5 1.46875 27.2063 0.88125 26.6188C0.29375 26.0313 0 25.325 0 24.5V3.5C0 2.675 0.29375 1.96875 0.88125 1.38125C1.46875 0.79375 2.175 0.5 3 0.5H24C24.825 0.5 25.5313 0.79375 26.1188 1.38125C26.7063 1.96875 27 2.675 27 3.5V24.5C27 25.325 26.7063 26.0313 26.1188 26.6188C25.5313 27.2063 24.825 27.5 24 27.5H3ZM3 24.5H24V3.5H3V24.5ZM4.5 21.5H22.5L16.875 14L12.375 20L9 15.5L4.5 21.5Z"
                    fill="#E6E0E9"
                  />
                </svg>

                <span className="text-gray-500">Upload or take image</span>
              </>
            )}
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <input type="text" className="form-input" placeholder="Name" />
          <textarea className="form-input" placeholder="Description" />
          <input type="date" className="form-input" placeholder="Expiry date" />
          <button className="submit-btn">Add product</button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
