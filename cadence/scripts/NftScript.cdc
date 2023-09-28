import NftContract from 0xNftContract

pub fun main(account: Address): [NftContract.NFT] {

    let collectionRef = getAccount(account)
        .getCapability<&NftContract.Collection{NftContract.CollectionPublic}>(/public/NftCollection)
        .borrow()
        ?? panic("Could not bottow NftCollection reference")
    return collectionRef.getOwnedNFTs(account: account)
}