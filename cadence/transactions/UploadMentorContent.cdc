import MentorContract from "./contracts/MentorsContract.cdc"

// mentor upload content sscript
transaction uploaMentorContent(title: String, price: UInt64) {
    let mentorContractRef: &MentorContract.Contract
    prepare(signer: AuthAccount) {
        // Get a reference to the MentorContract
        self.mentorContractRef = signer.borrow<&MentorContract.Contract>(from: /storage/MentorContract)
            ?? panic("MentorContract not found in storage")
    }
    execute {
        // Call the uploadContent function to upload mentor's content
        self.mentorContractRef.uploadContent(title: title, price: price)
    }
}