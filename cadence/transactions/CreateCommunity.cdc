import Communities from "./contracts/Communities.cdc"

transaction(name: String, description: String, image: String) {

    let Collection: &Communities.Collection

    prepare(signer: AuthAccount) {
       if signer.borrow<&Communities.Collection>(from: Communities.CollectionStoragePath) == nil {
        signer.save(<- Communities.createEmptyCollection(), to: Communities.CollectionStoragePath)
        signer.link<&Communities.Collection{Communities.CollectionPublic}>(Communities.CollectionPublicPath, target: Communities.CollectionStoragePath)
       } 

       self.Collection = signer.borrow<&Communities.Collection>(from: Communities.CollectionStoragePath)!
    }

    execute {
      self.Collection.createCommunity(name: name, description: description, image: image)
    }
}
 