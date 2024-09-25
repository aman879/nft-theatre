contract;

mod error;

use error::{MintError, SetError, BuyError};

use std::{
    storage::storage_vec::*,
    auth::msg_sender,
    hash::Hash,
    call_frames::msg_asset_id,
    context::{
        msg_amount,
        this_balance,
    },
    asset::transfer,
};

struct NFTData{
    id: u64,
    owner: Identity,
    uri: str[60],
    price: u64,
    total_bought: u64,
}

abi NFT {
    #[storage(write)]
    fn constructor();

    #[storage(read, write)]
    fn mint(sub_id: Option<SubId>, _uri:str[60], _price: u64) -> AssetId;

    #[storage(read, write), payable]
    fn buy_nft(id: u64);

    #[storage(read)]
    fn get_total_count() -> u64;

    #[storage(read)]
    fn get_nft_data(id: u64) -> NFTData;

}

storage {
    item_counter: u64 = 0,
    item_map: StorageMap<u64, NFTData> = StorageMap {},
    owner: Identity = Identity::Address(Address::zero()),
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
}


impl NFT for Contract {
    #[storage(write)]
    fn constructor() {
        let sender = msg_sender().unwrap();
        storage.owner.write(sender);
    }

    #[storage(read, write)]
    fn mint( sub_id: Option<SubId>, _uri:str[60], _price: u64) -> AssetId {
        let sender = msg_sender().unwrap();
        let asset_id = AssetId::new(ContractId::this(), sub_id.unwrap_or(b256::zero()));
        require(
            storage
                .total_supply
                .get(asset_id)
                .try_read()
                .is_none(),
            MintError::NFTAlreadyMinted,
        );
        storage.item_counter.write(storage.item_counter.try_read().unwrap() + 1);

        let new_item: NFTData = NFTData {
            id: storage.item_counter.try_read().unwrap(),
            owner: sender,
            uri: _uri,
            price: _price,
            total_bought: 0,
        };

        storage.item_map.insert(storage.item_counter.try_read().unwrap(), new_item);

        asset_id
    }

    #[storage(read, write), payable]
    fn buy_nft(id: u64) {
        let asset_id = msg_asset_id();
        require(asset_id == AssetId::base(), BuyError::IncorrectAssetId);

        let amount = msg_amount();
        
        let mut nft = storage.item_map.get(id).try_read().unwrap();

        require(amount >= nft.price, BuyError::NotEnoughTokens);

        nft.total_bought += 1;

        storage.item_map.insert(id, nft);

        transfer(nft.owner, asset_id, amount);
    }

    #[storage(read)]
    fn get_total_count() -> u64 {
        storage.item_counter.read()
    }

    #[storage(read)]
    fn get_nft_data(id: u64) -> NFTData {
        return storage.item_map.get(id).try_read().unwrap();
    }

}