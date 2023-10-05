import ContentContract from "./contracts/ContentContract.cdc"

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




