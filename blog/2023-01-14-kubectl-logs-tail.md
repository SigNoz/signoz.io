---
title: Kubectl Logs Tail | How to Tail Kubernetes Logs
slug: kubectl-logs-tail
date: 2023-01-14
tags: [Tech Tutorial, Log Management]
authors: [daniel]
description: The `kubectl logs tail` command is a tool that allows users to stream the logs of a pod in real-time while using Kubernetes. This command is particularly useful for...
image: /img/blog/2023/01/kubectl_logs_tail_cover.jpeg
keywords:
  - kubectl
  - kubernetes
  - kubectl logs
  - kubectl logs tail
  - kubectl get pod
  - pod
  - node
  - k8s metrics
  - kubernetes metrics
  - resource utilization
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/kubectl-logs-tail/"/>
</head>

import SignUps from '../docs/shared/sign-ups.md'
import LogsPerf from '../docs/shared/logs-perf-cta.md'

The `kubectl logs tail` command is a tool that allows users to stream the logs of a pod in real-time while using Kubernetes. This command is particularly useful for debugging and monitoring applications, as it enables users to view log output as it is generated and quickly identify any issues or problems with their application.

<!--truncate-->

![Cover Image](/img/blog/2023/01/kubectl_logs_tail_cover.webp)

In this article, we will see how to use the `kubectl logs tail` command to stream logs, the benefits of using the command, and an advanced tool for streaming logs.

Before we get started, let's quickly review some essential Kubernetes concepts.

<SignUps />

## What is `kubectl`?

Kubectl is the Kubernetes command-line tool that enables users to execute commands and interact with their Kubernetes cluster for everyday management tasks. With `kubectl`, users can perform various tasks related to the administration and maintenance of their cluster and applications, such as creating and updating deployments, scaling replicas, rolling out new features, etc.

## What is the `kubectl logs` command?

The `kubectl logs` command is a useful tool for accessing and viewing the logs of pods in a Kubernetes cluster. With this command, you can retrieve the log output of a pod and display it in the terminal for inspection.

Syntax for the `kubectl logs` command usage:

```
$ kubectl logs [-f] [-p] (POD | TYPE/NAME) [-c CONTAINER] [options]
```

The `kubectl logs` command provides various flags that can be used to tailor its functionality to your needs.

Some common options for `kubectl logs` include:

- `--follow`: Continuously stream the logs as they are generated.
- `--tail`: Specify the number of lines of log output to display.
- `--since`: Only show log output generated within a certain duration.
- `--timestamps`: Add timestamps to the log output.

A full list of all flag options by the command can be found on the official Kubernetes <a href = "https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#logs" rel="noopener noreferrer nofollow" target="_blank" >documentation page</a>.

<LogsPerf />

## The `tail` flag

The `tail` flag can be used in conjunction with the `kubectl logs` command to stream the latest logs in real-time, rather than returning all the logs at once. It can be used to specify the number of log lines to show from the end of the logs for a specific container in a pod.

Let's look at different ways to use the `tail` command with the `kubectl logs` command:

### Using the tail command with the pod name

The syntax for usage:

```
kubectl logs --tail=[number] [pod-name]
```

This will show the most recent [number] lines of output from the container in the specified pod.

An example is shown below;

```bash
# Display only the most recent 10 lines of output in pod nginx 
$ kubectl logs --tail=10 nginx   

2023/01/05 08:16:27 [notice] 1#1: using the "epoll" event method 
2023/01/05 08:16:27 [notice] 1#1: nginx/1.23.3 
2023/01/05 08:16:27 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6)  
2023/01/05 08:16:27 [notice] 1#1: OS: Linux 5.15.0-52-generic 
2023/01/05 08:16:27 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576 
2023/01/05 08:16:27 [notice] 1#1: start worker processes 
2023/01/05 08:16:27 [notice] 1#1: start worker process 30 
2023/01/05 08:16:27 [notice] 1#1: start worker process 31 
2023/01/05 08:16:27 [notice] 1#1: start worker process 32 
2023/01/05 08:16:27 [notice] 1#1: start worker process 33
```

In the below example, the tail number has been set to 15

