pub contract ContentContract {
    // Struct to hold the info of very content
    pub struct Content {
        pub var id: UInt64
        pub var owner: Address
        pub var category: String
        pub var file: String
        pub var price: UInt64
        pub var description: String
        pub var shortDesc: String
        pub var isPremium: Bool

        init(id: UInt64, owner: Address, category: String, file: String, price: UInt64, description: String, shortDesc: String, isPremium: Bool) {
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

    // Define the array to store the Content
    pub var allContent: [Content]

    // Define the id of a content
    pub var contentId: UInt256

    // Dictionary to map an address to a content
    pub var addressToContent: {Address: Content}

    init() {
        self.allContent = []
        self.addressToContent = {}
        self.contentId = 0
    }

    // Function to upload a content to the blockchain
    pub fun uploadAContent(
        id_: UInt64,
        owner_: Address,
        category_: String,
        file_: String,
        price_: UInt64,
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

    // Function to purchase the content 
    pub fun payForContent(contentId: UInt64) {
        let content = self.get(contentId: contentId)
        if let content = content {
            // Ensure the content isn't already owned by the user
            if content.owner != self.signer {
                // Payment logic here
            } else {
                // This should signify the content is owned by the caller
            }
        } else {
            // Implementation of content not available
        }
    }

    // Function to get the content by ID
    pub fun get(contentId: UInt64): &Content? {
        if contentId < UInt64(self.allContent.length) {
            return &self.allContent[contentId]
        }
        return nil
    }

    // Function to list all available content
    pub fun listAllContent(): [Content] {
        return self.allContent
    }

    // Function to list all premium items
    pub fun listPremiumContent(): [Content] {
        return self.allContent.filter({ $0.isPremium })
    }
}