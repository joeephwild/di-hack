import UserProfileContract from "./contracts/UserProfileContract.cdc"

// Script to get user profile data
pub fun getUserProfile(username: String): UserProfileContract.UserProfile {
    let userProfileContractRef = getAccount(0xc3e6f27ffe0f6956)
        .getCapability<&UserProfileContract.Collection{UserProfileContract.CollectionPublic}>(/public/UserProfileContractCollection)
        .borrow()
        ?? panic("Could not borrow UserProfileContract reference")

    return userProfileContractRef.getProfile(username: username)
}