---
title: Using Kubectl Logs | How to view Kubernetes Pod Logs?
slug: kubectl-logs
date: 2023-10-09
tags: [Tech Tutorial]
authors: [daniel]
description: Kubectl logs command can be used to get information about the containers and pods on your Kubernetes cluster. Debugging your Kubernetes resources heavily depends on...
image: /img/blog/2023/03/kubectl_logs_cover-min.jpg
keywords:
  - kubectl
  - kubernetes
  - kubectl logs
  - kubectl get pod
  - pod
  - node
  - k8s metrics
  - kubernetes metrics
  - resource utilization
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/kubectl-logs/"/>
</head>

import SignUps from '../docs/shared/sign-ups.md'
import LogsPerf from '../docs/shared/logs-perf-cta.md'

Information about the containers and pods on your cluster may be obtained using the `kubectl logs` command. These logs allow you to know the performance of your applications, whether they are failing or healthy, and are particularly useful for debugging and troubleshooting purposes.

<!--truncate-->

![Cover Image](/img/blog/2023/03/kubectl_logs_cover.webp)

In this article, we will see how to use the kubectl logs command to get information from existing resources in a Kubernetes cluster.

Before we dive in, let's first take a quick look at what Kubectl is and how exactly it works.

<SignUps />

## What is kubectl?

Kubectl is pronounced `Kube: c-t-l`, `Kube-control` or as `kube-cuttle`.
It is a command-line tool for Kubernetes that lets you control or communicate with Kubernetes clusters or resources you create by using the Kube API.

**Take a look at how this works in the background**.

You issue a `kubectl command`, for example, `kubectl logs`. Kubectl connects to the Kube API server, which verifies and authenticates the request you made. The Kube API server, in return, responds to you as a client/user with the requested data or information after it has completed authentication and validation. This requested data is obtained from the `etcd` server, which serves as the Kubernetes database. Etcd server stores information regarding the cluster, such as the nodes, pods, configs, secrets, etc.

Every information presented to you when you run a kubectl command is gotten from the `etcd` server. The Kube API server acts as a messenger for delivering your requests. This is how kubectl as a command line tool lets you interact with your cluster or resources.

For more insight, it would be beneficial to look at the Kubernetes architecture.

## What is a log?

Simply put, a log is a text record of an event or incident that took place at a specific time. 

There are few possibilities of figuring out what went wrong when your software crashes, and you need logging information. This is why logs are very important.

## What is `kubectl log` command?

An integrated tool for reading logs is kubectl log. It might not be the greatest choice for production scenarios because this is a manual process. Your business needs will determine which tool is best for viewing your Kubernetes logs.

The kubectl log command is the command that displays information about the background activities or events completed or ongoing in your resources. It is used to view container logs for debugging. Because container applications are packaged in pods, if an application is failing or misbehaving, the next line of action would be to check the logs of the container(s) in that pod to know why.

Debugging your Kubernetes resources depends on your logs. With the knowledge provided by this command, you can restart your pod by making the necessary adjustments or repairs.

<LogsPerf />

## Using kubectl logs

To access the logs for a specific resource, you can first get a list of the resources that are part of your cluster.

To get a list of available pods in your cluster, run the below command:

```bash
$ kubectl get pods

event-simulator                 1/1     Running             0             18m
nginx-76d6c9b8c-8f9m7           1/1     Running             0             69s
pod                             0/1     ContainerCreating   0             5s
pod-example                     0/1     ImagePullBackOff    0             20m
sample-flask-5d67d8d556-t8t77   0/1     ErrImageNeverPull   0             26m
sample-flask-645d95f4b4-vbztg   0/1     ErrImageNeverPull   0             29m
webapp                          1/1     Running             4 (39d ago)   42d
webapp-release-0-5              1/1     Running             4 (39d ago)   42d

```

After getting a list of all existing pods, the logs of those pods can be seen individually by running

```bash
# This returns a snapshot of the logs from the pod

kubectl logs [pod name]
```

If you want to stream or follow the logs in a pod, you can use the below command

