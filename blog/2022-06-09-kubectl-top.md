---
title: Kubectl Top Pod/Node | How to get & read resource utilization metrics of K8s?
slug: kubectl-top
date: 2023-03-08
tags: [Tech Tutorial]
authors: [daniel, ankit_anand]
description: Kubectl Top command can be used to retrieve snapshots of resource utilization of pods/nodes in your Kubernetes cluster. You can even retrieve metrics information about specific pods or nodes by specifying a namespace...
image: /img/blog/2022/06/kubectl_top_cover.jpeg
keywords:
  - kubectl
  - kubernetes
  - kubectl top
  - kubectl top node
  - kubectl top pod
  - pod
  - node
  - k8s metrics
  - kubernetes metrics
  - resource utilization
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/kubectl-top/"/>
</head>

import SignUps from '../docs/shared/sign-ups.md'


`Kubectl Top` command can be used to retrieve snapshots of resource utilization of pods or nodes in your Kubernetes cluster. Resource utilization is an important thing to monitor for Kubernetes cluster owners. In order to monitor resource utilization, you can keep track of things like CPU, memory, and storage.

<!--truncate-->

![Cover Image](/img/blog/2022/06/kubectl_top_cover.webp)

In this article, we will see how to use `kubectl Top` command to get and read metrics about pods and nodes. We will also breakdown the output to understand what it means.

But before we get down to learn about Kubectl Top command, let’s have a brief overview of a few concepts in Kubernetes.

<SignUps />

## What is kubectl?

`kubectl` is the Kubernetes command-line tool, and it allows you to run commands against your Kubernetes cluster. `kubectl` lets you interact with your Kubernetes cluster for day-to-day management. For example, `kubectl get nodes` lets you retrieve details about nodes running in your cluster or namespace.

Under the hood, `kubectl` interacts with the API server. The API server is responsible for all communication between Kubernetes components, including both the internal components of your Kubernetes cluster and external components. `kubectl` sends out `POST` commands to the API server endpoint in order to execute its commands.

## What is a pod in Kubernetes?

Kubernetes is meant to orchestrate the management of containers. Pods are the first level of abstraction that it provides over containers.

Pods are groups of one or more containers with shared resources like storage and networks. They are used as units of replication in cases where applications need to be scaled up or down. 

## What is a node in Kubernetes?

Nodes are where Kubernetes pods run. Nodes can be virtual machines, bare metal servers in a data center, or instances in a private or public cloud. Kubernetes uses nodes to handle on-demand scaling of resources.

A single node can have multiple pods separated by namespaces.

## What is `kubectl Top` command?

As mentioned before, `kubectl` - pronounced (Kube: c-t-l) - is a CLI for running commands that can help you interact with a Kubernetes interface or resources in a k8 cluster. These resources include pods, deploy, replica set, etc.

A **kubectl top** is a command used to list all the running nodes and pods along with their resource utilization. It provides you a snapshot of resource utilization metrics like CPU, memory, and storage on each running node.

Each node in Kubernetes comes with cAdvisor, which is an open-source agent that monitors resource usage about containers. `kubectl` command gets resource utilization metrics from cAdvisor via the metrics-server.

To obtain these metrics, you need to run the `kubectl top` command which shows the CPU, memory, and network utilization for the containers, pods, or nodes. For the `kubectl top` command to work, you need to have metrics API installed. You can find instructions to install metrics API <a href = "https://github.com/kubernetes-sigs/metrics-server" rel="noopener noreferrer nofollow" target="_blank">here</a>.

Now that you have a brief understanding of the concepts let’s see how the `kubectl top` command operates. 

## Using `kubectl top node`

Running the `kubectl top node` command lists metrics of the current node which would look like this:

```bash
$ kubectl top node

NAME                 CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%   
kind-control-plane   338m         4%     1662Mi          10%
```

### How to read the output from `kubectl top`?

The output from `kubectl top node` gives you information about CPU(cores), CPU%, memory, and memory%. Let’s see what these terms mean:

- CPU(cores)<br></br>
`338m` means 338 millicpu. `1000m` is equal to 1 CPU, hence 338m means 33.8% of 1 CPU.
- CPU%<br></br>
It is displayed only for nodes, and it stands for the total CPU usage percentage of that node.
- Memory<br></br>
Memory being used by that node
- Memory%<br></br>
It is also displayed only for nodes, and it stands for total memory usage percentage of that node.

## Using `kubectl top pod` command

Running the `kubectl top pod` command displays the metrics about pods from the `default` namespace which looks like this:

```bash

NAME                     CPU(Cores)   MEMORY(Bytes)
nginx                    3m           1Mi
nginx-653c7b42sd-4g5ce   3m           1Mi
nginx-653c7b42sd-7c9ae	 3m	          1Mi
```

Here `Mi` under memory stands for mebibytes.

