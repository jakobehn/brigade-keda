const { events, Job, Group } = require("brigadier");

events.on("push", async (e, p) => {
    var compileStep = new Job("compile", "mcr.microsoft.com/dotnet/core/sdk:3.0")
    compileStep.tasks = [
        "cd src",
        "dotnet build",
      ];  

      var testStep = new Job("test", "mcr.microsoft.com/dotnet/core/sdk:3.0")
      testStep.tasks = [
          "cd src",
          "dotnet test",
        ];  

      var publishStep = new Job("publish", "mcr.microsoft.com/dotnet/core/sdk:3.0")
      publishStep.tasks = [
          "cd src",
          "dotnet publish",
        ];          

      var slack = new Job("slack-notify", "technosophos/slack-notify:latest", ["/slack-notify"])
      slack.env = {
        SLACK_WEBHOOK: p.secrets.SLACK_WEBHOOK,
        SLACK_USERNAME: "Brigade",
        SLACK_TITLE: "sampleapp CI trigger",
        SLACK_MESSAGE: "Sampleapp built and tested successfully!s"
      }          
  
    Group.runEach([compileStep,testStep,publishStep,slack])
  
    
  });
