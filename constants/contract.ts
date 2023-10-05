export const getToken = `
import Lancet from 0xc3e6f27ffe0f6956

pub fun checkTokenBalance(): Int {
    let lancetRef = getAccount(0xLancetAddress)
        .getCapability<&Lancet.Collection{Lancet.CollectionPublic}>(/public/LancetCollection)
        .borrow()
        ?? panic("Could not borrow Lancet reference")

    return lancetRef.getBalance()
}
`;

export const claimNFTS = `
c3e6f27ffe0f6956
transaction claimNft(taskName: String, image: String) {
    prepare(acct: AuthAccount) {
        let collectionRef = acct.borrow<&NftContract.Collection>(from: /storage/NftCollection)
            ?? panic("Missing or mis-typed collection reference")

        // mint the new nft with provided taskName and image
        let image = "QmRaRjEUNKDTTsXxBv8gcz5vYW8nzfycknveC3ReAJN9D5"
        collectionRef.mintNFT(taskName: taskName, image: image)
        
        // find the ID of the newly minted NFT
        let nftID = collectionRef.nfts.length - 1

        // automatically update the taskName of the newly minted NFT
        collectionRef.markTaskCompleted(nftID: nftID, taskName: taskName)
    }
    execute {
        log("NFT minted and taskName updated")
    }
}
`;

export const createPodcast = `
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
`;

export const payForContent = `
transaction payForContent(contentId: UInt64, paymentAmount: UInt64) {
    prepare(acct: AuthAccount) {
        let contentContractRef = acct.borrow<&ContentContract.Collection>(from: /storage/ContentContractCollection)
            ?? panic("Missing or mis-typed ContentContract reference")

        // Pay for content using LancetToken
        contentContractRef.payForContent(contentId: contentId, paymentAmount: paymentAmount)
    }
    execute {
        log("Content purchased with LancetToken")
    }
}
`;

export const createProfile = `
transaction createUserProfile(username: String) {
    prepare(acct: AuthAccount) {
        let userProfileContractRef = acct.borrow<&UserProfileContract.Collection>(from: /storage/UserProfileContractCollection)
            ?? panic("Missing or mis-typed UserProfileContract reference")

        // Create a user profile using UserProfileContract
        userProfileContractRef.createProfile(username: username)
    }
    execute {
        log("User profile created with UserProfileContract")
    }
}
`;

//0xbf75bc005a7b189f
