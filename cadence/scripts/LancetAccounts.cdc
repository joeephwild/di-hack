import Lancet from 0xc3e6f27ffe0f6956

// to interact with the accounts
pub fun main(account: Address){
    let publicVault = getAccount(account).getCapability(/public/Vault)
                        .borrow<&Lancet.Vault{FungibleToken.Balance}>()
                        ?? panic("Could not borrow the public Vault.")
    
    log(publicVault.balance)
}