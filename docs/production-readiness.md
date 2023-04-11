---
id: production-readiness
title: Best Practices for Production
---
<p align="center">

[![Book meeting](/img/docs/ZoomCTA-production.png)](https://calendly.com/pranay-signoz/signoz-production-readiness)

</p>

# Best Practices to follow to run SigNoz in production

1. Create a separate cluster for running SigNoz. This will help in the isolation of application and APM environments and hence, reduce the impact radius of operational issues.
2. Use infra-level otel-collectors to send host metrics from VMs (should be part of default setup) 
    
    [K8s Infra Metrics | SigNoz](https://signoz.io/docs/tutorial/kubernetes-infra-metrics/)
    
3. Configure TTL for disk and use move to s3 for reduced costs. Perf of s3 is 2-3x slower than EBS. Configure retention for each of metrics, traces and logs. 
    
    [Retention Period | SigNoz](https://signoz.io/docs/userguide/retention-period/)
    
4. Setup alerts on important APM metrics
5. Harness the power of distributed tracing data by creating dashboards using Clickhouse queries. You can run group by and aggregates on tags(attributeMap) and events of a span. Also, filtering by more specific conditions should be possible. Let us know if you would like us to help write a few queries to plot a chart using the traces data. Same also, applies for the logs data.
6. Secure query-service and otel-collector using TLS ingress
    
    [Secure SigNoz in Kubernetes using Ingress-NGINX and Cert-Manager | SigNoz](https://signoz.io/docs/tutorial/setting-up-tls-for-signoz/)
    
7. Authorise client otel-collectors to send data to signoz cluster (planned)
8. Horizontally scale `otel-collector` which works on the push model and not `otel-collector-metrics` which works on the pull model of prometheus scraping. You need to add a different config to add another instance of `otel-collector-metrics` to prevent duplication
9. Use higher batch size in `otel-collector` when ingesting more than 10K events/s. The default batch size is 10K rows. Batch size upto 50K should work well.
    
    [signoz/otel-collector-config.yaml at develop · SigNoz/signoz](https://github.com/SigNoz/signoz/blob/develop/deploy/docker/clickhouse-setup/otel-collector-config.yaml#L60)
    
10. Use sampling to reduce the amount of data sent to SigNoz
    
    [opentelemetry-collector-contrib/processor/probabilisticsamplerprocessor at main · open-telemetry/opentelemetry-collector-contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/probabilisticsamplerprocessor)
    

