contract;

mod error;

use error::{MintError, SetError};

use std::{
    auth::msg_sender,
    hash::Hash,
};

struct NFTData{
    id: u64,
    owner: Identity,
    uri: str[60],
}

abi NFT {
    #[storage(write)]
    fn constructor();

    #[storage(read, write)]
    fn mint(sub_id: Option<SubId>, _uri:str[60]) -> AssetId;

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
    fn mint( sub_id: Option<SubId>, _uri:str[60]) -> AssetId {
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
        };

        storage.item_map.insert(storage.item_counter.try_read().unwrap(), new_item);

        asset_id
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