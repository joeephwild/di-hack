import ContentContract from "./contracts/ContentContract.cdc"

// script to list all content from ContentContract
pub fun listAllContent(): [ContentContract.Content] {
    let contentContractRef = getAccount(0xContentContractAddress)
        .getCapability<&ContentContract.Collection{ContentContract.CollectionPublic}>(/public/ContentContractCollection)
        .borrow()
        ?? panic("Could not borrow ContentContract reference")

    return contentContractRef.listAllContent()
}
