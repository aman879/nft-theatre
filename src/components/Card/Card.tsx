import React, { useState } from "react";
import "./Card.css";

interface CardProps {
  id: string; // Adjust the type if necessary
  name: string;
  price: number; // Adjust the type if necessary (e.g., string if price can be formatted)
  photo: string;
  description: string;
  // Uncomment if you have these props
  // onBuyFlower?: (id: string, price: number) => Promise<void>;
  // onRemoveFlower?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, name, price, photo, description }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Uncomment this when using payment functionality
  // const handlePayClick = async () => {
  //   setIsProcessing(true);
  //   try {
  //     await onBuyFlower(id, price); // This will trigger the payment function
  //   } catch (error) {
  //     console.error("Transaction failed:", error);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // }

  return (
    <div className="card-container">
      <img className="card-image" alt="NFT" src={photo} />
      <div className="card-details">
        <p>{name}</p>
        <p>{description}</p>
        <p>Price: {price} ETH</p>
      </div>
      {/* Uncomment when using payment functionality
      <button
        className="card-button"
        onClick={handlePayClick}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      {onRemoveFlower && (
        <button
          className="card-button"
          onClick={() => onRemoveFlower(id)}
        >
          Remove
        </button>
      )} */}
    </div>
  );
};

export default Card;
