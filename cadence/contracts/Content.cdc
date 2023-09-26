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

        init(){
         self.id = 0
         self.owner = 0x0
         self.category = ""
         self.file = ""
         self.price = 0
         self.description = ""
         self.shortDesc = ""
         self.isPremium = false
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
         id: _id,
         
        )
        self.allContent.append(content)
        self.addressToContent[owner_] = content
    }

    // Function to purchase the content 
    pub fun payForContent(contentId: UInt64) {
        // Implement your logic here
    }
}