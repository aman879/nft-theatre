import React from "react";
import Card from "../Card/Card";
import { BN } from 'fuels';

interface NFTData {
  id: string;
  data: {
    data: {
      name: string;
      description: string;
      image: string;
    };
  };
  price: number;
}

interface CardListProps {
  userNFTs: NFTData[];
}

const CardList: React.FC<CardListProps> = ({ userNFTs }) => {
  
  let cardComponents: JSX.Element[] = [];
  if (userNFTs) {
    cardComponents = userNFTs.map((nft) => {
      return (
        <Card
          key={nft.id}
          id={nft.id}
          name={nft.name}
          price={nft.price}
          description={nft.description}
          photo={nft.image}
        />
      );
    });
  }


  return (
    <div>
      {userNFTs.length === 0 ? (
        <p>No NFTs found.</p>
      ) : (
        <div className="card-list">
          {cardComponents}
        </div>
      )}
    </div>
  );
};

export default CardList;
