import ContentContract from 0xc3e6f27ffe0f6956

transaction {
    prepare(account: AuthAccount) {
        let podcastId: UInt64 = 1 // aligns with the ID of the uploaded podcast
        let podcastDetails = ContentContract.getPodcastDetails(podcastId: podcastId)

        if let details = podcastDetails {
            log("Podcast ID: \(details.id)")
            log("Owner: \(details.owner)")
            log("Title: \(details.title)")
            log("File: \(details.file)")
            log("Premium: \(details.isPremium)")
        } else {
            log("Podcast not found")
        }
    }
}
