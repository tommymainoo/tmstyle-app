import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const MpesaPayment = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //lets receive the product in mpesa payment
  const { Product } = useLocation().state || {};

  const image_url = "https://tommymainoo.pythonanywhere.com/static/images/";

  const submit = async (e) => {
    e.preventDefault();
    setMessage("please wait");
    try {
      // create a data object
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", Product.product_cost);

      const response = await axios.post(
      'https://tommymainoo.pythonanywhere.com/api/mpesa_payment',data
        
      );
      setMessage("please complete payment in your phone");
    } catch (error) {
      setMessage("");
      setError("something went wrong");
    }
  };
  return (
    <div className="justify-content-center row mt-2">
      <div className="col-md-6 card shadow">
        <br />
        <h2 className="yow">
          <b>LIPA NA MPESA</b>
        </h2>

        <form action="" onSubmit={submit}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <br />

          <img src={image_url + Product.product_photo} alt="" height={200} />
          <p>Name:{Product.product_name}</p>
          <p>Cost:{Product.product_cost}</p>
          <input
            type="tel"
            placeholder="Enter Phone Number"
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <br />
          <button type="submit" className="btn btn-success">
            Make Payment
          </button>
        </form>
        <br />
      </div>
    </div>
  );
};

export default MpesaPayment;
