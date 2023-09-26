pub contract ContentContract {
//Struct to hold the info of very content
 pub struct Content {
  pub var id: UInt64
  pub var owner: Address
  pub var category: String
  pub var file: String
  pub var price: UInt64
  pub var description: String
  pub var shortDesc: String
  pub var isPremium: Bool
 }

    // define the array to store the Content
    pub var allContent: [Content]

    init(){
      self.allContent = []
    }

//function to upload a content to the blockchain
    pub fun uploadAContent(
      category_: String,
      file_: String,
      price_: UInt64,
      description_: String,
      shortDesc_: String,
      isPremium_: Bool
    ){
      // generate the unique ID for the content
      let contentId = UInt64(self.allContent.length)

      // Create a new content struct and add it to the array
      let newContent = Content(
        id: contentId,
        owner: self.signer,
        category: category_,
        file: file_,
        price: price_,
        description: description_,
        shortDesc: shortDesc_,
        isPremium: isPremium_
      )
    }

    //function to purchase the content 
    pub fun payForContent(contentId: UInt64){
      let content = self.get(contentId: UInt64)
      if let content = content {
        // Ensure the content isnt already owned by the user
        if content.owner != self.signer {
          // payment logic here
          // hope you can handle this @joeephwild
          // implement this when the wallet connect is implemented @joeephwild
        } else {
          // this should signify the content is owned by the caller
        }
      } else {
        // implementation of content not available @joeephwild
      }
    }

    // function to get the content by ID
    pub fun get(contentId: UInt64): &Content? {
      if contentId < UInt64(self.allContent.length) {
        return &self.allContent[contentId]
      }
      return nil
    }

    // function to list all available content
    pub fun listAllContent(): [Content] {
      return self.allContent
    }

   // function to list all premium items\
   pub fun listPremiumContent(): [Content] {
    return self.allContent.filter({ $0.isPremium })
   }
   
}
