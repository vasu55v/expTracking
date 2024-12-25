import React from "react";
import "../styles/hero.css";
import img1 from "../assets/home1.png";
import img2 from "../assets/home2.png";
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate=useNavigate();

  const navigateToProducts=()=>{
        navigate('/products');
  }
  return (
    <div className="hero-main">
      <div className="hero-font">
        <h1>Veriprod helps to keep track of your products’s validity.</h1>
        <button className="styled-button" onClick={navigateToProducts}>
          Let's Start
          <div className="inner-button">
            <svg
              id="Arrow"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              width="30px"
              className="icon"
            >
              <defs>
                <linearGradient
                  id="iconGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#AAAAAA" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                fill="url(#iconGradient)"
                d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
              />
            </svg>
          </div>
        </button>
      </div>
      <div className="hero-img">
        <motion.img 
           initial={{x:100,opacity:0}}
           animate={{x:0,opacity:1}}
           transition={{duration:1,delay:1}}
         src={img1} className="img1" />
        <motion.img src={img2} className="img2" />
      </div>
    </div>
  );
};

export default Hero;
