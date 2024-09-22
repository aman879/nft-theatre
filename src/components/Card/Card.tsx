import React from "react";
import "./Card.css";

interface CardProps {
  name: string;
  price: number; 
  photo: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name, price, photo, description }) => {



  return (
    <div className="card-container">
      <img className="card-image" alt="NFT" src={photo} />
      <div className="card-details">
        <p>{name}</p>
        <p>{description}</p>
        <p>Price: {price} ETH</p>
      </div>
    </div>
  );
};

export default Card;
