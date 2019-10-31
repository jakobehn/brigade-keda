const { events, Job } = require("brigadier");

events.on("push", async () => {
    // var compileStep = new Job("compile", "mcr.microsoft.com/dotnet/core/sdk:3.0")
    // compileStep.tasks = [
    //     "cd src",
    //     "dotnet build",
    //     "dotnet publish",
    //   ];
    

    // var testStep = new Job("test", "example/tester:latest")
    // var tagStep = new Job("tag:, "example/releasetagger:latest")
    // We could continue on creating the remaining steps
  
    //await compileStep.run()

    // await testStep.run()
    // await tagStep.run()
    // We could continue running the remaining steps
    
    var hello = new Job("linux-job")
    hello.image = "alpine:3.4"
    hello.tasks = ["echo Hello Brigade from Azure"]
    
    hello.run()    
  });

  events.on("simpleevent", (e, p) => {  // handler for a SimpleEvent
    var echo = new Job("echosimpleevent", "alpine:3.8");
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
    var echo = new Job("echocloudevent", "alpine:3.8");
    echo.tasks = [
      "echo Project " + p.name,
      "echo event type: $EVENT_TYPE"
    ];
    echo.env = {
      "EVENT_TYPE": e.type
    };
    echo.run();
  });
  