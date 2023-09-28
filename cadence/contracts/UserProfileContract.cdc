import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import NFTContract from 0xNFTContract

pub contract UserProfileContract {
    // this defines the resources for users profiles
    pub resource UserProfile {
        pub(set) var address: Address
        pub(set) var username: String
        pub(set) var progress: UInt32
        pub(set) var earnedNFTs: @{UInt64: NFTContract.NFT}

        init(address: Address, username: String) {
            self.address = address
            self.username = username
            self.progress = 0
            self.earnedNFTs <- {}
        }
    }

    // initialize
    pub init() {}

    // function to create a user's profile
    pub fun createProfile(username: String): @UserProfile {
        return <- create UserProfile(address: self.signer, username: username)
    }

    // function to get user's profile
    pub fun getProfile(address: Address): &UserProfile {
        return &self.account.addresses[address] as &UserProfile
    }

    // function to update the user's progress
    pub fun updateProgress(username: String, amount: UInt32) {
        let profile = self.getProfile(self.signer)
        profile.progress += amount
    }

    // function to award nft to a user
    pub fun grantNFT(username: String, nft: NFTContract.NFT) {
        let profile = self.getProfile(self.signer)
        profile.earnedNFTs[nft.id] = nft
    }

    // function to list earned nfts
    pub fun listEarnedNFTs(username: String): @{UInt64: NFTContract.NFT} {
        let profile = self.getProfile(self.signer)
        return profile.earnedNFTs
    }
}