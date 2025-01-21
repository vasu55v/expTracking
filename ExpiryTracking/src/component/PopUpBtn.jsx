import React from 'react'
import '../styles/popUp.css'
const PopUpBtn = () => {
  return (
    <>
    <button className="trigger-button" onclick="togglePopup()">
      Open Popup
    </button>
    <div className="popup-overlay" id="popupOverlay">
      <div className="popup-card">
        <div className="popup-title">Choose an Option</div>
        <button className="option-button option-1" onclick="handleOption1()">
          Option 1
        </button>
        <button className="option-button option-2" onclick="handleOption2()">
          Option 2
        </button>
        <button className="close-button" onclick="togglePopup()">
          Close
        </button>
      </div>
    </div>
  </>
  
  )
}

export default PopUpBtn