import React from "react";
import Card from "../Card/Card";

interface NFTData {
  id: string;
  name: string;
  price: number;
  description: string;
  video: string;
  unlocked: Promise<boolean>;
}

interface CardListProps {
  userNFTs: NFTData[];
  isOwner: boolean;
  handlePayClick: (id: string, price: number) => Promise<boolean>;
}

const CardList: React.FC<CardListProps> = ({ userNFTs, isOwner, handlePayClick }) => {
  console.log(isOwner, "from cardlist");

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
          video={nft.video}
          unlocked={nft.unlocked}
          isOwner={isOwner}
          handlePayClick={handlePayClick} // Pass the async function
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
