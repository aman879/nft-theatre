import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { PinataSDK } from 'pinata-web3';
import { ethers } from 'ethers';
import { toB256, isBech32 } from '@fuel-ts/address';
import Explore from './components/Explore/Explore';
import Mint from './components/Mint/Mint';
import MyNFT from './components/MyNFT/MyNFT';
import Notification from './components/Notification/Notification'; // Import the notification component
import contractId from "../src/contracts/address.json";
import jws from "../src/contracts/key.json";
import { NftContract } from "./sway-api/contracts/NftContract";
import Scroll from './components/Scroll/Scroll';
import { 
  useIsConnected,
  useWallet,
  useConnect,
  useConnectors,
} from "@fuels/react";
import { BN, bn } from 'fuels';

interface AppState {
  route: string;
  address: string | null;
  contract: NftContract | null;
  nfts: any[];
  isInstalled: boolean;
  notification: { message: string, type: 'success' | 'error' | 'loading' } | null;
  shouldFetchNFTs: boolean; // New state variable to control NFT fetching
}

const pinata = new PinataSDK({
  pinataJwt: jws.jws,
  pinataGateway: "beige-sophisticated-baboon-74.mypinata.cloud",
});

const CONTRACT_ID = contractId.address;

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    route: "explore",
    address: null,
    contract: null,
    nfts: [],
    isInstalled: false,
    notification: null,
    shouldFetchNFTs: true, 
  });

  const { connect } = useConnect();
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  const { connectors } = useConnectors();

  useEffect(() => {
    try {
      const installed = connectors[0].installed
      setState(prev => ({...prev, isInstalled: installed}))
    } catch(e) {
      console.log(e)
    }
  }, [connectors]);

  useEffect(() => {
    if (wallet?.address) {
      const bech32 = wallet.address.toAddress();
      if (isBech32(bech32)) {
        const b256 = toB256(bech32);
        setState(prev => ({ ...prev, address: b256 }));
      }
    }
  }, [wallet]);

  useEffect(() => {
    async function getContract() {
      if (isConnected && wallet) {
        const nftContract = new NftContract(CONTRACT_ID, wallet);
        setState(prev => ({ ...prev, contract: nftContract, shouldFetchNFTs: true })); 
      }
    }
    getContract();
  }, [isConnected, wallet]);

  useEffect(() => {
    async function getAllNFTs() {
      if (state.contract !== null && state.shouldFetchNFTs) { 
        try {
          setState(prev => ({
            ...prev,
            notification: { message: 'Loading NFTs...', type: 'loading' }
          }));

          const res = await state.contract.functions.get_total_count().txParams({ gasLimit: 100_000 }).get();
          const totalCount = new BN(res.value).toNumber();

          const nfts: any[] = [];

          for (let i = 1; i <= totalCount; i++) {
            const nftData = await state.contract.functions.get_nft_data(i).txParams({ gasLimit: 100_000 }).get();

            if (nftData.value.uri) {
              nftData.value.uri = nftData.value.uri.slice(0, -1);
            }
            const unlocked = false;
            const data = await pinata.gateways.get(`https://beige-sophisticated-baboon-74.mypinata.cloud/ipfs/${nftData.value.uri}`);
            const mergedNFTData = {
              ...(typeof nftData.value === 'object' ? nftData.value : {}),
              ...(typeof data.data === 'object' ? data.data : {}),
              unlocked: unlocked 
            };
            nfts.push(mergedNFTData);

          }
          
          setState(prev => ({ ...prev, nfts, shouldFetchNFTs: false }));
          setState(prev => ({
            ...prev,
            notification: { message: 'NFTs loaded', type: 'success' }
          }));
        } catch (error) {
          console.error('Error fetching NFTs:', error);
          setState(prev => ({
            ...prev,
            notification: { message: 'Error fetching NFTs', type: 'error' }
          }));
        }
      }
    }
    getAllNFTs();
  }, [state.contract, state.shouldFetchNFTs]);

  const mintNFT = async (uri: string, price: string): Promise<void> => {
    if (!state.contract) {
      return alert("Contract not loaded");
    }

    try {
      const priceInput = bn.parseUnits(price);
      const subID = ethers.sha256(ethers.toUtf8Bytes(uri));
      if (uri.length < 60) {
        uri = uri.padEnd(60, '0');
      }

      const response = await state.contract.functions.mint(subID, uri, priceInput).call();
      const res = await response.waitForResult()
      if(res.transactionResult.isStatusSuccess
      ) {
        setState(prev => ({
          ...prev,
          notification: { message: 'Minting successful!', type: 'success' },
          shouldFetchNFTs: true 
        }));
      }

      onRouteChange("explore");

    } catch (error) {
      console.error('Error minting NFT:', error);
      setState(prev => ({
        ...prev,
        notification: { message: 'Error minting NFT', type: 'error' }
      }));
    }
  };

  const onConnect = async () => {
    connect("Fuel Wallet");
  };

  const onRouteChange = (route: string) => {
    setState(prev => ({ ...prev, route }));
  };

  const uploadToPinata = async (file: File, name: string, description: string, price: string): Promise<string> => {
    if (!file) {
      throw new Error("File is required");
    }

    try {
      const uploadImage = await pinata.upload.file(file);
      const metadata = await pinata.upload.json({
        name: name,
        description: description,
        price: price,
        video: `https://beige-sophisticated-baboon-74.mypinata.cloud/ipfs/${uploadImage.IpfsHash}`,
      });
      return metadata.IpfsHash;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      throw new Error("Upload to Pinata failed.");
    }
  };

  const handlePayClick = async (id: string, price: number) : Promise<boolean> => {
    let res;
    if(state.contract) {
      try {
        const priceInput = bn.parseUnits(price.toString());
        const baseAssetId = state.contract.provider.getBaseAssetId();
        const result = await state.contract.functions.buy_nft(id).txParams({ variableOutputs: 1 }).callParams({ forward: [priceInput, baseAssetId] }).call();
        const wait = await result.waitForResult();
        res = wait.transactionResult.isStatusSuccess;
        setState(prev => ({
          ...prev,
          notification: { message: 'Please wait and do not reload or change tab or pages', type: 'success' }
        }));
      } catch (e) {
        console.log("error", e);
        setState(prev => ({
          ...prev,
          notification: { message: "Failed", type: 'error' }
        }));
      }
    }
    if(res) {
      setState(prev => {
        const updatedNFTs = prev.nfts.map(nft => {
          if (nft.id === id) { 
            return { ...nft, unlocked: true }; 
          }
          return nft;
        });
        return { ...prev, nfts: updatedNFTs };
      });
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <Navbar
        onRouteChange={onRouteChange}
        isConnected={isConnected}
        connect={onConnect}
        address={state.address}
        isInstalled={state.isInstalled}
      />
      {state.route === "explore" ? (
        <Scroll>
          <Explore nfts={state.nfts} isConnected={isConnected} handlePayClick={handlePayClick}/>
        </Scroll>
      ) : state.route === "mint" ? (
        <Mint uploadToPinata={uploadToPinata} mintNFT={mintNFT} />
      ) : (
        <MyNFT 
          myNfts={state.nfts} 
          isConnected={isConnected} 
          userAddress={state.address}
        />
      )}
      {state.notification && (
        <Notification
          message={state.notification.message}
          type={state.notification.type}
          onClose={() => setState(prev => ({ ...prev, notification: null }))}
        />
      )}
    </div>
  );
};

export default App;
