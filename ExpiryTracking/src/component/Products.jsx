import React from "react";
import "../styles/products.css";

const Products = () => {
  const product = [
    {
      name: "Nestle EveryDay",
      exp: "Expires in 30 days",
      expDate: "12/12/2023",
      img: "https://via.placeholder.com/50",
    },
    {
      name: "Nestle EveryDay",
      exp: "Expires in 30 days",
      expDate: "12/12/2023",
      img: "https://via.placeholder.com/50",
    },
    {
      name: "Nestle EveryDay",
      exp: "Expires in 30 days",
      expDate: "12/12/2023",
      img: "https://via.placeholder.com/50",
    },
    {
      name: "Nestle EveryDay",
      exp: "Expires in 30 days",
      expDate: "12/12/2023",
      img: "https://via.placeholder.com/50",
    },
    {
      name: "Nestle EveryDay",
      exp: "Expires in 30 days",
      expDate: "12/12/2023",
      img: "https://via.placeholder.com/50",
    },
    {
        name: "Nestle EveryDay",
        exp: "Expires in 30 days",
        expDate: "12/12/2023",
        img: "https://via.placeholder.com/50",
      },{
        name: "Nestle EveryDay",
        exp: "Expires in 30 days",
        expDate: "12/12/2023",
        img: "https://via.placeholder.com/50",
      },{
        name: "Nestle EveryDay",
        exp: "Expires in 30 days",
        expDate: "12/12/2023",
        img: "https://via.placeholder.com/50",
      },{
        name: "Nestle EveryDay",
        exp: "Expires in 30 days",
        expDate: "12/12/2023",
        img: "https://via.placeholder.com/50",
      },{
        name: "Nestle EveryDay",
        exp: "Expires in 30 days",
        expDate: "12/12/2023",
        img: "https://via.placeholder.com/50",
      },{
        name: "Nestle EveryDay",
        exp: "Expires in 30 days",
        expDate: "12/12/2023",
        img: "https://via.placeholder.com/50",
      },{
        name: "Nestle EveryDay",
        exp: "Expires in 30 days",
        expDate: "12/12/2023",
        img: "https://via.placeholder.com/50",
      },
  ];
  return (
    <div className="product-container">
      {product.map((item, index) => {
        return (
          <div className="card" key={index}>
            <h3>{item.name}</h3>
            <p>{item.exp}</p>
            <span>Expiry date:{item.expDate}</span>
            <img src={item.img} alt="Nestle EveryDay" />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
