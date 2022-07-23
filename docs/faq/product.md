---
id: product
title: FAQ - Product
description: Frequently Asked Question Regarding SigNoz Product.

---
### 1. I am looking for an Application Monitoring Tool, is SigNoz an APM?​

SigNoz is more than an APM. We provide all features like metrics and request traces which APMs provide. On top of that, we provide advanced filtering on trace data and custom aggregation on it.



### 2. How is SigNoz different from Prometheus?​

Prometheus is good if you want to do just metrics. But if you want to have a seamless experience between metrics and traces, then current experience of stitching together Prometheus & Jaeger is not great. 
Grafana is making some efforts in this direction with Trace viewer - but we think this is just stitching 2 disparate systems.

Our goal is to provide an integrated UI between metrics & traces - similar to what SaaS vendors like Datadog provides - and give advanced filtering and aggregation over traces, something which Jaeger currently lack.


### 3. Is Prometheus included in SigNoz? 

Yes, to query metrics data. We support PromQL and their engines to get metrics data. Soon we will be moving away from Prometheus altogether and you won't need to import the Prometheus package.




### 4. I am using Jaeger, can I use SigNoz?​

Jaegar UI doesn’t show any metrics on traces or on filtered traces, also, you cannot get aggregates on filtered traces, for example, Cassandra doesn’t support Group By, Max(), etc.


### 5. What will be your paid plan like?​

SigNoz will be always open-source and free to self-host for smaller teams. We will have role based pricing for our enterprise edition which will have advanced features needed by bigger teams.


### 6. Is SigNoz production ready? 

Yes, it’s very well production ready. [Click here](https://www.notion.so/link-a2333fffdaa847d69d4f2f531b7d50c8) to get started with SigNoz.



### 7. I need clarity with Self-Hosted maintenance `pros` and `cons` of SigNoz vs managed services like Lightstep/Xray. 

Based on what we are seeing on managed vs self-hosted, we have seen people prefer self-hosted to have more control and also not send data outside your AWS/GCP VPC (Virtual Private Cloud). 

Fintech companies are also generally more cautious here.
If you are on Kubernetes - scaling SigNoz is fairly easy, but you would still need some DevOps/SRE capabilities in your team to set things up.



### 8. What is so unique about this Observability tool (SigNoz) apart from others in the market?

We are datastore agnostic and provide a modular architecture to support new Datastores. Currently, we support ClickHouse but other relevant Databases can be supported on community demand.

We use OLAP databases (ClickHouse) which can crunch aggregates from raw data very fast. When the world is moving towards structured logging, I see more users moving to columnar/OLAP databases.

In short, faster query + cheaper storage costs.


### 9. Which all databases work with SigNoz? 

The ones that OpenTelemetry supports. Find more [here.](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/database.md)


### 10. Can I run SigNoz as a service in AWS? 

Yes, you can run SigNoz in an AWS instance using Docker-Compose or Docker Swarm. You can also use our helm chart to deploy SigNoz in EKS. 

Refer here: [https://signoz.io/docs/install/](https://signoz.io/docs/install/)




### 11. Is it possible to remove default SigNoz Services (Applications) from the dashboard that comes bundled with SigNoz installation. If yes, after removing those, do I need to put my application's container and image in that place?

Yes, it is possible to remove the sample app.

Refer here: [https://signoz.io/docs/operate/docker-standalone/#remove-the-sample-application](https://signoz.io/docs/operate/docker-standalone/#remove-the-sample-application)

No, you do not need to put your application’s container and image in that place.



### 12. I'm just wondering why SigNoz can't support Windows System. Is it because ClickHouse doesn't support Windows? 

Yes, it is one of the reasons.
However, you should be able to use WSL with volume path changes or create a Virtual Machine (VM) with Ubuntu.
ClickHouse official docs suggest going with the latter.

This SigNoz discussion thread might help - [https://github.com/SigNoz/signoz/discussions/876](https://github.com/SigNoz/signoz/discussions/876).

SigNoz officially does not support WSL, this is a relevant issue that addresses that, take a look - [https://github.com/SigNoz/signoz/issues/645](https://github.com/SigNoz/signoz/issues/645)

Else, try SigNoz on your macOS or Linux system, and use the [install script](https://signoz.io/docs/install/docker/#install-signoz-using-the-install-script) for easy setup.

Supported Linux Disto - Ubuntu | Debian | OpenSuse | CentOS | SUSE Linux Enterprise Server (SLES)

If you're using a different Linux distribution, see the [Install SigNoz Using Docker Compose](https://signoz.io/docs/install/docker/#install-signoz-using-docker-compose) section.



### 13. We have deployed SigNoz in the Kubernetes cluster, does it show CPU and memory utilization metrics at the node level, as well as pod level like Prometheus, does?  If yes, is it available by default on the dashboard or do we have to perform some additional configuration? 

As of now, you need to take a few steps to enable this. You can import pre-built dashboards to enable this along with some changes mentioned in the post

Refer here: [https://signoz.io/docs/tutorial/kubernetes-infra-metrics/#steps-to-export-k8s-metrics-to-signoz](https://signoz.io/docs/tutorial/kubernetes-infra-metrics/#steps-to-export-k8s-metrics-to-signoz)



### 14. Is there a provision to modify the base path of SigNoz UI and host it behind Nginx or others at the subpath? 
#### For instance: instead of `https://mydomain.com/`, I want `https://mydomain/signoz/`, since my application is already running at the basepath. 

We currently working on supporting custom baseURL to support that. 

You can track it here: [https://github.com/SigNoz/signoz/pull/1115](https://github.com/SigNoz/signoz/pull/1115)



### 15. Is there anything I need to do after upgrading SigNoz to a version with some breaking changes?

Yes, do not forget to run the migration script according to the version you upgraded to, 

for more information check our migration documentation here. 



### 16. Is the frontend SigNoz level user data stored in ClickHouse DB?

No, it’s stored in SQLite.