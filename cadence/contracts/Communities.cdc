pub contract Communities {
  
  pub let CollectionPublicPath: PublicPath
  pub let CollectionStoragePath: StoragePath

  pub let community: {UInt64: CommunityInfo}

  pub struct CommunityInfo {
    pub let name: String
    pub let description: String
    pub let image: String
    pub let owner: Address
    pub let id: UInt64

    init(_ name: String, _ description: String, _ image: String, _ owner: Address, _ id: UInt64) {
      self.name = name
      self.description = description
      self.image = image
      self.owner = owner
      self.id = id
    }
  }

  pub struct Message {
    pub let content: String
    pub let timestamp: UFix64
    pub let author: Address

    init(_ content: String, _ timestamp: UFix64, _ author: Address) {
      self.content = content
      self.timestamp = timestamp
      self.author = author
    }
  }

  pub resource Community {
    pub let info: CommunityInfo
    pub let members: {Address: Bool}
    pub let messages: [Message]

    access(contract) fun join(user: Address) {
      self.members[user] = true
    }

    access(contract) fun leave(user: Address) {
      self.members.remove(key: user)
    }

    access(contract) fun postMessage(content: String, author: Address) {
      self.messages.append(Message(content, getCurrentBlock().timestamp, author))
    }

    init(_ name: String, _ description: String, _ image: String, _ owner: Address) {
      self.info = CommunityInfo(name, description, image, owner, self.uuid)
      self.members = {owner: true}
      self.messages = []
      Communities.community[self.uuid] = self.info
    }
  }

  pub resource interface CollectionPublic {
    pub fun getIDs(): [UInt64]
    pub fun getCommunity(id: UInt64): &Community?
  }

  pub resource Collection: CollectionPublic {
    pub let createdCommunities: @{UInt64: Community}
    pub let myCommunities: {UInt64: Bool}

    pub fun createCommunity(name: String, description: String, image: String) {
      let community: @Community <- create Community(name, description, image, self.owner!.address)
      self.createdCommunities[community.uuid] <-! community
    }

    pub fun joinCommunity(id: UInt64, owner: Address) {
      let community = Communities.getCommunity(id: id, owner: owner) ?? panic("This Community does not exist.")
      community.join(user: self.owner!.address)
      self.myCommunities[id] = true
    }

    pub fun leaveCommunity(id: UInt64, owner: Address) {
      let community = Communities.getCommunity(id: id, owner: owner) ?? panic("This Community does not exist.")
      community.leave(user: self.owner!.address)
      self.myCommunities.remove(key: id)
    }

    pub fun postMessage(id: UInt64, owner: Address, content: String) {
      let community = Communities.getCommunity(id: id, owner: owner) ?? panic("This Community does not exist.")
      community.postMessage(content: content, author: self.owner!.address)
    }

    pub fun getIDs(): [UInt64] {
      return self.createdCommunities.keys
    }

    pub fun getCommunity(id: UInt64): &Community? {
      return &self.createdCommunities[id] as &Community?
    }

    init() {
      self.createdCommunities <- {}
      self.myCommunities = {}
    }

    destroy() {
      for id in self.getIDs() {
        Communities.community.remove(key: id)
      }
      destroy self.createdCommunities
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <- create Collection()
  }

  pub fun getCommunityInfo(id: UInt64): CommunityInfo? {
    return self.communities[id]
  }

  pub fun getCommunity(id: UInt64, owner: Address): &Community? {
    let ownerCollection = getAccount(owner).getCapability(Communities.CollectionPublicPath)
              .borrow<&Collection{CollectionPublic}>() ?? panic("This is not a valid owner.")
    return ownerCollection.getCommunity(id: id)
  }

  init() {
    self.community = {}
    self.CollectionPublicPath = /public/EmeraldAcademyCommunitiesCollection
    self.CollectionStoragePath = /storage/EmeraldAcademyCommunitiesCollection

    self.account.save(<- Communities.createEmptyCollection(), to: Communities.CollectionStoragePath)
    self.account.link<&Communities.Collection{Communities.CollectionPublic}>(Communities.CollectionPublicPath, target: Communities.CollectionStoragePath)

    let collection = self.account.borrow<&Communities.Collection>(from: Communities.CollectionStoragePath)!
    collection.createCommunity(name: "Lacent", description: "Lacent is a decentralized language learning application [dApp] that leverages the power of Flow blockchain to provide a seamless, interactive and highly effective language learning experience.", image: "QmRaRjEUNKDTTsXxBv8gcz5vYW8nzfycknveC3ReAJN9D5")
  }
}