import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productname, setProductName] = useState("");
  const [productdescription, setDescription] = useState("");
  const [productcost, setProductCost] = useState("");
  const [productphoto, setProductPhoto] = useState("");

  const [loading,setLoading] =useState('');
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submit=async(e)=>{
    e.preventDefault();
    setLoading("Please Wait");

    try {

      const data=new FormData();
      data.append("product_name", productname);
      data.append("product_description", productdescription);
      data.append("product_cost", productcost);
      data.append("product_photo", productphoto);

      const response = await axios.post(
        "https://tommymainoo.pythonanywhere.com/api/add_products",
        data
      );

      setLoading('')
      setSuccess(response.data.message)
 
      
    } catch (error) {
      setLoading('')
      setError("Failed to upload")
      
    }




  }


  
  return (
    <div className="row justify-content-center mt-3">
      <div className="col-md-6 card shadow-lg">
        <h3>
          <b>Upload Products</b>
        </h3>
        <form action="" onSubmit={submit}>
          
          {loading}
          
          {success&& <div className="alert alert-success">{success}</div>}
          {error&& <div className="alert alert-danger">{error}</div>}
          <input
            type="text"
            className="form-control"
            required
            placeholder="Product name"
            value={productname}
            onChange={(e) => setProductName(e.target.value)}
          />{" "}
          <br />
          <textarea
            name=""
            id=""
            rows={3}
            className="form-control"
            placeholder="Description"
            value={productdescription}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>{" "}
          <br />
          <input
            type="number"
            className="form-control"
            required
            placeholder="Product cost"
            value={productcost}
            onChange={(e) => setProductCost(e.target.value)}
          />{" "}
          <br />
          <span>
            <b>Browse/Upload Product Image</b>
          </span>{" "}
          <br />
          <input
            type="file"
            className="form-control"
            required
            placeholder=""
            onChange={(e) => setProductPhoto(e.target.files[0])}
          />{" "}
          <br />
          <button className="btn btn-primary" type="submit">
            Upload Product
          </button>
        </form>
        <br />
      </div>
    </div>
  );
};

export default AddProduct;
