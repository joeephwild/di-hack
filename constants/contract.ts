export const getToken = `
import Lancet from 0xc3e6f27ffe0f6956

transaction(receiverAccount: Address) {

    prepare(acct: AuthAccount) {
      let mint = acct.borrow<&Lancet.Mint>(from: /storage/Mint)
                    ?? panic("We could not borrow the Mint resource")
      
      let newVault <- mint.mintToken(amount: 20.0)
  
      let receiverVault = getAccount(receiverAccount).getCapability(/public/Vault)
                            .borrow<&Lancet.Vault{FungibleToken.Receiver}>()
                            ?? panic("Couldn't get the public vault :(")
      
      receiverVault.deposit(from: <- newVault)
    }
  
    execute {
      log("Successfully deppsited tokens into receiver account")
    }
  }
`;

export const claimNFTS = `
import LancetNFT from 0xc3e6f27ffe0f6956

pub fun main(account: Address): Int{

    nftCollection = getAccount(account).getCapability(/public/LancetNFTCollection)
                      .borrow<LancetNFTCollection(LancetNFT.CollectionPublic)>()
                      ?? panic("NFT does not exist")
    let info: [String] = []

    let nftRef = nftCollection.borrowEntireNFT(id: nftCollection.getIDs()[0])
    info.append(nftRef.image)
    info.append(nftRef.name)
    return info
}
`;

export const createPodcast = `
import ContentContract from 0xc3e6f27ffe0f6956

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
import ContentContract from 0xc3e6f27ffe0f6956

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
import UserProfileContract from 0xc3e6f27ffe0f6956

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
