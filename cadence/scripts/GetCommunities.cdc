import Communities from "./contracts/Communities.cdc"

pub fun main(): {UInt64: Info} {
    let communities: {UInt64: Info} = {}
    for info in Communities.communities.values {
        let collection = getAccount(info.owner).getCapability(Communities.CollectionPublicPath)
                    .borrow<&Communities.Collection{Communities.CollectionPublic}>()!
        let communityRef = collection.getCommunity(id: info.id)!
        communities[info.id] = Info(
            info.name,
            info.description,
            info.image,
            info.owner,
            info.id,
            communityRef.members.keys
        )
    }
    return communities
}

pub struct Info {
    pub let name: String
    pub let description: String
    pub let image: String
    pub let owner: Address
    pub let id: UInt64
    pub let members: [Address]

    init(_ name: String, _ description: String, _ image: String, _ owner: Address, _ id: UInt64, _ members: [Address]) {
      self.name = name
      self.description = description
      self.image = image
      self.owner = owner
      self.id = id
      self.members = members
    }
}