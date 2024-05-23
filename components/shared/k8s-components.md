Follow the steps on this page to install SigNoz on Kubernetes with Helm. 

The [SigNoz Helm chart](https://signoz.io/docs/install/kubernetes/) will install the following components into your
Kubernetes cluster:

- Query Service (backend service)
- Web UI (frontend)
- OpenTelemetry Collectors
- Alertmanager
- ClickHouse chart (datastore)
- K8s-Infra chart (k8s infra metrics/logs collectors)