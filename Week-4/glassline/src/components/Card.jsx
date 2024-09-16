import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useShoppingCart } from "../utils/ShoopingCartContext";
import Popup from "./Popup";

const Card = ({ specData }) => {
  const { id, imageSrc, specsName, description, price } = specData;
  const { increaseCartQuantity } = useShoppingCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    increaseCartQuantity(id);
    setShowPopup(true); // Show the popup
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={imageSrc} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{specsName}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <FaRupeeSign />
            {price}
          </p>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to cart
          </button>
          <Popup
            message="Item added to cart!"
            visible={showPopup}
            onClose={() => setShowPopup(false)} // Hide the popup after timeout
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
