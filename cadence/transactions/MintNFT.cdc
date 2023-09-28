import NftContract from 0xNftContract

transaction(taskName: String, image: String) {
    prepare(acct: AuthAccount) {
        let collectionRef = acct.borrow<&NftContract.Collection>(from: /storage/NftCollection)
            ?? panic("Missing or mis-typed collection reference")

        // mint the new nft with provided taskName and image
        let image = "QmRaRjEUNKDTTsXxBv8gcz5vYW8nzfycknveC3ReAJN9D5"
        collectionRef.mintNFT(taskName: taskName, image: image)
        
        // find the ID of the newly minted NFT
        let nftID = collectionRef.nfts.length - 1

        // automatically update the taskName of the newly minted NFT
        collectionRef.markTaskCompleted(nftID: nftID, taskName: taskName)
    }
    execute {
        log("NFT minted and taskName updated")
    }
}
