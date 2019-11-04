#Install brigade
helm repo add brigade https://brigadecore.github.io/charts
helm install -n brigade brigade/brigade -f values.yaml 

#create project
brig project create

# Run exec event
brig run jakob/brigadedemo

#Post to generic gateway
kubectl port-forward service/brigade-brigade-generic-gateway 8081:8081
curl --header "Content-Type: application/json" --request POST --data '{"key1":"value1","key":"value2"}' http://localhost:8081/simpleevents/v1/<projectid>/<secret>

