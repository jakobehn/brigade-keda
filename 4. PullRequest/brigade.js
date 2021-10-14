const { events, Job } = require("brigadier");
const util = require('util')

const HELM_VERSION = "v3.7.0"
const HELM_CONTAINER = "lachlanevenson/k8s-helm:" + HELM_VERSION;

const KUBECTL_VERSION = "v1.22.2";
const KUBECTL_CONTAINER = "lachlanevenson/k8s-kubectl:" + KUBECTL_VERSION;

events.on("simpleevent", (event, project) => {
    const payload = JSON.parse(event.payload);
    const prId = payload.resource.pullRequestId;

    if (!payload.resource.sourceRefName.includes('/feature/') && !payload.resource.sourceRefName.includes('/bug/')) {
        console.log(`The source branch ${payload.resource.sourceRefName} is not a /feature/ or /bug/ and is therefore skipped.`)
        return;
    }

    if (payload.resource.status !== "completed" && payload.resource.status !== "abandoned") {
        console.log(`PullRequest not complete or abandoned (current status: ${payload.resource.status}).`);
        return;
    }

    var helm_job = new Job("helm-delete-release", HELM_CONTAINER);
    helm_job.env = {
        'HELM_HOST': "10.0.119.135:44134"
    };
    helm_job.tasks = [`helm uninstall samplewebapp-${prId} --namespace samplewebapp-${prId}`];

    var kubectl_job = new Job("kubectl-delete-ns", KUBECTL_CONTAINER);
    kubectl_job.tasks = [`kubectl delete namespace samplewebapp-${prId}`];

    console.log("==> Running helm_job Job")
    helm_job.run().then(helmResult => {
        console.log("==> helm job results")
        console.log(helmResult.toString())
        console.log("==> helm job done")

        kubectl_job.run().then(kubectlResult => {
            console.log("==> kubectl job results");
            console.log(kubectlResult.toString());
            console.log("==> kubectl job done");
        });
    })
});

events.on("error", (e) => {
    console.log("Error event " + util.inspect(e, false, null))
    console.log("==> Event " + e.type + " caused by " + e.provider + " cause class" + e.cause + e.cause.reason)
})

events.on("after", (e) => {
    console.log("After event fired " + util.inspect(e, false, null))
});