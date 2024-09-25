import React from "react";
import CardList from "../CardList/CardList";

interface ExploreProps {
  nfts: any[]; 
  isConnected: boolean;
  handlePayClick: (id: string, price: number) => Promise<boolean>;
}

const Explore: React.FC<ExploreProps> = ({ nfts, isConnected, handlePayClick}) => {
  console.log(nfts);
  const isOnwer = false;
  return (
    <div> 
      {isConnected ? (
        <CardList userNFTs={nfts} isOwner={isOnwer} handlePayClick={handlePayClick}/>
      ) : (
        <div>
          <p>Connect your wallet</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
