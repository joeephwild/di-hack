// importing the flow module
import FlowToken from 0xToken

pub contract NftContract {
    pub struct NFT {
        pub var id: UInt64
        pub var image: String
        pub var owner: Address
        pub var taskName: String
        pub var taskCompleted: Bool
    }

    // define the array to store the NFTs
    pub var nfts: [NFT]

    // initialize
    init(_image: String) {
        self.nfts = []

        self.image = _image
    }

    // function to create a new NFT and assign to the caller
    pub fun mintNFT(taskName: String, image: String) {
        let newNFT = NFT(id: UInt64(self.nfts.length), owner: self.signer, _image: image, taskName: taskName taskCompleted: false)
        self.nfts.append(newNFT)
    }

    // select a specific nft as completed by its owner
    pub fun markTaskCompleted(nftID: UInt64) {
        let nftRef = self.getNFTByID(nftID)
        if nftRef.owner == self.signer {
            nftRef.taskCompleted = true
            // automatically update the task name when the task is completed
            nftRef.taskName = "Yay, You Rock!"
        }
    }

    // Get the NFTs owned by the caller
    pub fun getOwnedNFTs(): [NFT] {
        return self.nfts.filter({ $0.owner == self.signer })
    }

    // helper function to retrieve an NFT by its ID
    pub fun getNFTByID(id: UInt64): &NFT {
        return &self.nftsp[id] as &NFT
    }
}