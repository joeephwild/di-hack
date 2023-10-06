import Lancet from 0xc3e6f27ffe0f6956

pub contract ContentContract {

    pub let signer: Address?

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

    pub struct Podcast {
        pub var id: UInt64
        pub var owner: Address
        pub var title: String
        pub var file: String

        init(id: UInt64, owner: Address, title: String, file: String) {
            self.id = id
            self.owner = owner
            self.title = title
            self.file = file
        }
    }

    pub var allContent: [Content]
    pub var contentId: UInt64
    pub var addressToContent: {Address: Content?}
    pub var allPodcasts: [Podcast]
    pub var podcastId: UInt64
    pub var addressToPodcast: {Address: Podcast?}

    init() {
        self.allContent = []
        self.addressToContent = {}
        self.contentId = 0
        self.allPodcasts = []
        self.addressToPodcast = {}
        self.podcastId = 0
    }

    pub fun setSigner(signer: Address) {
        self.signer = signer
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

    pub fun uploadPodcast(
        id_: UInt64,
        owner_: Address,
        title_: String,
        file_: String
    ) {
        // self.podcastId = self.podcastId + 1

        let podcast = Podcast(
            id: id_,
            owner: owner_,
            title: title_,
            file: file_
        )

        self.allPodcasts.append(podcast)
        self.addressToPodcast[owner_] = podcast
    }

    // Function to purchase content using Lancet tokens
    pub fun payForContent(contentId: UInt64) {
        let content = self.getContent(contentId: contentId)

        if content == nil {
            panic("Content not available")
        }

        if content?.owner == self.signer {
            panic("Content is already owned by the caller")
        }

        // Access Lancet contract using its interface
        let lancetRef = getAccount(self.signer)
            .getCapability<&Lancet.Token{Lancet.Receiver}>(
                /public/LancetTokenReceiver
            )
            .borrow()
            ?? panic("Could not borrow Lancet Token Receiver capability")

        if lancetRef.balance < content?.price {
            panic("Insufficient Lancet token balance")
        }

        // Transfer Lancet tokens to the content owner
        let receiver = content?.owner
        let amount = content?.price

        lancetRef.transfer(to: receiver, amount: amount)

        // Update the owner of the content
        content?.owner = self.signer

        log("Content purchased successfully")
    }

    pub fun getContent(contentId: UInt64): Content? {
        if contentId < UInt64(self.allContent.length) {
            return self.allContent[contentId]
        }
        return nil
    }

    pub fun getPodcast(podcastId: UInt64): Podcast? {
        if podcastId < UInt64(self.allPodcasts.length) {
            return self.allPodcasts[podcastId]
        }
        return nil
    }

    pub fun listAllPodcasts(): [Podcast] {
        return self.allPodcasts
    }

    pub fun listAllContent(): [Content] {
        return self.allContent
    }

    pub fun listPremiumContent(): [Content] {
        return self.allContent.filter(fun  (content: Content): Bool {
            return content.isPremium
        })
        // return self.allContent.filter({ $0.isPremium })
    }
}