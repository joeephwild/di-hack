import ContentContract from 0xc3e6f27ffe0f6956

transaction {
    prepare(account: AuthAccount) {
        let contentContractRef = account.getCapability<&ContentContract.Contract>(/public/ContentContract)

        if let contentContract = contentContractRef.borrow() {
            let podcastId: UInt64 = 1 // podcasts unique valuje
            let title: String = "Sample Podcast Title"
            let file: String = "sample_podcast.mp3"

           // calling the upload podcast function
            contentContract.uploadPodcast(id_: podcastId, owner_: account.address, title_: title, file_: file)
        }
    }
}
