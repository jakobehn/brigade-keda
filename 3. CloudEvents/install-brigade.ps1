#Enable public IP
helm upgrade brigade brigade/brigade --set genericGateway.enabled=true,genericGateway.service.type=LoadBalancer,genericGateway.ingress.enabled=true,genericGateway.ingress.annotations.kubernetes.io/ingress.class=nginx,genericGateway.ingress.annotations.certmanager.k8s.io/cluster-issuer=letsencrypt-prod,genericGateway.ingress.annotations.certmanager.k8s.io/acme-challenge-type=http01

# TLS Support
helm install stable/nginx-ingress --name nginx-ingress
kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.6/deploy/manifests/00-crds.yaml
helm repo update
helm install --name cert-manager --namespace cert-manager stable/cert-manager
kubectl create -f clusterissuer-staging.yaml


helm install -n brigade-eventgrid-gateway . --set ingress.host=brigadedemo.ehn.nu
