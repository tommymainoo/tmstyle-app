import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetProducts = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [Products, setProducts] = useState([]);

  const [search, setSearch] = useState(""); // search product hook

  // filter products based on the search
  const filteredProduct = Products.filter(
    (item) =>
      item.product_name.toLowerCase().includes(search.toLowerCase()) ||
      item.product_description.toLowerCase().includes(search.toLowerCase()) 
      
  );

  //image  URL definition
  const image_url = "https://tommymainoo.pythonanywhere.com/static/images/";
  const navigate = useNavigate();

  const getproducts = async () => {
    setLoading("Please wait");
    try {
      const response = await axios.get(
        "https://tommymainoo.pythonanywhere.com/api/get_product_details"
      );
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    getproducts();
  }, []); //empty dependancy that ensures this runs once when the component mounts

  return (
    <div className="row ">
      <div className="row justify-content-center mb-3 mt-3">
        <div className="col-md-6 ">
          <input type="search" className="form-control " placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
      </div>
      <h2>
        <b>Available Houses</b>
      </h2>
      {error}
      {loading}

      {/*map over products to display*/}
      {filteredProduct.map((Product, index) => (
        <div className="col-md-3 justify-content-center mb-4 ">
          <div className="card shadow ">
            <img
              src={image_url + Product.product_photo}
              alt="images"
              className="img"
            />
            <div className="card-body">
              <h4> {Product.product_name}</h4>
              <p className="text-muted">{Product.product_description}</p>
              <p className="text-warning">{Product.product_cost}</p>

              <button
                className="btn btn-dark mt-2"
                onClick={() =>
                  navigate("/mpesapayment", { state: { Product } })
                }
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetProducts;
