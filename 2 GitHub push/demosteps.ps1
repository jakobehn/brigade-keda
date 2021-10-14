helm upgrade  brigade brigade/brigade -f values.yaml

curl --header "Content-Type: application/json" --request POST --data '{"key1":"value1","key":"value2"}' https://brigadedemo.ehn.nu/simpleevents/v1/brigade-b69c417b167af0bc528009ac3cc906622aca0d9eefbb6a19118487/mysecret

#Add webhook to Github
https://brigadedemo.ehn.nu/events/github 

github app secret
dc0075071d563578213d92ac5058674d2eba8efb