```bash
$ kubectl logs -f event-simulator

[2022-11-29 04:12:17,262] INFO in event-simulator: USER3 is viewing page1
[2022-11-29 04:12:18,264] INFO in event-simulator: USER4 logged out
[2022-11-29 04:12:19,266] INFO in event-simulator: USER2 is viewing page2
[2022-11-29 04:12:20,268] INFO in event-simulator: USER2 is viewing page2
[2022-11-29 04:12:21,270] INFO in event-simulator: USER4 logged out
[2022-11-29 04:12:22,271] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-11-29 04:12:22,272] INFO in event-simulator: USER1 is viewing page3
[2022-11-29 04:12:23,274] INFO in event-simulator: USER3 is viewing page1
[2022-11-29 04:12:24,276] INFO in event-simulator: USER4 is viewing page1
[2022-11-29 04:12:25,278] WARNING in event-simulator: USER7 Order failed as the item is OUT OF STOCK.
[2022-11-29 04:12:25,278] INFO in event-simulator: USER1 logged out
[2022-11-29 04:12:26,280] INFO in event-simulator: USER4 is viewing page1
[2022-11-29 04:12:27,282] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
[2022-11-29 04:12:27,283] INFO in event-simulator: USER2 is viewing page2
[2022-11-29 04:12:28,285] INFO in event-simulator: USER1 logged out
```

The **`-f`** flag helps you to stream the log's life. As events happen in that resource, it is streamed on your screen. If you do not want to follow the logs, you can administer the command without the `-f` flag, as shown previously.

If there are multiple containers running in a pod, it is advisable to specify the name of the container you need logs from in your `kubectl logs` command otherwise, the command will fail.

To follow the logs for a particular container in a pod, use the below syntax:

```bash
kubectl logs [POD name] [-c CONTAINER name] [--follow] [flags]
```

- You can refer to the Kubernetes <a href = "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#logs" rel="noopener noreferrer nofollow" target="_blank" >log documentation</a> to learn more about different flags that can be used.

To display all containers logs in a pod, use the below command

```bash
kubectl logs [pod-name] --all-containers=true
```

- The container name is not required if the pod only contains one container.

By adding the **-p** flag, you can obtain logs for a Pod that was previously running.

```bash
kubectl logs -p [pod-name]
```

## Kubernetes logs in production environment

As discussed, you can get logs of containers using the `kubectl log` command, this is a manual log inspection that happens mostly locally.

In production environments, when you have a stable cluster deployed and running, it's possible to forget the logs and assume everything is working fine easily. Also, since containers in pods are ephemeral, in situations where the pods get restarted, you lose logs for those containers, which may contain critical data to be analyzed later.

A helpful solution to this problem would be to use a distributed logging solution like [Signoz](https://signoz.io/).

## Collecting Kubernetes logs in SigNoz

SigNoz is a full-stack open source Application Performance Monitoring tool that you can use for monitoring logs, metrics, and traces. Having all the important telemetry signals under a single dashboard leads to less operational overhead. Users can also access telemetry data with richer context by correlating these signals.

SigNoz uses a columnar database ClickHouse to store logs, which is very efficient at ingesting and storing logs data. Columnar databases like ClickHouse are very effective in storing log data and making it available for analysis.

Big companies like Uber have shifted from the Elastic stack to ClickHouse for their log analytics platform. Cloudflare too was using Elasticsearch for many years but shifted to ClickHouse because of limitations in handling large log volumes with Elasticsearch.

SigNoz uses <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> for instrumenting applications. OpenTelemetry, backed by <a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank" >CNCF</a>, is quickly becoming the world standard for instrumenting cloud-native applications. Kubernetes also graduated from CNCF.

The logs tab in SigNoz has advanced features like a log query builder, search across multiple fields, structured table view, JSON view, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Log management in SigNoz"/>
    <figcaption><i>Log management in SigNoz</i></figcaption>
</figure>

<br></br>

You can also view logs in real time with live tail logging.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/10/signoz_live_logs.webp" alt="Live Tail Logging in SigNoz"/>
    <figcaption><i>Live Tail Logging in SigNoz</i></figcaption>
</figure>

<br></br>

With advanced Log Query Builder, you can filter out logs quickly with a mix and match of fields.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/10/signoz_log_query_builder.webp" alt="Advanced Log Query Builder in SigNoz"/>
    <figcaption><i>Advanced Log Query Builder in SigNoz</i></figcaption>
</figure>

<br></br>

## Getting started with SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.


[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

If you liked what you read, then check out our GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

---

**Related Posts**

[SigNoz - A Lightweight Open Source ELK alternative](https://signoz.io/blog/elk-alternative-open-source/)

[OpenTelemetry Logs - A complete introduction](https://signoz.io/blog/opentelemetry-logs/)

