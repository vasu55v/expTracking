import React from 'react'
import '../styles/product.css'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineEdit  } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const navigate=useNavigate();
    const redirectToEdit=()=>{
        navigate('/edit')
    }
  return (
    <div className='product-main-container'>
          <div className='product-header'>
            <h1><FaArrowLeftLong />Product name</h1>
            <MdOutlineEdit className='edit-icon' onClick={redirectToEdit}/>
          </div>
          <div className='product-main'>
            <img src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQrd-hv1dwRLjY1aVB_u9Ww2YLnpNtQY8kePRgRKpvRUr-H2fV1C9V3sYOBY6CD4Dpg07NOrw12LU5DUuX42XTLsNe4ad4myHrqsIQvtemSO6_YZa3ilrg6&usqp=CAE" />
            <div className='time-text'><p>Expires on</p><p>12th jan,2024</p></div>
          </div>
          <button className='delete-button'><RiDeleteBin5Fill />Delete Product</button>
    </div>
  )
}

export default Product