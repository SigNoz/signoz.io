Below are the steps to collect your metrics and logs from ECS infrastructure:

- [Prerequisites](#prerequisites)
- [Create OpenTelemetry Collector Config file](#step-1-create-signoz-otelcollector-config)
- [Create Sidecar Collector Container](#step-2-create-sidecar-collector-container)
- [Deploy Task Definition](#step-3-deploy-the-task-definition)
- [Verify Data in SigNoz](#step-4-verify-data-in-signoz)
- [Send Traces Data from your application](#send-traces-data-from-applications)
- [Send Logs Data from your application](#send-logs-data-from-applications)