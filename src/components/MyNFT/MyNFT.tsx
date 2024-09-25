import React from "react";
import CardList from "../CardList/CardList";

interface MyNFTProps {
  myNfts: any[];
  isConnected: boolean;
  userAddress: string | null;
}

const MyNFT: React.FC<MyNFTProps> = ({ myNfts, isConnected, userAddress }) => {
  const userNFTs = myNfts.filter((nft) => nft.owner.Address.bits === userAddress);
  const isOwner = true;

  const handlePayClick = (id: string, price: number): Promise<boolean> => {
    console.log(id, price);
    return Promise.resolve(true);
  };

  return (
    <div>
      {isConnected ? (
        userNFTs.length > 0 ? (
          <>
            <h1>Your NFTs</h1>
            <CardList userNFTs={userNFTs} isOwner={isOwner} handlePayClick={handlePayClick} />
          </>
        ) : (
          <p>You don't own any NFTs yet.</p>
        )
      ) : (
        <div>
          <p>Connect your wallet to view your NFTs.</p>
        </div>
      )}
    </div>
  );
};

export default MyNFT;
