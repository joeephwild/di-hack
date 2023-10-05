import Lancet from 0xc3e6f27ffe0f6956

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