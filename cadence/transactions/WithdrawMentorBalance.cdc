import MentorContract from "./contracts/MentorsContract.cdc"

// mentor withdraw earning script
transaction withdrawFunds(contentId: UInt64) {
    let mentorContractRef: &MentorContract.Contract
    prepare(signer: AuthAccount) {
        // Get a reference to the MentorContract
        self.mentorContractRef = signer.borrow<&MentorContract.Contract>(from: /storage/MentorContract)
            ?? panic("MentorContract not found in storage")
    }
    execute {
        // Call the withdrawEarnings function to withdraw earnings for a specific content
        self.mentorContractRef.withdrawEarnings(contentId: contentId)
    }
}
