import FungibleToken from "./interfaces/FungibleToken.cdc"

pub contract Lancet: FungibleToken {
     
    pub var totalSupply: UFix64

    pub event TokensInitialized(initialSupply: UFix64)
    pub event TokensWithdrawn(amount: UFix64, from: Address?)
    pub event TokensDeposited(amount: UFix64, to: Address?)


    pub resource Vault: FungibleToken.Provider, FungibleToken.Receiver, FungibleToken.Balance{
        pub var balance: UFix64

        pub fun deposit(from: @FungibleToken.Vault) {
            let vault <- from as! @Lancet.Vault
            emit TokensDeposited(amount: vault.balance, to: self.owner?.address)
            self.balance = self.balance + vault.balance

            vault.balance = 0.0
            destroy vault
        }

        pub fun withdraw(amount: UFix64): @FungibleToken.Vault {
            self.balance = self.balance - amount
            emit TokensWithdrawn(amount: amount, from: self.owner?.address)
            return <- create Vault(balance: amount)
        }

        init(balance: UFix64) {
            self.balance = balance
        }

        destroy() {
            Lancet.totalSupply = Lancet.totalSupply - self.balance
        }
    }

    pub fun createEmptyVault(): @FungibleToken.Vault {
        return <- create Vault(balance: 0.0)
    }

    pub resource Mint {
        pub fun mintToken(amount: UFix64): @FungibleToken.Vault {
            Lancet.totalSupply = Lancet.totalSupply + amount
            return <-create Vault(balance: amount)
        }
        
        init() {

        }
    }

    init() {
        self.totalSupply = 0.0

        self.account.save(<- create Mint(), to: /storage/Mint)
    }

}