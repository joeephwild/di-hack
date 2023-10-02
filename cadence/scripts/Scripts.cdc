import NftContract from 0xNftContract
import ContentContract from 0xContentContract
import Lancet from 0xLancet
import UserProfileContract from 0xUserProfileContract

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

//Script to check Lancet token balance
pub fun checkTokenBalance(): Int {
    let lancetRef = getAccount(0xLancetAddress)
        .getCapability<&Lancet.Collection{Lancet.CollectionPublic}>(/public/LancetCollection)
        .borrow()
        ?? panic("Could not borrow Lancet reference")

    return lancetRef.getBalance()
}

// Script to get user profile data
pub fun getUserProfile(username: String): UserProfileContract.UserProfile {
    let userProfileContractRef = getAccount(0xUserProfileContractAddress)
        .getCapability<&UserProfileContract.Collection{UserProfileContract.CollectionPublic}>(/public/UserProfileContractCollection)
        .borrow()
        ?? panic("Could not borrow UserProfileContract reference")

    return userProfileContractRef.getProfile(username: username)
}
