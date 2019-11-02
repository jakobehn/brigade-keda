const { events } = require('brigadier')
const { url } = require('url')

events.on("Microsoft.Storage.BlobDeleted", (e, p) => {
  console.log("Received BlobDeleted event:")
  console.log(e);
  console.log(e.payload);
  console.log(e.payload.eventType);
})

events.on("Microsoft.Storage.BlobCreated", (e, p) => {
  console.log("Received BlobCreated event:")

  //console.log(e.payload);
  var pl = JSON.parse(e.payload);
  console.log(pl);
  var accountInfo = parseAzureBlobUri(pl.data.url);
  // console.log(accountInfo);

})



const parseAzureBlobUri = (blobUrl) => {
    let uri = url.parse(blobUrl)

    // Extract the storage account name
    let storageAccountName = uri.hostname.split('.')[0]        

    // Remove the 1st trailing slash then extract segments
    let segments = uri.pathname.substring(1).split('/')

    // If only one segment, this is the blob name
    if(segments.length === 1){
        return {
            storageAccountName,
            containerName: '$root',
            blobName: segments[0]
        }
    }

    // get the container name
    let containerName = segments[0]

    // Remove the containername from the segments
    segments.shift()

    return {
        storageAccountName,
        containerName,
        blobName: segments.join('/')
    }
}