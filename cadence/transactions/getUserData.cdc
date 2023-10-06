transaction {
    prepare(signer: AuthAccount) {
        let userProfileContract <- UserProfileContract.init(
            learningLanguage: "Mandarin",
            speakingLanguage: "English",
            username: "ebbiaden"
        )

        signer.save(<-userProfileContract, to: /storage/UserProfileContract)
        signer.link<&UserProfileContract.UserProfileContract>(/public/UserProfileContract, target: /storage/UserProfileContract)
    }
}
