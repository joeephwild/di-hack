import ContentContract from "./Content.cdc"
import Lancet from 0xc3e6f27ffe0f6956

pub contract MentorContract {
    pub let signer: Address?
    // struct to hold information about a mentor's content
    pub struct MentorContent {
        pub var contentId: UInt64
        pub var mentor: Address
        pub var title: String
        pub var price: UInt64
    }

    // the array to store the mentor's contract
    pub var  mentorContents: [MentorContent]
    
    // a reference to the contentContract
    pub var contentContract: &ContentContract.Contract

    // reference to the Lancet token contract
    pub var lancet: &Lancet.Token

    // initialize the contract with references to ContentContract and Lancet
    init(contentContract: &ContentContract.Contract, lancet: &Lancet.Token) {
        self.mentorContents = []
        self.contentContract = contentContract
        self.lancet = lancet
    }

    pub fun getSigner(): Address {
        return self.signer!
    }
    // function for a mentor to upload a content
    pub fun uploadContent(title: String, price: UFix64) {
        if self.signer == nil {
            panic("Signer not set")
        }
        let contentId = self.contentContract.getNewContentId()
        let mentorContent = MentorContent(contentId: contentId, mentor: self.signer, title: title, price: price)
        self.mentorContents.append(mentorContent)
        self.contentContract.uploadAContent(id_: contentId, owner_: self.signer, category_: "Mentor", file_: "", price_: UFix64(price), description_: "", shortDesc_: "", isPremium_: false)
    }

    // function for a mentor to get their uploaded content
    pub fun getMentorContents(): [MentorContent] {
        return self.mentorContents.filter(fun (mentorContents: MentorContent): Bool {
            return mentorContents.mentor == self.signer
        })
    }

    // function to withdraw earnings from the Lancet token
    pub fun withdrawEarnings(contentId: UInt64) {
        if self.signer == nil {
            panic("Signer is not set")
        }
        let mentorContent = self.mentorContents.firstWhere(
            fun (mentorContent: MentorContent): Bool {
                return mentorContent.contentId == contentId
            },
            or: panic("Mentor content not found")
        )

        if mentorContent.mentor == self.signer {
            let content = self.contentContract.get(contentId: contentId)
            if content.owner == self.signer {
                // Cast the Vault resource to the appropriate type
                let lancetTokenVault: @Lancet.Token = self.signer!.load<@Lancet.Token>(from: /storage/LancetToken)

                // Get the Lancet token balance
                let lancetBalance = self.lancet.getBalance(account: lancetTokenVault)

                if lancetBalance >= UFix64(mentorContent.price) {
                    self.lancet.transfer(from: lancetTokenVault, to: self.signer!, amount: UFix64(mentorContent.price))
                    self.mentorContents.remove(at: self.mentorContents.firstIndex(of: mentorContent)!)
                } else {
                    panic("Insufficient balance in Lancet Token")
                }
            } else {
                panic("You do not own this content")
            }
        } else {
            panic("Content not found or you are not the mentor")
        }
    }

}
