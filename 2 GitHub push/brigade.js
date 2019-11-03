const { events, Job } = require("brigadier");

events.on("push", async () => {
    var compileStep = new Job("compile", "mcr.microsoft.com/dotnet/core/sdk:3.0")
    compileStep.tasks = [
        "cd src",
        "dotnet build",
        "dotnet publish",
      ];  
  });

  