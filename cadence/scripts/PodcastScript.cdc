import ContentContract from 0xc3e6f27ffe0f6956

pub fun getPodcastDetails(podcastId: UInt64): ContentContract.Podcast? {
    let contractRef = getAccount(0xc3e6f27ffe0f6956).getCapability<&ContentContract.Contract>(/public/ContentContract)

    if let contract = contractRef.borrow() {
        return contract.getPodcast(podcastId: podcastId)
    }

    return nil
}
