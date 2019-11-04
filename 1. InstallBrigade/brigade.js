const { events, Job, Group } = require("brigadier");

//Handler for exec event
events.on("exec", () => {

  var helloWorldJob = new Job("say-hello", "alpine:3.8");
  helloWorldJob.tasks = [
    "echo Hello",
    "echo World"
  ];

  var goodbyeJob = new Job("say-goodbye", "alpine:3.8");
  goodbyeJob.tasks = [
    "echo Goodbye",
    "echo World"
  ];  

  var jobGroup = new Group();
  jobGroup.add(helloWorldJob);
  jobGroup.add(goodbyeJob);

  jobGroup.runAll();
  
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
