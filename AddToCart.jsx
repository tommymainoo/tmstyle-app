import { RiCloseLine, RiDeleteBinLine } from "@remixicon/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddToCart = () => {
   
 const navigate = useNavigate();
    
  return (
    <div>
      <div className="cart">
       

       
        <div className="cart-content">
          <div className="cart-box">
            <img src='' alt="" />
            <div className="cart-detail">
              <h2 className="cart-product-title">Big</h2>
              <span className="cart-price">70</span>
            </div>
          </div>
         
        </div>
        <div className="total">
          <div className="total-title">total</div>
          <div className="total-price">70</div>
        </div>
        <button className="btn-buy">buy</button>
      </div>
    </div>
  );
};
export default AddToCart;


