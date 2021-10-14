$REGISTRY_NAME="jakob"
$CONTROLLER_REGISTRY="k8s.gcr.io"
$CONTROLLER_IMAGE="ingress-nginx/controller"
$CONTROLLER_TAG="v0.48.1"
$PATCH_REGISTRY="docker.io"
$PATCH_IMAGE="jettech/kube-webhook-certgen"
$PATCH_TAG="v1.5.1"
$DEFAULTBACKEND_REGISTRY="k8s.gcr.io"
$DEFAULTBACKEND_IMAGE="defaultbackend-amd64"
$DEFAULTBACKEND_TAG="1.5"
$CERT_MANAGER_REGISTRY="quay.io"
$CERT_MANAGER_TAG="v1.3.1"
$CERT_MANAGER_IMAGE_CONTROLLER="jetstack/cert-manager-controller"
$CERT_MANAGER_IMAGE_WEBHOOK="jetstack/cert-manager-webhook"
$CERT_MANAGER_IMAGE_CAINJECTOR="jetstack/cert-manager-cainjector"

# Create a namespace for your ingress resources
kubectl create namespace ingress-basic

# Add the ingress-nginx repository
helm repo add ingress-nginx "https://kubernetes.github.io/ingress-nginx"

# Set variable for ACR location to use for pulling images
$ACR_URL="jakob.azurecr.io"

# Use Helm to deploy an NGINX ingress controller
helm install nginx-ingress ingress-nginx/ingress-nginx --version 3.36.0 --namespace ingress-basic --set controller.replicaCount=2 --set controller.nodeSelector."kubernetes\.io/os"=linux --set controller.image.registry="$ACR_URL" --set controller.image.image=$CONTROLLER_IMAGE --set controller.image.tag=$CONTROLLER_TAG --set controller.image.digest="" --set controller.admissionWebhooks.patch.nodeSelector."kubernetes\.io/os"=linux --set controller.admissionWebhooks.patch.image.registry=$ACR_URL --set controller.admissionWebhooks.patch.image.image=$PATCH_IMAGE --set controller.admissionWebhooks.patch.image.tag=$PATCH_TAG --set defaultBackend.nodeSelector."kubernetes\.io/os"=linux --set defaultBackend.image.registry=$ACR_URL --set defaultBackend.image.image=$DEFAULTBACKEND_IMAGE --set defaultBackend.image.tag=$DEFAULTBACKEND_TAG