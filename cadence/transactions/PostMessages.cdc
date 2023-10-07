import Communities from "./contracts/Communities.cdc"

transaction(id: UInt64, owner: Address, content: String) {

    let Collection: &Communities.Collection

    prepare(signer: AuthAccount) {
       if signer.borrow<&Communities.Collection>(from: Communities.CollectionStoragePath) == nil {
        signer.save(<- Communities.createEmptyCollection(), to: Communities.CollectionStoragePath)
        signer.link<&Communities.Collection{Communities.CollectionPublic}>(Communities.CollectionPublicPath, target: Communities.CollectionStoragePath)
       } 

       self.Collection = signer.borrow<&Communities.Collection>(from: Communities.CollectionStoragePath)!
    }

    execute {
      self.Collection.postMessage(id: id, owner: owner, content: content)
    }
}
 