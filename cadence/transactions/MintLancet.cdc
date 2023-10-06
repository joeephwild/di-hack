import Lancet from 0xc3e6f27ffe0f6956

// the mint token transaction
transaction(receiverAccount: Address) {

  prepare(acct: AuthAccount) {
    let mint = acct.borrow<&Lancet.Mint>(from: /storage/Mint)
                  ?? panic("We could not borrow the Mint resource")
    
    let newVault <- mint.mintToken(amount: 50.0)

    let receiverVault = getAccount(receiverAccount).getCapability(/public/Vault)
                          .borrow<&Lancet.Vault{FungibleToken.Receiver}>()
                          ?? panic("Couldn't get the public vault :(")
    
    receiverVault.deposit(from: <- newVault)
  }

  execute {
    log("Successfully deppsited tokens into receiver account")
  }
}
