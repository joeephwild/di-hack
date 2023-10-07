import Communities from "./contracts/Communities.cdc"

pub fun main(id: UInt64, owner: Address): &Communities.Community? {
    return Communities.getCommunity(id: id, owner: owner)
}