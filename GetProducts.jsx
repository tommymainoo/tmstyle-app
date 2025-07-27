import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RiCloseLine,
  RiDeleteBinLine,
  RiShoppingBagLine,
  RiShoppingCartLine,
} from "@remixicon/react";

const GetProducts = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [Products, setProducts] = useState([]);

  const [search, setSearch] = useState(""); // search product hook

  const [visiblecount, setVisibleCount] = useState(8); //how many products to show at first

  // filter products based on the search
  const filteredProduct = Products.filter(
    (item) =>
      item.product_name.toLowerCase().includes(search.toLowerCase()) ||
      item.product_description.toLowerCase().includes(search.toLowerCase())
  );
  // Helper function to check if user is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
     console.log("Token found in localStorage:", token);
    return !!token; // returns true if token exists
  };

  //function to handle show more button
  const showMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 4); //load 4 more products
  };

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
  // CART HOOKS
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  const addToCart = (product) => {
    if (!isLoggedIn()) {
      alert("Please login to add items to your cart");
      navigate("/signin");
      return;
    }
    const productWithCartId = { ...product, cartId: Date.now() }; // generate unique id
    setCartItems((prevItems) => [...prevItems, productWithCartId]);
  };
  const removeFromCart = (cartId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartId !== cartId)
    );
  };
  // Retrieve cart items from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getproducts();
  }, []); //empty dependancy that ensures this runs once when the component mounts

  return (
    <div className="">
      <div className="">
        {/* Example add item button */}

        {/* Side cart drawer */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: isOpen ? 0 : "-100%",
            width: "360px",
            height: "100%",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            transition: "right 0.5s ease",
            padding: "20px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          <div className="cart-content">
            <header>
              <h2 className="cart-title">Your Cart</h2>
              <RiCloseLine id="cart-close" onClick={toggleCart} />
            </header>
            {cartItems.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <div className="cart-box row">
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={item.cartId}>
                      {" "}
                      <img
                        src={image_url + item.product_photo}
                        alt=""
                        height={200}
                      />
                      <div className="cart-detail">
                        <p className="cart-product-title">
                          Name:{item.product_name}
                        </p>
                        <p className="cart-price">Cost:{item.product_cost}</p>
                      </div>
                      <button
                        className="btn-buy"
                        onClick={() => {
                          if (!isLoggedIn()) {
                            alert("Please login to purchase");
                            navigate("/signin");
                            return;
                          }
                          navigate("/mpesapayment", { state: { item } });
                        }}
                      >
                        buy
                      </button>
                      <RiDeleteBinLine
                        onClick={() => removeFromCart(item.cartId)}
                        className="cart-remove"
                        style={{
                          cursor: "pointer",
                          justifyContent: "flex-end",
                          display: "flex",
                          top: 0,
                          right: 0,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row ">
        <div
          className="row justify-content-center mb-3 mt-3"
          style={{ zIndex: 70 }}
        >
          <div className="col-md-6 ">
            <input
              type="search"
              className="form-control "
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-6 shopping-cart">
            {/* Button to toggle cart */}
            <RiShoppingCartLine onClick={toggleCart} />
            <span
              style={{
                fontWeight: 600,
                marginLeft: 6,
              }}
            >
              Cart
            </span>
          </div>
        </div>
        <h2>
          <b>Available Houses</b>
        </h2>
        {error}
        {loading}

        {/*map over products to display*/}
        {filteredProduct.slice(0, visiblecount).map((Product, index) => (
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
                  onClick={() => {
                    if (!isLoggedIn()) {
                      alert("Please login to purchase");
                      navigate("/signin");
                      return;
                    }
                    navigate("/mpesapayment", { state: { Product } });
                  }}
                >
                  Purchase Now
                </button>
                <RiShoppingBagLine
                  size={27}
                  className="yow add-cart"
                  onClick={() => addToCart(Product)}
                />
              </div>
            </div>
          </div>
        ))}
        {/* show more button */}
        {visiblecount < filteredProduct.length && (
          <div className="text-center col-12">
            <button
              className="btn btn-primary text-center"
              onClick={showMoreProducts}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProducts;
