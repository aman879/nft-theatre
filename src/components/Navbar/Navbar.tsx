import React from "react";
import "./Navbar.css";

interface NavbarProps {
  onRouteChange: (route: string) => void;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
  address: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ onRouteChange, isConnected, isConnecting, connect, address }) => {
  return (
    <nav>
      <div className="nav-left">
        <p>NFT Marketplace</p>
      </div>
      <div className="nav-right">
        <p onClick={() => onRouteChange("explore")}>Explore</p>
        <p onClick={() => onRouteChange("mint")}>Mint</p>
        <p onClick={() => onRouteChange("mynft")}>My NFTs</p>
        <button
          onClick={() => connect()}
          disabled={isConnected}
        >
          {isConnected
            ? address 
              ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
              : `loading`
            : isConnecting
              ? "Connecting"
              : "Connect"
          }
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
