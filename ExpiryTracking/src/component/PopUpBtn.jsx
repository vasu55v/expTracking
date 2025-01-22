import React from "react";
import "../styles/popUp.css";
const PopUpBtn = () => {
  const showPopup = () => {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  };

  const closePopup = () => {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
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
      <button onClick={showPopup}>Open Popup</button>
      <div className="overlay" id="overlay" />
      <div className="popup" id="popup">
        <h2>Popup Title</h2>
        <div className="popup-buttons">
          <button onClick={handleButton1}>Button 1</button>
          <button onClick={handleButton2}>Button 2</button>
        </div>
      </div>
    </>
  );
};

export default PopUpBtn;
