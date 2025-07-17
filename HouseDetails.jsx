import React from "react";
import { useNavigate } from "react-router-dom";



const HouseDetails = () => {

    const navigate = useNavigate();
  return (
    <div>
      
      <button
        className="btn btn-dark mt-2"
        onClick={() => navigate("/housedetails")}
      >
        Purchase Now
      </button>
    </div>
  );
};

export default HouseDetails;
