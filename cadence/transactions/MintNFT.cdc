import NftContract from 0xToken

transaction {
    prepare(acct: AuthAccount) {
        let collectionRef = account.borrow<&NftContract.Collection>(from: /storage/NftCollection)
            ?? panic("Missong or mis-typed collection reference")
        // define the task name and custom image URL or data
        let taskName = ""
        let image = "our nft badges url" // joseph please remind me of this

        // mint a new NFT with the task name and custom image
        NftContract.mintNFT(taskName: taskName, image: _image)

        // now deposit the newly created nft into the user's collection
        collectionRef.deposit(token: <-NftContract.getNFTs(id: UInt64(collectionRef.length - 1)))
    }
    execute {
        log("NFT badge minted")
    }
}