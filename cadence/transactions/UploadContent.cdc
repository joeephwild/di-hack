import ContentContract from "./contracts/Content.cdc"

// Transaction to upload content with ContentContract
transaction uploadContent() {
    prepare(acct: AuthAccount) {
        let contentContractRef = acct.borrow<&ContentContract.Collection>(from: /storage/ContentContractCollection)
            ?? panic("Missing or mis-typed ContentContract reference")

        // Upload content using ContentContract
        contentContractRef.uploadAContent(
            id_: 1,
            owner_: acct.address,
            category_: "Category 1",
            file_: "File 1",
            price_: 100,
            description_: "Description 1",
            shortDesc_: "Short Description 1",
            isPremium_: false
        )
    }
    execute {
        log("Content uploaded with ContentContract")
    }
}