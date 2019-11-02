const { events, Job } = require("brigadier");

//Handler for exec event
events.on("exec", () => {
  var job = new Job("say-hello-world", "alpine:3.8");
  job.tasks = [
    "echo Hello",
    "echo World2"
  ];

  job.run();  
});


events.on("simpleevent", (e, p) => { 
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


events.on("cloudevent", (e, p) => { 
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
