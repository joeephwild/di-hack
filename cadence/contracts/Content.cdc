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
      shortDesc_: String
    ){}

    //function to purchase the content 
    pub fun payForContent(contentId: UInt64){}

   //
   
}
