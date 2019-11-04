const { events } = require('brigadier')

events.on("Microsoft.Storage.BlobDeleted", (e, p) => {
  console.log("Received BlobDeleted event:")
  var str = JSON.stringify(JSON.parse(e.payload),null,2);  
  console.log(str);
})

events.on("Microsoft.Storage.BlobCreated", (e, p) => {
  console.log("Received BlobCreated event:")
  var str = JSON.stringify(JSON.parse(e.payload),null,2);  
  console.log(str);
})

