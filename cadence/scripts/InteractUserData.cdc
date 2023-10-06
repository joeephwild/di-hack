import UserProfileContract from 0xc3e6f27ffe0f6956

pub fun main(): {String, String, String} {
    let userProfile = getAccount(0xc3e6f27ffe0f6956).getCapability<&UserProfileContract.UserProfileContract>(/public/UserProfileContract).borrow()

    if let userProfile = userProfile {
        let learningLanguage = userProfile.getLearningLanguage()
        let speakingLanguage = userProfile.getSpeakingLanguage()
        let username = userProfile.getUsername()
        
        return (learningLanguage, speakingLanguage, username)
    } else {
        panic("UserProfileContract not found or could not be borrowed")
    }
}
