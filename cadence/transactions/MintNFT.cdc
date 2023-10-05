import LacentNFT from 0xc3e6f27ffe0f6956
// the mint nft transaction
transaction(image: String, name: String) {

  prepare(acct: AuthAccount) {
    // assigning a collection to the signer if it doesn't exist
    if acct.borrow<&LancetNFT.Collection>(from: /storage/LancetNFTCollection) == nil {
      acct.save(<- LancetNFT.createEmptyCollection(), to: /storage/LancetNFTCollection)
      acct.link<&LancetNFT.Collection{LancetNFT.CollectionPublic}>(/public/LancetNFTCollection, target: /storage/LancetNFTCollection)
    }

    let nftCollection = acct.borrow<&LancetNFT.Collection>(from: /storage/LancetNFTCollection)!

    nftCollection.deposit(token: <- LancetNFT.mintNFT(image: image, name: name))
  }

  execute {
    log("NFT Minted!")
  }
}