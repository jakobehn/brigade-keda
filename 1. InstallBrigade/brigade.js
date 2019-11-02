const { events, Job } = require("brigadier");

events.on("exec", () => {
  var job = new Job("say-hello-world", "alpine:3.8");
  job.tasks = [
    "echo Hello",
    "echo World"
  ];

  job.run();  
});

events.on("simpleevent", (e, p) => {  // handler for a SimpleEvent
  var echo = new Job("echo-simpleevent", "alpine:3.8");
  echo.tasks = [
    "echo Project " + p.name,
    "echo event type: $EVENT_TYPE"
  ];
  echo.env = {
    "EVENT_TYPE": e.type
  };
  echo.run();
});

events.on("cloudevent", (e, p) => { // handler for a CloudEvent
  var echo = new Job("echo-cloudevent", "alpine:3.8");
  echo.tasks = [
    "echo Project " + p.name,
    "echo event type: $EVENT_TYPE"
  ];
  echo.env = {
    "EVENT_TYPE": e.type
  };
  echo.run();
});
