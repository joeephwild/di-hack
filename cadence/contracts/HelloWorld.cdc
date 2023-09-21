pub contract HelloWorld {

  // pub var greeting: String

  // pub fun changeGreeting(newGreeting: String) {
  //   self.greeting = newGreeting
  // }

  // init() {
  //   self.greeting = "Hello, World!"
  // }

  pub var greeting: UInt8

  pub fun changeGreeting(newFvourite: UInt8){
    self.greeting = newFvourite
  }

  init(){
    self.greeting =5;
  }
}
