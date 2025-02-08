import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../Constants";

const Navbar = () => {
  const [open, SetOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [token, SetToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [MainUserId, setMainUserId] = useState(null);
  const Toggle = () => {
    SetOpen(!open);
  };

  const LogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userid");
    navigate("/");
    location.reload();
  };

  const toggleProfilePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const AccessToken = localStorage.getItem(ACCESS_TOKEN);
    if (AccessToken) {
      SetToken(AccessToken);
      const decoded = jwtDecode(AccessToken);
      console.log(decoded.user_id)
      setUserId(decoded.user_id);

    }
  }, []);


  const [ProfileImg,SetProfileImg]=useState(null);
  
    useEffect(() => {
      if (userId) {
        const fetchMainUser = async () => {
          try {
            // setLoading(true);
            const response = await fetch(
              `http://127.0.0.1:8000/track/MainUserList/${userId}/`
            );
            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            // console.log("result",result)
            if (result.length > 0) {
              setMainUserId(result[0].id);
              SetProfileImg(result[0].ProfileImg)
            }
          } catch (err) {
            // setError(err.message);
            consolelog(err)
          } finally {
            // setLoading(false);
            console.log("done")
          }
        };
        fetchMainUser();
      }
    }, [userId]);

  useEffect(() => {
    if(MainUserId){
    api.get(`track/MainUserList/${MainUserId}/`)
    .then((response)=>{
      console.log("response",response)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  }, [MainUserId]);

  return (
    <>
      {isPopupOpen && (
        <>
          <div
            className="overlay"
            onClick={toggleProfilePopup}
            style={{ display: "block" }}
          />
          <div className="popup" style={{ display: "block" }}>
            <img
              src={ProfileImg}
              className="profile-img"
              alt="Profile"
            />
            <div className="user-name">John Doe</div>
          </div>
        </>
      )}
      <nav className="navbar">
        <a href="#" className="logo">
          Veriprod
        </a>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={Toggle}
        >
          {open ? <IoCloseSharp /> : <FaBarsStaggered />}
        </button>
        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/addproduct">Add Product</a>
          </li>
          {!token && (
            <>
              <li>
                <a href="/Login">Login</a>
              </li>
              <li>
                <a href="/SignUp">Sign Up</a>
              </li>
            </>
          )}
          {token && (
            <li>
              <a onClick={LogOut} className="LogoutBtn">
                LogOut
              </a>
            </li>
          )}
          <li>
            <img
              src={ProfileImg}
              height={30}
              className="profileImageNav"
              alt="Profile Image"
              onClick={toggleProfilePopup}
              style={{ cursor: "pointer" }}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
