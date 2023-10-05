import ContentContract from "./contracts/ContentContract.cdc"
import Lancet from 0xc3e6f27ffe0f6956
import UserProfileContract from "./contracts/UserProfileContract.cdc"
import MentorContract from "./contracts/MentorsContract.cdc"
import FungibleToken from 0xc3e6f27ffe0f6956
import LancetNFT from "./contracts/LancetToken.cdc"

// the mint token transaction
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

// the create vault transaction
transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- Lancet.createEmptyVault(), to: /storage/Vault)
    acct.link<&Lancet.Vault{FungibleToken.Balance, FungibleToken.Receiver}>(/public/Vault, target: /storage/Vault)
  }

  execute {
    log("Personal vault saved!")
  }
}

// the transfer function
transaction(receiverAccount: Address, amount: UFix64) {

  prepare(acct: AuthAccount) {
    let signerVault = acct.borrow<&Lancet.Vault>(from: /storage/Vault)
                        ?? panic("Signer's vault not available")
    let receiverVault = getAccount(receiverAccount).getCapability(/public/Vault)
                          .borrow<&Lancet.Vault{FungibleToken.Receiver}>()
                          ?? panic("Couldn't get the public vault :(")

    receiverVault.deposit(from: <- signerVault.withdraw(amount: amount))
  }

  execute {
    log("Lacent Transferred!")
  }
}

// the mint nft transaction
transaction(image: String, name: String) {

  prepare(acct: AuthAccount) {
    // assigning a collection to the signer if it doesn't exist
    if acct.borrow<&LancetNFT.Collection>(from: /storage/LancetNFTCollection) == nil {
      acct.save(<- LancetNFT.createEmptyCollection(), to: /storage/LancetNFTCollection)
      acct.link<&LancetNFT.Collection{LancetNFT.CollectionPublic}>(/public/LancetNFTCollection, target: /storage/LancetNFTCollection)
    }

    let nftCollection = acct.borrow<&LancetNFT.Collection>(from: /storage/LancetNFTCollection)!

    nftCollection.deposit(token: <- LancetNFT.mintNFT(image: image, name: name))
  }

  execute {
    log("NFT Minted!")
  }
}



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

// Transaction to create a user profile with UserProfileContract
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

// mentor upload content sscript
transaction uploaMentorContent(title: String, price: UInt64) {
    let mentorContractRef: &MentorContract.Contract
    prepare(signer: AuthAccount) {
        // Get a reference to the MentorContract
        self.mentorContractRef = signer.borrow<&MentorContract.Contract>(from: /storage/MentorContract)
            ?? panic("MentorContract not found in storage")
    }
    execute {
        // Call the uploadContent function to upload mentor's content
        self.mentorContractRef.uploadContent(title: title, price: price)
    }
}

// mentor withdraw earning script
transaction withdrawFunds(contentId: UInt64) {
    let mentorContractRef: &MentorContract.Contract
    prepare(signer: AuthAccount) {
        // Get a reference to the MentorContract
        self.mentorContractRef = signer.borrow<&MentorContract.Contract>(from: /storage/MentorContract)
            ?? panic("MentorContract not found in storage")
    }
    execute {
        // Call the withdrawEarnings function to withdraw earnings for a specific content
        self.mentorContractRef.withdrawEarnings(contentId: contentId)
    }
}
