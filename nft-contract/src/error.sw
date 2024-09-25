library;

pub enum MintError {
    CannotMintMoreThanOneNFTWithSubId: (),
    NFTAlreadyMinted: (),
}

pub enum SetError {
    ValueAlreadySet: (),
}

pub enum BuyError {
    IncorrectAssetId: (),
    NotEnoughTokens: (),
}