---
title: Docker Logging Complete Guide (Configuration & Logging strategies)
slug: docker-logging
date: 2023-10-15
tags: [Tech Tutorial]
authors: [muskan]
description: In this article, we will discuss log analysis in Docker and how logging in Docker containers is different than in other applications. These logs are specific to Docker and are stored on the Docker host. We’ll thoroughly discuss the `docker logs` command and how we can configure a logging driver for containers...
image: /img/blog/2022/08/docker_logging_cover.jpeg
keywords:
  - docker logging
  - docker logs
  - docker compose logs
  - signoz
  - open source apm
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/docker-logging/"/>
</head>


import SignUps from '../docs/shared/sign-ups.md'
import LogsPerf from '../docs/shared/logs-perf-cta.md'

Log analysis is a very powerful feature for an application when it comes to debugging and finding out which flow is working properly in the application and which is not. Log management helps the DevOps team debug and troubleshoot issues faster, making it easier to identify patterns, spot bugs, and ensure they don’t come back to bite you!

<!--truncate-->

![Cover Image](/img/blog/2022/08/docker_logging_cover.webp)

In this article, we will discuss log analysis in Docker and how logging in Docker containers is different than in other applications. These logs are specific to Docker and are stored on the Docker host. We’ll thoroughly discuss the `docker logs` command and how we can configure a logging driver for containers.

## Why is Docker logging different?

Life would be much simpler if applications running inside containers always behaved correctly. But unfortunately, as every developer knows, that is never the case.

With other systems, recording application log messages can be done explicitly by writing those messages to the system logger. This is done using `syslog()` system call from our application. But this doesn’t work for containerized logging; here’s why:

- **Containers are Multi-leveled**<br></br>
    Containers are just like boxes inside a big box. No matter how simple the Docker installation is, we’ll have to deal with two levels of aggregation. One level is where you see logs inside the container in your Dockerized application, known as **Docker Container Logs**.
    
    The second level where you see the logs from the host servers (that is, **system logs** or **Docker daemon logs**). These are generally located in `/var/log`.<br></br>

    A log aggregator that has access to the host application can not pull log files from the Dockerized application as if they are the host log files. In these scenarios, we will have to find a way to correlate the logs.
    
