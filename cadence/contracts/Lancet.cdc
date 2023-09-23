pub contract Lancet {

    pub resource Lancet {
        pub var balance: Int

        init(balance: Int) {
            self.balance = balance
        }
    }

    //initialising the contract with an empty colelction of tokens
    pub init() {}


    pub fun createLancet(balance: Int): @Lancet {
        return <- create Lancet(balance: balance)
    }

    pub fun transfer(from: @Lancet, to: Address, amount: Int) {

        if from.balance >= amount {
            from.balance = from.balance - amount

            let recipient: PublicAccount = getAccount(to)
            recipient.withdraw(from.balance + amount)
        } else {
            panic("Insufficient balance")
        }
    }

    pub fun getBalance(token: &Lancet): Int {
        return token.balance
    }



}