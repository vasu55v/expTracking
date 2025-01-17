import React, { useEffect, useState } from "react";
import "../styles/addProduct.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import { jwtDecode } from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const today = new Date().toISOString().split('T')[0];

  const [ProductData, setProductData] = useState({
    ProductImg: null,
    ProductName: "",
    description: "",
    ExpDate: "",
  });

  const [UserId, setUserId] = useState(null);
  const [MainUserId, setMainUserId] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!ProductData.ProductName.trim()) {
      newErrors.ProductName = "Product name is required";
    }
    
    if (!ProductData.ProductImg) {
      newErrors.ProductImg = "Product image is required";
    }
    
    if (!ProductData.ExpDate) {
      newErrors.ExpDate = "Expiry date is required";
    } else {
      const selectedDateTime = new Date(ProductData.ExpDate).getTime();
      const todayTime = new Date(today).getTime();
      if (selectedDateTime <= todayTime) {
        newErrors.ExpDate = "Please select a future date";
      }
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const InputHandler = (e) => {
    setProductData({
      ...ProductData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: ""
      });
    }
  };

  const InputDateHandler = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);
    
    const selectedDateTime = new Date(selected).getTime();
    const todayTime = new Date(today).getTime();
    
    if (selectedDateTime <= todayTime) {
      setError({
        ...error,
        ExpDate: "Please select a future date"
      });
    } else {
      setError({
        ...error,
        ExpDate: ""
      });
    }
    
    setProductData({
      ...ProductData,
      ExpDate: selected,
    });
  };

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        setProductData({
          ...ProductData,
          ProductImg: file,
        });
        // Clear error when valid file is selected
        setError({
          ...error,
          ProductImg: ""
        });
      } else {
        setError({
          ...error,
          ProductImg: "Please select a valid image file"
        });
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById("file-upload").click();
  };

  useEffect(() => {
    if (UserId) {
      api.get(`/track/MainUserList/${UserId}/`)
        .then((response) => {
          setMainUserId(response.data[0].id);
        })
        .catch((error) => {
          console.error('Error fetching MainUserId:', error);
        });
    }
  }, [UserId]);

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('user', MainUserId);
    formData.append('ProductName', ProductData.ProductName.trim());
    formData.append('description', ProductData.description.trim());
    formData.append('ProductImg', ProductData.ProductImg);
    formData.append('ExpiryDate', ProductData.ExpDate);

    try {
      const response = await api.post('track/AddProduct/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Product added successfully:', response.data);
      toast.success("Product Added Successfully.", { autoClose: 3000 });
      setProductData({
        ProductImg: null,
        ProductName: "",
        description: "",
        ExpDate: "",
      });
      setPreviewImage(null);
      setSelectedDate("");
      // Optionally navigate to home or show success message
      navigate("/");
    } catch (error) {
      console.error('Error adding product:', error);
      toast.success("Failed to add product. Please try again.", { autoClose: 3000 });
      setError({
        ...error,
        submit: "Failed to add product. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      const data = jwtDecode(token);
      setUserId(data.user_id);
    }
  }, []);

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
              name="ProductImg"
            />
          </div>
          {error.ProductImg && <div className="error-message">{error.ProductImg}</div>}
          
          <input 
            type="text" 
            className={`form-input ${error.ProductName ? 'error' : ''}`}
            name="ProductName" 
            value={ProductData.ProductName}
            onChange={InputHandler} 
            placeholder="Name" 
          />
          {error.ProductName && <div className="error-message">{error.ProductName}</div>}
          
          <textarea 
            className="form-input" 
            name="description" 
            value={ProductData.description}
            onChange={InputHandler} 
            placeholder="Description" 
          />
          
          <input
            type="date"
            className={`form-input ${error.ExpDate ? 'error' : ''}`}
            name="ExpDate"
            min={today}
            value={selectedDate}
            onChange={InputDateHandler}
          />
          {error.ExpDate && <div className="error-message">{error.ExpDate}</div>}
          
          {error.submit && <div className="error-message">{error.submit}</div>}
          
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding product...' : 'Add product'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;