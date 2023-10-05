import UserProfileContract from "./contracts/UserProfileContract"

// Transaction to create a user profile with UserProfileContract
transaction createUserProfile(username: String) {
    prepare(acct: AuthAccount) {
        let userProfileContractRef = acct.borrow<&UserProfileContract.Collection>(from: /storage/UserProfileContractCollection)
            ?? panic("Missing or mis-typed UserProfileContract reference")

        // Create a user profile using UserProfileContract
        userProfileContractRef.createProfile(username: username)
    }
    execute {
        log("User profile created with UserProfileContract")
    }
}