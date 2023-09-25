import FungibleToken from 0x0

pub contract Lancet {

    pub resource Token {
        pub(set) var balance: Int

        init(balance: Int) {
            self.balance = balance
        }
    }

    //initialising the contract with an empty colelction of tokens
    pub init() {}


    pub fun createLancet(balance: Int): @Token {
        return <- create Token(balance: balance)
    }

    pub fun transfer(from: @Token, to: Address, amount: Int) {

        if from.balance >= amount {
        //creating a new Token resource with the updated balance
            let newBalance = from.balance - amount
            let updatedFrom <- from.with(balance: newBalance)

            //transfering the u pdated resource back to 'from'
            from <- updatedFrom

            let recipient: PublicAccount = getAccount(to)
            recipient.withdraw(amount)
        } else {
            panic("Insufficient balance")
        }
    }

    pub fun getBalance(token: &Token): Int {
        return token.balance
    }



}