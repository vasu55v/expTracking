import React, { useEffect, useState } from "react";
import "../styles/products.css";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import PopUpBtn from "./PopUpBtn";
import api from "../Api";
import { ACCESS_TOKEN } from "../Constants";
import { jwtDecode } from "jwt-decode";


const Products = () => {
  const navigate = useNavigate();
  const [IsOpen, SetIsOpen] = useState(false);
  const [userId,setUserId]=useState(null);
  const [MainUserId, setMainUserId] = useState(null);
  const [ProductData, setProductData] =useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

   useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.user_id);
      } catch (err) {
        setError("Invalid token");
        setLoading(false);
      }
    }
  }, []);

useEffect(() => {
    if (userId) {
      const fetchMainUser = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://127.0.0.1:8000/track/MainUserList/${userId}/`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const result = await response.json();
          if (result.length > 0) {
            setMainUserId(result[0].id);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchMainUser();
    }
  }, [userId]);

   useEffect(()=>{
        if (MainUserId) {

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/track/Products/${MainUserId}/`); // Replace with your API URL
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        // setMainUserId("result",result[0].id);
        console.log("result:",result)
        setProductData(result)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }
   },[MainUserId])



  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToAddProducts = () => {
    navigate("/AddProduct");
  };

  const showPopup = () => {
    SetIsOpen(true);
  };

  const closePopup = () => {
    SetIsOpen(false);
  };

  const handleButton1 = () => {
    alert("Button 1 clicked");
    closePopup();
  };

  const handleButton2 = () => {
    alert("Button 2 clicked");
    closePopup();
  };

  return (
    <>
    {loading && 
      <p className="Loading">Loading........</p>
    }
    {
      error && 
      <p className="error">Error....</p>
    }
      {IsOpen && (
        <>
          <div 
            className="overlay" 
            id="overlay" 
            onClick={closePopup} 
            style={{ display: 'block' }}
          />
          <div 
            className="popup" 
            id="popup" 
            style={{ display: 'block' }}
          >
            <h2>Popup Title</h2>
            <div className="popup-buttons">
              <button onClick={handleButton1}>Button 1</button>
              <button onClick={handleButton2}>Button 2</button>
            </div>
          </div>
        </>
      )}
      <div className="product-main-container">
        <div className="product-header-container">
          <h1>Products</h1>
          <div className="product-header-text">
            <p>Expiring soon</p>
            <p onClick={showPopup}>
              <svg
                className="svg-hide"
                width="24"
                height="24"
                viewBox="0 0 20 18.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 20.75V15.25H12.75V17.25H20.75V18.75H12.75V20.75H11.25ZM3.25 18.75V17.25H8.74995V18.75H3.25ZM7.25 14.75V12.75H3.25V11.25H7.25V9.25003H8.74995V14.75H7.25ZM11.25 12.75V11.25H20.75V12.75H11.25ZM15.25 8.74998V3.25003H16.75V5.25003H20.75V6.74998H16.75V8.74998H15.25ZM3.25 6.74998V5.25003H12.75V6.74998H3.25Z"
                  fill="#8b8b8b"
                />
              </svg>
              Filter
            </p>
            <p>
              <IoMdHome className="home-icon" onClick={navigateToHome} />
            </p>
            <p>
              <input type="text" placeholder="Search" className="search-box" />
            </p>
          </div>
        </div>
        <div className="product-container">
          {ProductData.map((item, index) => (
            <div className="card" key={index}>
              <h3>{item.ProductName}</h3>
              <p>{item.ExpiryDate}</p>
              <span>Expiry date:{item.ExpiryDate}</span>
              <img src={item.ProductImg} alt="Nestle EveryDay" />
            </div>
          ))}
        </div>
      </div>
      <button className="addProductButton" onClick={navigateToAddProducts}>
        <IoMdAdd />
      </button>
    </>
  );
};

export default Products;