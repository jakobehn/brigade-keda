const { events, Job, Group } = require('brigadier')

events.on("Microsoft.Storage.BlobCreated", (e, p) => {
  //Log received event
  console.log("\n\nReceived BlobCreated event:\n\n")

  //Parse event
  var payLoad = JSON.parse(e.payload);
  console.log(JSON.stringify(payLoad,null,2));  
  
  //Run brigade job
  processChangedFile(payLoad.data.url);
})

events.on("Microsoft.Storage.BlobDeleted", (e, p) => {
  //Log received event  
  console.log("\n\nReceived BlobDeleted event:\n\n")

  //Parse event  
  var payLoad = JSON.parse(e.payload);
  console.log(JSON.stringify(payLoad,null,2));  
  
  //Run brigade job
  processChangedFile(payLoad.data.url);
})

function processChangedFile(url) {
  var job = new Job("process-storage-file", "microsoft/azure-cli");
  job.env = { STORAGE_URL: url}
  job.tasks = ["echo Processing created file: $STORAGE_URL"];
  job.run();    
}