```bash
# Display only the most recent 15 lines of output in pod nginx 
$ kubectl logs --tail=15 nginx   

10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf 
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf 
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh 
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh 
/docker-entrypoint.sh: Configuration complete; ready for start up 
2023/01/05 08:16:27 [notice] 1#1: using the "epoll" event method 
2023/01/05 08:16:27 [notice] 1#1: nginx/1.23.3 
2023/01/05 08:16:27 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6)  
2023/01/05 08:16:27 [notice] 1#1: OS: Linux 5.15.0-52-generic 
2023/01/05 08:16:27 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576 
2023/01/05 08:16:27 [notice] 1#1: start worker processes 
2023/01/05 08:16:27 [notice] 1#1: start worker process 30 
2023/01/05 08:16:27 [notice] 1#1: start worker process 31 
2023/01/05 08:16:27 [notice] 1#1: start worker process 32 
2023/01/05 08:16:27 [notice] 1#1: start worker process 33
```

### Using the tail command for all containers in a pod

The syntax for usage:

```bash
kubectl logs --tail=[number] --all-containers [pod-name]
```

This will show the most recent [number] lines of output from all containers in the specified pod.

### Using the tail command for a specific container in a pod

The syntax for usage:

```bash
kubectl logs --tail=[number] -c [container-name] [pod-name]
```

This will show the most recent [number] lines of output from a specific container in the specified pod.

### Using the `tail` flag with the `f` flag

The syntax for usage:

```bash
kubectl logs --tail=[number] -f [pod-name] or   
kubectl logs -f --tail=[number] [pod-name]
```

This will stream the logs from the container in the specified pod and show the most recent [number] lines of output. New lines will be shown as they are written.

An example can be seen below;

```bash
$ kubectl logs -f --tail=10 queue  

INFO | Apache ActiveMQ 5.14.3 (localhost, ID:queue-41599-1672906401588-0:1) started  
INFO | For help or more information please see: <http://activemq.apache.org>  
WARN | Store limit is 102400 mb (current store usage is 0 mb). The data directory: /apache-activemq-5.14.3/data/kahadb only has 31771 mb of usable space. - resetting to maximum available disk space: 31771 mb  
WARN | Temporary Store limit is 51200 mb (current store usage is 0 mb). The data directory: /apache-activemq-5.14.3/data only has 31771 mb of usable space. - resetting to maximum available disk space: 31771 mb  
INFO | No Spring WebApplicationInitializer types detected on classpath  
INFO | ActiveMQ WebConsole available at <http://0.0.0.0:8161/>  
INFO | ActiveMQ Jolokia REST API available at <http://0.0.0.0:8161/api/jolokia/>  
INFO | Initializing Spring FrameworkServlet 'dispatcher'  
INFO | No Spring WebApplicationInitializer types detected on classpath  
INFO | jolokia-agent: Using policy access restrictor classpath:/jolokia-access.xml
```

### Using the `tail` flag with the `p` flag

The syntax for usage:

```bash
kubectl logs --tail=[number] -p [pod-name] or
kubectl logs -p --tail=[number] [pod-name]
```

This will show the most recent [number] lines of output from the previously terminated container in the specified pod.

An example is shown below;

```bash
$ kubectl logs -p --tail=10 queue    

INFO | Connector mqtt stopped  
INFO | Connector ws stopped  
INFO | PListStore:[/apache-activemq-5.14.3/data/localhost/tmp_storage] stopped  
INFO | Stopping async queue tasks  
INFO | Stopping async topic tasks  
INFO | Stopped KahaDB  
INFO | Apache ActiveMQ 5.14.3 (localhost, ID:queue-39515-1672238886867-0:1) uptime 11 minutes  
INFO | Apache ActiveMQ 5.14.3 (localhost, ID:queue-39515-1672238886867-0:1) is shutdown  INFO | Closing org.apache.activemq.xbean.XBeanBrokerFactory$1@5bcab519: startup date [Wed Dec 28 14:48:01 UTC 2022]; root of context hierarchy  
INFO | Destroying Spring FrameworkServlet 'dispatcher'
```

### Using the `tail` flag with the `since` flag

Syntax for usage:

```bash
kubectl logs --tail=[number] --since=[duration] [pod-name]
```

This will show the most recent [number] lines of logs written in the past [duration], for example, 1h, from the container in the specified pod.

