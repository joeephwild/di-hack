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
        pub(set) var lancetBalance: UFix64

        init(address: Address, username: String) {
            self.address = address
            self.username = username
            self.progress = 0
            self.earnedNFTs <- {}
            self.lancetBalance = UFix64(0.0)
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

    // function to get Lancet token balance of the user
    pub fun getLancetBalance(address: Address) UFix64 {
        let lancetRef = getAccount(address)
            .getCapability<&Lancet.Vault(FungibleToken.Balance)>(
                /public.LancetReceiver
            )
            .borrow()
            ?? panic("Could not borrow Lancet balance reference")
        
        return lancetRef.balance
    }

    // function to update Lancet token balance on the user's profile
    pub fun updateLancetBalance(username: String, balance: UFix64) {
        let profile = self.getProfile(self.signer)
        profile.lancetBalance = balance
    }
}