Running the `kubectl top pod` command with `--all-namespaces` lists down pods from all namespaces in your k8s cluster. For example, below is a snapshot from [SigNoz](https://signoz.io/) k8s cluster.

```bash
$ kubectl top pod --all-namespaces
NAMESPACE            NAME                                                        CPU(cores)   MEMORY(bytes)   
kube-system          coredns-558bd4d5db-k7mfl                                    8m           11Mi            
kube-system          coredns-558bd4d5db-qwrrk                                    8m           12Mi            
kube-system          etcd-kind-control-plane                                     32m          45Mi            
kube-system          kindnet-trm65                                               1m           7Mi             
kube-system          kube-apiserver-kind-control-plane                           105m         408Mi           
kube-system          kube-controller-manager-kind-control-plane                  22m          62Mi            
kube-system          kube-proxy-8n86t                                            2m           17Mi            
kube-system          kube-scheduler-kind-control-plane                           5m           28Mi            
kube-system          metrics-server-57bfd75b9-bhrwl                              5m           14Mi            
local-path-storage   local-path-provisioner-547f784dff-tjnqb                     3m           9Mi             
platform             chi-signoz-cluster-0-0-0                                    43m          149Mi           
platform             clickhouse-operator-8cff468-hggdm                           1m           24Mi            
platform             my-release-signoz-alertmanager-0                            2m           14Mi            
platform             my-release-signoz-frontend-f8587978f-7wj8f                  1m           6Mi             
platform             my-release-signoz-otel-collector-cbf578f44-69twr            4m           52Mi            
platform             my-release-signoz-otel-collector-metrics-5dcb767c77-5bgpt   4m           38Mi            
platform             my-release-signoz-query-service-0                           3m           57Mi            
platform             my-release-zookeeper-0                                      5m           90Mi
```

You can also use the `--namespace` flag to get information about pods from a particular namespace. For example, in the below snapshot, we can see details about pods from the `platform` namespace.

```bash
$ kubectl top pod --namespace platform
NAME                                                        CPU(cores)   MEMORY(bytes)   
chi-signoz-cluster-0-0-0                                    44m          165Mi           
clickhouse-operator-8cff468-hggdm                           1m           24Mi            
my-release-signoz-alertmanager-0                            2m           14Mi            
my-release-signoz-frontend-f8587978f-7wj8f                  1m           6Mi             
my-release-signoz-otel-collector-cbf578f44-69twr            5m           54Mi            
my-release-signoz-otel-collector-metrics-5dcb767c77-5bgpt   5m           38Mi            
my-release-signoz-query-service-0                           3m           57Mi            
my-release-zookeeper-0                                      4m           91Mi
```

## Conclusion

Resource utilization metrics are key to understanding the health of your Kubernetes cluster. From the article, you learned how to get resource utilization snapshots using the `kubectl top` command. 

Though the `kubectl top` command gives you basic metrics about resource utilization, it is very convenient to inspect your nodes and pods at any time. For example, if you see that there is a sudden spike in your resource utilization, you can check which pod is consuming the most resources.

But if you're using Kubernetes in production, you can't rely on manual spot-checks to monitor your system's health and performance. Kubernetes provides us with a smarter way to manage our resources for scaling cloud-native applications on demand. You need to monitor your Kubernetes resources effectively. If you want to dive deeper into Kubernetes monitoring, you can check out [SigNoz](https://signoz.io/).


<figure data-zoomable align='center'>
    <img src="/img/blog/2022/06/k8s_node_monitoring.webp" alt="Node metrics monitoring with SigNoz"/>
    <figcaption><i>Kubernetes node metrics monitoring with SigNoz</i></figcaption>
</figure>

SigNoz is a full-stack open-source APM tool that can help you monitor your Kubernetes cluster. It uses [OpenTelemetry](https://opentelemetry.io/) to collect metrics from your K8s cluster for monitoring. OpenTelemetry is becoming the world standard for instrumentation of cloud-native applications, and it is backed by [CNCF](https://www.cncf.io/) foundation, the same foundation under which Kubernetes graduated.

SigNoz provides logs, metrics, and traces under a single pane of glass. It's easy to get started with SigNoz. SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank">Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

<figure data-zoomable>
    <img src="/img/blog/common/signoz_dashboard_homepage.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

Learn about `kubectl logs` command to get information from existing resources in Kubernetes cluster.

[Using Kubectl Logs | How to view Kubernetes Pod Logs?](https://signoz.io/blog/kubectl-logs/)

If you wish to learn more about how to monitor your Kubernetes cluster with OpenTelemetry and SigNoz, follow this blog:

[Kubernetes monitoring with OpenTelemetry and SigNoz](https://signoz.io/blog/kubernetes-monitoring/)

If you wish to learn more about SigNoz, follow this blog:

[SigNoz - an open-source alternative to DataDog](https://signoz.io/blog/open-source-datadog-alternative/)
