---
id: setting-up-tls-for-signoz
title: Secure SigNoz in Kubernetes using Ingress-NGINX and Cert-Manager
description: Set up TLS for SigNoz in Kubernetes using Ingress-NGINX and Cert-Manager
---

### Overview

Setting up SSL/TLS certificates is essential to secure traffic over the internet.
In this guide, you will configure **HTTPS** for Kubernetes Ingress using [ingress-Nginx][1]
and [cert-manager][2] to secure SigNoz UI and SigNoz OpenTelemetry Collector endpoints.

### Prerequisites

- Helm version 3.8 or above
- SigNoz helm chart version 0.4.3 or above

## Steps to Secure SigNoz

Follow the steps below to configure SSL/TLS certificates for the domain,
let's say `signoz.domain.com`.

:::info
Please update `domain.com` in the tutorial with either your company domain
or something relevant.
:::

### Enable Cert-Manager

You can enable the `cert-manager` dependency chart by setting `cert-manager.enabled`
to `true`. Also, set `installCRDs` to true for the first time to install CRDs
required by the `cert-manager`.

Let's include it in the existing `override-values.yaml` file, create one if not present:

```yaml
cert-manager:
  enabled: true
  installCRDs: true
  namespace: security
```

Now, let's create a namespace called `security` where the `cert-manager` will be installed
instead of the Helm release namespace.

```bash
kubectl create namespace security
```

To install or upgrade SigNoz release with the updated configurations in
`override-values.yaml`:

```bash
helm -n platform upgrade \
    --create-namespace --install \
    my-release signoz/signoz \
    -f override-values.yaml
```

### Enable Nginx Ingress Controller

You can enable the Nginx ingress controller by setting `ingress-nginx.enabled`
configuration to `true`.

Let's include it in the existing `override-values.yaml` file:

```yaml
ingress-nginx:
  enabled: true
```

To upgrade SigNoz release with the updated configurations in
`override-values.yaml`:

```bash
helm -n platform upgrade \
    --create-namespace --install \
    my-release signoz/signoz \
    -f override-values.yaml
```

Now, you will need the external IP of the Ingress Nginx Controller.
That value will either be the IP address itself or a publicly accessible URL
provided by the cloud vendor.

To obtain the external IP of the ingress Nginx controller:

```bash
kubectl get services --namespace platform | grep "ingress-nginx-controller"
```

Output should be similar to the following:

```bash
my-release-ingress-nginx-controller             LoadBalancer   10.100.233.79    <redacted>-<redacted>.<redacted>.elb.amazonaws.com   80:31050/TCP,443:30597/TCP   74m
my-release-ingress-nginx-controller-admission   ClusterIP      10.100.230.14    <none>                                               443/TCP                      74m
```

In your domain management website, you should create a DNS custom record
of type **A** pointing all required domains to the external IP address.

In our example output, you can see `<redacted>-<redacted>.<redacted>.elb.amazonaws.com`
which is a publicly accessible sub-domain provided by a cloud vendor. In this case,
you should create a DNS custom record of type **CNAME** for all required domains.

:::info
Before proceeding further, make sure that domains resolve to the ingress Nginx controller.
:::

### Create Cluster Issuer

`ClusterIssuer` is a Kubernetes resource that represents certificate authorities (CAs)
that can generate signed certificates by honoring certificate signing requests.
All cert-manager certificates require a referenced issuer that is in a ready condition
to attempt to honour the request.

To create `ClusterIssuer` with name `letsencrypt-prod`:

```
kubectl apply -n platform -f - <<EOF 
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata: 
  name: letsencrypt-prod
spec: 
  acme: 
    privateKeySecretRef:
      name: letsencrypt-prod
    server: https://acme-v02.api.letsencrypt.org/directory
    email: prashant@domain.com
    solvers:
      - http01:
          ingress:
            class: nginx
EOF
```

:::info
Replace `prashant@domain.com` with your company email id.
:::

### Enable SigNoz Ingress

Next, you can enable Kubernetes ingress for SigNoz UI by passing
the `ingress.className` configuration to set up the ingress
controller and use ingress annotation in the older K8s version. You can
pass host information using `ingress.hosts`.

Cert-manager takes care of issuing certificates using the ingress annotation
`cert-manager.io/cluster-issuer` which points to previously created `ClusterIssuer`
`letsencrypt-prod`.

Let's update the existing `override-values.yaml` file accordingly:

```yaml
frontend:
  ingress:
    enabled: true
    className: nginx
    hosts:
      - host: signoz.domain.com
        paths:
          - path: /
            pathType: ImplementationSpecific
            port: 3301
    tls:
      - secretName: signoz.domain.com
        hosts:
          - signoz.domain.com
    annotations:
      cert-manager.io/cluster-issuer: letsencrypt-prod
```

(Optional) Similarly, you can also enable Kubernetes ingress for SigNoz
OtelCollector gRPC endpoint for a domain, let's say `signoz-ingest.domain.com`.

Update the existing `override-values.yaml` file accordingly:

```yaml
otelCollector:
  ingress:
    enabled: true
    className: nginx
    hosts:
      - host: signoz-ingest.domain.com
        paths:
          - path: /
            pathType: ImplementationSpecific
            port: 4317
    tls:
      - secretName: signoz-ingest.domain.com
        hosts:
          - signoz-ingest.domain.com
    annotations:
      cert-manager.io/cluster-issuer: letsencrypt-prod
      nginx.ingress.kubernetes.io/ssl-redirect: "true"
      nginx.ingress.kubernetes.io/backend-protocol: "GRPC"
```

:::warning
After enabling SigNoz OtelCollector, you can pass SSL/TLS certificate and
private key to external OpenTelemetry collectors or external instrumentations
which uses the secured domain endpoint.
:::

### Run SigNoz with Updated Values

At last, you can run the command below to upgrade SigNoz release with
the updated configurations in `override-values.yaml`:

```bash
helm -n platform upgrade \
    --create-namespace --install \
    my-release signoz/signoz \
    -f override-values.yaml
```

You should be able to access SigNoz UI using the domain name in
`frontend.ingress.hostname`.

In case you have set up SSL/TLS for SigNoz OtelCollector,
you can test it using [tracegen][3].

---
[1]: https://github.com/kubernetes/ingress-nginx
[2]: https://github.com/cert-manager/cert-manager
[3]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/tracegen#section-readme