- **Containers are ephemeral**
    
    Container-based environments keep changing very often but it doesn’t serve well to the monitor. Docker containers emit logs to `stdout` and `stderr` output streams.  
    
    Logs are often stored on the Docker host because containers are stateless (failing to remember or save data from previous actions). 
    
    `json-file` is the default logging driver which writes JSON-formatted logs to a container-specific file.The `json-file` is stored in the `/var/lib/docker/containers/` directory on a Linux Docker host. Here’s how you can access the file:
    
    ```docker
    /var/lib/docker/containers/<container id>/<container-id>-json.log      
    ```
    
    It is dangerous to store logs in a Docker host because Docker doesn’t impose any size limit on log files, and they can build up over time and eat into your disk space. It is advised to store logs in a centralized location and enable [log rotation](https://signoz.io/blog/docker-log-rotation/) for all the Docker containers. 


<LogsPerf />
    

## `docker logs` command

**`docker logs`** command is used to get all the information logged by a running container. The **`docker service logs`** command is used to do the same by all the containers participating in a service. 

The example below shows JSON logs created by the [hello-world](https://hub.docker.com/_/hello-world) Docker image using json-file driver:

```docker
{"log":"Hello there!\n","stream":"stdout","time":"2022-07-28T22:51:31.549390877Z"}
{"log":"This message shows that everything seems to be working correctly.\n","stream":"stdout","time":"2022-07-28T22:51:31.549396749Z"}
```

The log follows a pattern of printing:

- Log’s origin
- Either **`stdout`** or **`stderr`**
- A timestamp

In order to review a container’s logs from the command line, you can use the `docker logs <container-id>`  command. Using this command, the logs shown above are displayed this way:

```docker
Hello there!
This message shows that everything seems to be working correctly.
```

Here are a few [options](https://docs.docker.com/engine/reference/commandline/logs/#options) in the command that you can use to modify the output of your log:

```docker
docker logs [OPTIONS] <container-id>
```

- Using `-f` or `--follow` option, if you want to follow the logs:
    
    ```docker
    docker logs <container_id> --follow
    ```
    
- If you want to see the last `N` log lines:
    
    ```docker
    docker logs <container-id> --tail N
    ```
    
- If you want to see the specific logs, use the `grep` command:
    
    ```docker
    docker logs <container_id> | grep pattern
    ```
    
- If you want to show errors:
    
    ```docker
    docker logs <container_id> | grep -i error
    ```
    

Once an application starts growing, you tend to start using Docker Compose. `docker compose logs` command shows logs from all the services running in the containerized application.

> Note that the offering from the `docker logs` command may vary based on the Docker version you are using. In case of [Docker Community](https://www.docker.com/community/), `docker logs` can only read logs created by the `json-file`, local, and `journald` drivers whereas in case of [Docker Enterprise](https://docs.docker.com/config/containers/logging/dual-logging/), `docker logs` can read logs created by any logging driver.
> 

## Configure a Docker container to use a logging driver

### Step1: Configure the Docker daemon to a logging driver

Set the value of the **`log-driver`** key to the name of the logging driver in the `daemon.json` configuration file. Then restart Docker for the changes to take effect for all the newly created containers. All the existing containers will remain as they are.

Let’s set up a default driver with some additional information:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "20m",
    "max-file": "10",
  }
}
```

To find the current logging driver for the Docker daemon:

```docker
$ docker info --format '{{.LoggingDriver}}'

json-file
```

In order to use a different driver, you can override the default by adding the `--log-driver` option to the `docker run` command that creates a container. 

For example, the following command creates an Apache httpd container, overriding the default logging driver to use the **journald** driver instead.

```docker
docker run --log-driver journald httpd
```

### Step 2: Deciding the delivery mode of log messages from container to log driver

Docker provides two types of delivery modes for log messages.

- **Blocking(default mode)**<br></br>
    As the name suggests, this mode blocks the main process inside a container to deliver log messages. And this will add latency to the performance of the application. But, it ensures that all the log messages will be successfully delivered to the log driver. 
    
    The default log driver (`json-files`) logs messages very quickly since it writes to the local file system. Therefore it’s unlikely to cause latency. But drivers like **`gcplogs`** and **`awslogs`** open a connection to a remote server and are more likely to block and cause latency.

- **Non-blocking**<br></br>
    In this mode, the container writes logs to an in-memory ring buffer. This in-memory ring buffer works like a mediator between logging-driver and the container. When the logging-driver isn’t busy processing the logs, the container shares the logs to the driver immediately. But when the driver is busy, these logs are put into the ring-buffer.
    
    This provides you a safety check that a high volume of logging activity won’t affect the application’s performance running inside the container. But there is a downside. It doesn’t guarantee that all the log messages will be delivered to the logging driver. In cases where log broadcasts are faster than the driver processor, the ring buffer will soon run out of space. As a result, buffered logs are deleted to make space for the next set of incoming logs. The default value for **`max-buffer-size`** is 1 MB.
    
    To change the mode:
    
    ```json
    # /etc/docker/daemon.json
    {
        "log-driver": "json-file",
        "log-opts": {
            "max-size": "20m",
    		    "max-file": "10",
            "mode": "non-blocking"
        }
    }
    ```
    
    Alternatively, you can set the non-blocking mode on an individual container by using the `--log-opt` option in the command that creates the container:
    
    ```json
    docker run --log-opt mode=non-blocking alpine echo hello world
    ```
    

The default log driver stores data in a local file, but if you want more features, then you can opt for other log drivers as well, such as `logagent`, `syslog`, `journald`, `elf`, `awslogs`, etc. 

## Logging strategies

Docker logging means logging events of the dockerized application, host OS and the docker service. There are various ways to log events for a docker container. 

Some of them are:

- **Application logging**: In this strategy, the application inside the container can have its own logging framework. The logs can either be stored locally or sent to a centralized location using a log management tool.

- **Data volumes**: Because containers are stateless, and to avoid losing logs data, you can bind the container’s directory to the host OS directory. Containers can now be terminated or shut down, and access logs from multiple containers. You can run a regular backup in order to prevent data corruption or loss in case of failure.

- **Docker logging driver**: This type has already been discussed in detail. The configured driver reads the data broadcast by the container’s **`stdout`** or **`stderr`** streams and writes it to a file on the host machine. You can then send this log data anywhere you want to.

## Final Thoughts

Containerization surely provides an easy way to deal with application portability and scalability issues but it does requires maintenance from time to time. Container environments are  just like a box inside a box, with multiple layers of abstraction. So, it becomes hard to debug in such environments and if performed correctly, log-analysis can be your go-to friend to find out performance related issues. 

In this guide, you learned how to configure the Docker logging driver for log analysis in containerized applications, how Docker logging is different from application logging hosted on a physical machine or virtual host, and in detail study of the docker logs command.

There are various logging strategies that you can follow for log analysis. This blog thoroughly discussed the default logging strategy - `json-file` and the two delivery modes of log messages. Containers being stateless, doesn’t ensure data persistence, hence to prevent data loss, you can use a log management tool. [SigNoz](https://signoz.io/) - an open source APM and observability tool provides an efficient log management solution.

SigNoz uses a columnar database - ClickHouse, for storing logs efficiently. Big companies like <a href = "https://www.uber.com/en-IN/blog/logging/" rel="noopener noreferrer nofollow" target="_blank" >Uber</a> and <a href = "https://blog.cloudflare.com/log-analytics-using-clickhouse/" rel="noopener noreferrer nofollow" target="_blank" >Cloudflare</a> have shifted from Elasticsearch to  ClickHouse for storing their log data.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Log Management in SigNoz"/>
    <figcaption><i>Logs management in SigNoz</i></figcaption>
</figure>

<br></br>

## Getting started with SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

You can also check out the documentation for logs [here](https://signoz.io/docs/userguide/logs/).


But logs are just one aspect of getting insights from your software systems. Modern applications are complex distributed systems. For debugging performance issues, you need to make your systems observable. Logs, when combined with metrics and traces form an observability dataset that can help you debug performance issues quickly.

SigNoz can help you monitor your application by collecting all types of telemetry data. It correlates all your telemetry data(logs, metrics, and traces) into a single suite of monitoring. It is built to support OpenTelemetry natively. OpenTelemetry is becoming the world standard for instrumenting cloud-native applications.

You can check out SigNoz GitHub repo:

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)


---

If you want to read more about SigNoz, check out the following blog:

[SigNoz - an open source alternative to DataDog](https://signoz.io/blog/open-source-datadog-alternative/)