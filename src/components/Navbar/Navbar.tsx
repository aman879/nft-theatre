import React from "react";
import "./Navbar.css";

interface NavbarProps {
  onRouteChange: (route: string) => void;
  isConnected: boolean;
  connect: () => void;
  address: string | null;
  isInstalled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onRouteChange, isConnected, connect, address, isInstalled }) => {
  console.log(isInstalled)

  const handleRedirect = () => {
    window.open('https://wallet.fuel.network/docs/install/', '_blank'); // Opens in a new tab
  };

  return (
    <nav>
      <div className="nav-left">
        <p>NFT Theater</p>
      </div>
      <div className="nav-right">
        <p onClick={() => onRouteChange("explore")}>Explore</p>
        <p onClick={() => onRouteChange("mint")}>Mint</p>
        <p onClick={() => onRouteChange("mynft")}>My NFTs</p>
        { isInstalled ? (
          <button
            onClick={() => connect()}
            disabled={isConnected}
          >
            {isConnected
              ? address 
                ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
              : "Connecting"
                : "Connect"
            }
          </button>
        ): (
          <button onClick={handleRedirect}>Install Fuel Wallet to Connect</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
