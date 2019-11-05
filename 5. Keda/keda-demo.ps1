k config use-context keda-admin

//Generate load
dotnet run --project .\src\Keda.Samples.Dotnet.OrderGenerator\Keda.Samples.Dotnet.OrderGenerator.csproj

k get deployment -n keda-sample