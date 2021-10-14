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

# Label the ingress-basic namespace to disable resource validation
kubectl label namespace ingress-basic cert-manager.io/disable-validation=true

# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io

# Update your local Helm chart repository cache
helm repo update

# Install the cert-manager Helm chart
helm install --ve cert-manager jetstack/cert-manager `
  --namespace ingress-basic `
  --version $CERT_MANAGER_TAG `
  --set installCRDs=true `
  --set nodeSelector."kubernetes\.io/os"=linux `
  --set image.repository=$ACR_URL/$CERT_MANAGER_IMAGE_CONTROLLER `
  --set image.tag=$CERT_MANAGER_TAG `
  --set webhook.image.repository=$ACR_URL/$CERT_MANAGER_IMAGE_WEBHOOK `
  --set webhook.image.tag=$CERT_MANAGER_TAG `
  --set cainjector.image.repository=$ACR_URL/$CERT_MANAGER_IMAGE_CAINJECTOR `
  --set cainjector.image.tag=$CERT_MANAGER_TAG