```bash
$ kubectl logs --tail=5 --since=1h nginx 

2023/01/05 08:16:27 [notice] 1#1: start worker processes 
2023/01/05 08:16:27 [notice] 1#1: start worker process 30 
2023/01/05 08:16:27 [notice] 1#1: start worker process 31 
2023/01/05 08:16:27 [notice] 1#1: start worker process 32 
2023/01/05 08:16:27 [notice] 1#1: start worker process 33
```

## Benefits of the `kubectl logs tail` command

The `kubectl logs --tail` command offers the ability to stream the most recent logs in real-time, making it an invaluable tool for debugging issues within a pod. By providing a live view of the logs as they are generated, this command enables users to quickly identify and troubleshoot problems as they arise. For instance, if an error is occurring in a container, `kubectl logs --tail` can be used to stream the logs and search for error messages or other indicators of the issue at hand.

In addition to its usefulness in debugging, `kubectl logs --tail` can also serve as a means of monitoring the output of long-running processes. By streaming the logs of such processes, users can track the progress of a task and identify any potential issues as they occur. This feature can be particularly helpful in keeping tabs on the status of tasks that take an extended period of time to complete.

## Final Thoughts

`kubectl logs tail` is a useful command for accessing and following the logs of a running container in a Kubernetes cluster. While it can be a convenient way to view and troubleshoot logs in real-time, it may not be the most efficient or comprehensive solution for managing logs in a production environment. These limitations include the lack of built-in features for organizing, storing, or analyzing logs, and the lack of options for filtering or highlighting specific log events. In addition, the command does not provide any alerting or notification capabilities and does not integrate with other tools or platforms for log management or analysis.

To overcome these limitations, consider using a third-party log management system like [SigNoz](https://signoz.io/), which provides a centralized platform for storing, analyzing, and visualizing logs from multiple sources. SigNoz can help you to gain insights into the performance and health of your Kubernetes applications, and identify and resolve issues more efficiently.

## Kubectl log analysis with SigNoz

SigNoz is a cloud-native observability platform that provides comprehensive logs and metrics management and tracing capabilities for Kubernetes clusters. It offers a robust platform for log analysis and monitoring in Kubernetes clusters, making it easy to collect, search, analyze, and visualize logs generated by pods and containers.

One of the key features offered by SigNoz is the ability to analyze logs generated by `kubectl`. This is accomplished by forwarding the cluster logs to SigNoz, which then automatically ingests and indexes the logs. This allows users to query and analyze the logs in real-time through the SigNoz web interface or API.

SigNoz's logs tab offers numerous advanced features, including a log query builder, the ability to search through multiple fields, a structured table view, and the option to view logs in JSON format.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Log management in SigNoz"/>
    <figcaption><i>Log management in SigNoz</i></figcaption>
</figure>

<br></br>

With SigNoz, you have the ability to analyze logs in real-time, allowing for quick searching, filtering, and visualization as they are generated. This can aid in uncovering patterns, trends, and potential issues and resolving them in a timely manner.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/10/signoz_live_logs.webp" alt="Live Tail Logging in SigNoz"/>
    <figcaption><i>Live Tail Logging in SigNoz</i></figcaption>
</figure>

<br></br>

The advanced Log Query Builder feature in SigNoz allows you to filter logs quickly by using a combination of different fields.
<figure data-zoomable align='center'>
    <img src="/img/blog/2022/10/signoz_log_query_builder.webp" alt="Advanced Log Query Builder in SigNoz"/>
    <figcaption><i>Advanced Log Query Builder in SigNoz</i></figcaption>
</figure>

<br></br>

## Getting started with SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs [Docker Engine](https://docs.docker.com/engine/install/) on Linux. However, on macOS, you must manually install Docker Engine before running the install script.

```
git clone --single-branch --depth 1 <https://github.com/SigNoz/signoz.git> 
cd signoz/deploy/ 
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

---

**Related Posts**

[Using Kubectl Logs | How to view Kubernetes Pod Logs? | SigNoz](https://signoz.io/blog/kubectl-logs/)

[SigNoz - A Lightweight Open Source ELK alternative](https://signoz.io/blog/elk-alternative-open-source/)