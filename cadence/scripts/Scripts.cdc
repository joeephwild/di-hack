import NftContract from 0xNftContract
import ContentContract from 0xContentContract
import Lancet from 0xc3e6f27ffe0f6956
import UserProfileContract from 0xUserProfileContract
import FungibleToken from 0xc3e6f27ffe0f6956

// to interact with the accounts
pub fun main(account: Address){
    let publicVault = getAccount(account).getCapability(/public/Vault)
                        .borrow<&Lancet.Vault{FungibleToken.Balance}>()
                        ?? panic("Could not borrow the public Vault.")
    
    log(publicVault.balance)
}

//to display the balance of totalSupply
pub fun main(){
   log(Lancet.totalSupply)
}

// script to interact with the NFT contract
pub fun main(account: Address): [NftContract.NFT] {

    let collectionRef = getAccount(account)
        .getCapability<&NftContract.Collection{NftContract.CollectionPublic}>(/public/NftCollection)
        .borrow()
        ?? panic("Could not bottow NftCollection reference")
    return collectionRef.getOwnedNFTs(account: account)
}

// script to list all content from ContentContract
pub fun listAllContent(): [ContentContract.Content] {
    let contentContractRef = getAccount(0xContentContractAddress)
        .getCapability<&ContentContract.Collection{ContentContract.CollectionPublic}>(/public/ContentContractCollection)
        .borrow()
        ?? panic("Could not borrow ContentContract reference")

    return contentContractRef.listAllContent()
}

// Script to get user profile data
pub fun getUserProfile(username: String): UserProfileContract.UserProfile {
    let userProfileContractRef = getAccount(0xUserProfileContractAddress)
        .getCapability<&UserProfileContract.Collection{UserProfileContract.CollectionPublic}>(/public/UserProfileContractCollection)
        .borrow()
        ?? panic("Could not borrow UserProfileContract reference")

    return userProfileContractRef.getProfile(username: username)
}

// script to get mentor's content
pub fun getMentorContents(account: Address): [MenorContract.MentorContent] {
    let mentorContractRef = getAccount(account)
        .getCapability<&MenorContract.Contract{MentorContract.MentorContentCollection}> (
            /public/MentorContractCollection
        )
        .borrow()
        ?? panic("Could not borrow MentorContract reference")
    return mentorContractRef.getMentorContents()
}