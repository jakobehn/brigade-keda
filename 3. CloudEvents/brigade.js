const { events } = require('brigadier')

events.on("Microsoft.Storage.BlobDeleted", (e, p) => {
  console.log("Received BlobDeleted event:")
  console.log(e);
  console.log(e.payload);
  console.log(e.payload.eventType);
})

events.on("Microsoft.Storage.BlobCreated", (e, p) => {
  console.log("Received BlobCreated event:")
  console.log(e.payload);
  var pl = JSON.parse(e.payload);
  console.log("parsed json");
  console.log(pl);  
  console.log(pl.eventType);
})