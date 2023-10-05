import Lancet from 0xc3e6f27ffe0f6956

transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- Lancet.createEmptyVault(), to: /storage/Vault)
    acct.link<&Lancet.Vault{FungibleToken.Balance, FungibleToken.Receiver}>(/public/Vault, target: /storage/Vault)
  }

  execute {
    log("Personal vault saved!")
  }
}