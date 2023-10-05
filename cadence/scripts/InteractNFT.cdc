import LancetNFT from 0xc3e6f27ffe0f6956

// script to interact with the NFT contract
pub fun main(account: Address): Int{

    nftCollection = getAccount(account).getCapability(/public/LancetNFTCollection)
                      .borrow<LancetNFTCollection(LancetNFT.CollectionPublic)>()
                      ?? panic("NFT does not exist")
    let info: [String] = []

    let nftRef = nftCollection.borrowEntireNFT(id: nftCollection.getIDs()[0])
    info.append(nftRef.image)
    info.append(nftRef.name)
    return info
}
