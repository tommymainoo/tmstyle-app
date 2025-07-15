import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


const NavBar = () => {
  return (
    <div>
      <div className="col-md-12 ">
        <nav className="navbar navbar-expand-md  ">
          <a href="" className="navbar-brand">
            <b></b>
          </a>

          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarcollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarcollapse">
            <div className="navbar-nav text-light">
              <Link to="/" className="nav-link active navi text-light">
                Get Products
              </Link>

              <Link to="/signin" className="nav-link navi text-light">
                Sign In
              </Link>

              <Link to="/signup" className="nav-link navi text-light">
                Sign Up
              </Link>

              <Link to="/add_products" className="nav-link navi text-light">
                Add products
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;