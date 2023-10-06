transaction {
    prepare(signer: AuthAccount) {
        let userProfileContract <- UserProfileContract.init(
            learningLanguage: "English",
            speakingLanguage: "Spanish",
            username: "user123"
        )

        signer.save(<-userProfileContract, to: /storage/UserProfileContract)
        signer.link<&UserProfileContract.UserProfileContract>(/public/UserProfileContract, target: /storage/UserProfileContract)
    }
}
