import UserProfileContract from "./contracts/MentorsContract.cdc"

// script to get mentor's content
pub fun getMentorContents(account: Address): [MentorContract.MentorContent] {
    let mentorContractRef = getAccount(account)
        .getCapability<&MenorContract.Contract{MentorContract.MentorContentCollection}> (
            /public/MentorContractCollection
        )
        .borrow()
        ?? panic("Could not borrow MentorContract reference")
    return mentorContractRef.getMentorContents()
}