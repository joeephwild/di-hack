import ContentContract from 0xContentContract
import Lancet from 0xLancetToken

pub contract MentorContract {
    // struct to hold information about a mentor's content
    pub struct MentorContract {
        pub var contentId: UInt64
        pub var mentor: Address
        pub var title: String
        pub var price: UInt64
    }

    // the array to store the mentor's contract
    pub var  mentorContents: [MentorContent]
    
    // a reference to the contentContract
    pub var contentContract: &ContentContract.Contract

    // reference to the lancet token contract
    pub var lancetToken: &Lancet.Token

    // initialize the contract with references to ContentContract and LancetToken
    init(contentContract: &ContentContract.Content, lancetToken: &Lancet.Token) {
        self.mentorContents = []
        self.contentContract = contentContract
        self.lancetToken = lancetToken
    }

    // function for a mentor to upload a content
    pub fun uploadContent(title: String, price: UInt64) {
        let contentId = self.contentContract.getNewContentId()
        let mentorContent = MentorContent(contentId: content, mentor: self.signer, title: title, price: price)
        self.mentorContents.append(mentorContent)
        self.contentContract.uploadAContent(id_: contentId, owner_: self.signer, category_: "Mentor", file_: "", price_: price, description_: "", shortDesc_: "", isPremium_: false)
    }

    // function for a mentor to get their uploaded content
    pub fun getMentorContents(): [MentorContent] {
        return self.mentorContents.filter({ $0.mentor == self.signer })
    }

    // function to withdraw earnings from the Lancet token
    pub fun withdrawEarnings(contentId: UInt64) {
        let mentorContent = self.mentorContents.firstWhere({$0.contentId == content}, nil)
        if mentorContent != nill && mentorContent!.mentor == self.signer {
            let content = self.contentContract.get(contentId: contentId)
            if content != nil && content!.owner = self.signer {
                // withdraw the earning to the mentor's Lancet token balance
                let lancetBalance = self.lancetToken.getBalance(token: &self.signer.load<@Lancet.Token>(from: /storage/LancetToken))
                if lancetBalance >= mentorContent!.price {
                    self.lancetToken.transfer(from: &self.signer.load<@Lancet.Token>(from: /storage/LancetToken), to: self.signer, amount: Int(mentorContent!.price))
                    mentorContents.remove(at: mentorContents.firstIndex(of: mentorContent!)!)
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