import Lancet from 0xc3e6f27ffe0f6956

pub contract ContentContract {
    pub struct Content {
        pub var id: UInt64
        pub var owner: Address
        pub var category: String
        pub var file: String
        pub var price: UFix64 // Price in Lancet tokens
        pub var description: String
        pub var shortDesc: String
        pub var isPremium: Bool

        init(id: UInt64, owner: Address, category: String, file: String, price: UFix64, description: String, shortDesc: String, isPremium: Bool) {
            self.id = id
            self.owner = owner
            self.category = category
            self.file = file
            self.price = price
            self.description = description
            self.shortDesc = shortDesc
            self.isPremium = isPremium
        }
    }

    pub var allContent: [Content]
    pub var contentId: UInt256
    pub var addressToContent: {Address: Content}

    init() {
        self.allContent = []
        self.addressToContent = {}
        self.contentId = 0
    }

    pub fun uploadAContent(
        id_: UInt64,
        owner_: Address,
        category_: String,
        file_: String,
        price_: UFix64,
        description_: String,
        shortDesc_: String,
        isPremium_: Bool
    ) {
        let content = Content(
            id: id_,
            owner: owner_,
            category: category_,
            file: file_,
            price: price_,
            description: description_,
            shortDesc: shortDesc_,
            isPremium: isPremium_
        )

        self.allContent.append(content)
        self.addressToContent[owner_] = content
    }

    // Function to purchase content using Lancet tokens
    pub fun payForContent(contentId: UInt64) {
        let content = self.get(contentId: contentId)

        if content == nil {
            panic("Content not available")
        }

        if content!.owner == self.signer {
            panic("Content is already owned by the caller")
        }

        if self.balance < content!.price {
            panic("Insufficient Lancet token balance")
        }

        // Transfer Lancet tokens to the content owner
        let receiver = content!.owner
        let amount = content!.price

        // Transfer Lancet tokens using the Lancet contract
        Lancet.transfer(from: self.account, to: receiver, amount: amount)

        // Update the owner of the content
        content!.owner = self.signer

        log("Content purchased successfully")
    }

    pub fun get(contentId: UInt64): &Content? {
        if contentId < UInt64(self.allContent.length) {
            return &self.allContent[contentId]
        }
        return nil
    }

    pub fun listAllContent(): [Content] {
        return self.allContent
    }

    pub fun listPremiumContent(): [Content] {
        return self.allContent.filter({ $0.isPremium })
    }
}
