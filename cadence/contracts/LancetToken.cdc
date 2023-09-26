
pub contract interface Lancet {

    pub var totalSupply: UFix64

    pub event TokensInitialized(initialSupply: UFix64)

    pub event TokensWithdrawn(amount: UFix64, from: Address?)

    pub event TokensDeposited(amount: UFix64, to: Address?)

    
    pub resource interface Provider {

        
        pub fun withdraw(amount: UFix64): @Vault {
            post {               
                result.balance == amount:
                    "Withdrawal amount must be the same as the balance of the withdrawn Vault"
            }
        }
    }

   
    pub resource interface Receiver {

       
        pub fun deposit(from: @Vault)

     
        pub fun getSupportedVaultTypes(): {Type: Bool} {
           
            if self.getType().isSubtype(of: Type<@Lancet.Vault>()) {
                return {self.getType(): true}
            } else {
               
                return {}
            }
        }
    }

    
    pub resource interface Balance {

        /// The total balance of a vault
        ///
        pub var balance: UFix64

        init(balance: UFix64) {
            post {
                self.balance == balance:
                    "Balance must be initialized to the initial balance"
            }
        }

        /// Function that returns all the Metadata Views implemented by a Fungible Token        
        /// @return An array of Types defining the implemented views. This value will be used by       
        pub fun getViews(): [Type] {
            return []
        }

       
        pub fun resolveView(_ view: Type): AnyStruct? {
            return nil
        }
    }

    pub resource Vault: Provider, Receiver, Balance {

        /// The total balance of the vault
        pub var balance: UFix64

        // The conforming type must declare an initializer
        // that allows providing the initial balance of the Vault        
        init(balance: UFix64)

        
        pub fun withdraw(amount: UFix64): @Vault {
            pre {
                self.balance >= amount:
                    "Amount withdrawn must be less than or equal than the balance of the Vault"
            }
            post {         
                
                self.balance == before(self.balance) - amount:
                    "New Vault balance must be the difference of the previous balance and the withdrawn Vault"
            }
        }

      
        pub fun deposit(from: @Vault) {
            // Assert that the concrete type of the deposited vault is the same
            // as the vault that is accepting the deposit
            pre {
                from.isInstance(self.getType()): 
                    "Cannot deposit an incompatible token type"
            }
            post {
                self.balance == before(self.balance) + before(from.balance):
                    "New Vault balance must be the sum of the previous balance and the deposited Vault"
            }
        }
    }

  
    pub fun createEmptyVault(): @Vault {
        post {
            result.balance == 0.0: "The newly created Vault must have zero balance"
        }
    }
}