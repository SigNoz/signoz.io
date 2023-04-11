---
id: docker-swarm
title: Docker Swarm
description: Learn how to operate SigNoz on Docker Swarm
---

Once you have successfully installed SigNoz on Docker Swarm, the following sections provide an overview of the activities that are required to successfully operate SigNoz.

## Stop/Start SigNoz Cluster

To stop SigNoz cluster:

```bash
docker stack rm signoz
```

To start/resume SigNoz cluster:

```bash
docker stack deploy -c docker-swarm/clickhouse-setup/docker-compose.yaml signoz
```

_*Note: The newly created SigNoz cluster should mount on the existing local path in the node._


## Upgrade SigNoz Cluster

To upgrade, you can manually update the image tag for `query-service`, `frontend` and `otel-collector`.
And run the command to start the cluster:

```bash
docker stack deploy -c docker-swarm/clickhouse-setup/docker-compose.yaml signoz
```

_*Note:_
- Be careful! There might be configuration changes and version mismatch.
- Before upgrading, checkout to the release tag: for example `git checkout v0.6.1` and compare the Docker Compose YAML and config files.

## Uninstall SigNoz Cluster

To delete/uninstall SigNoz cluster:

```bash
docker stack rm signoz
```

## Scale Up SigNoz Cluster

SigNoz uses the [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) to ingest data. By default, the instructions in the [Install SigNoz on Docker Swarm](/docs/install/docker-swarm) document create three replicas, and each replica can handle 50K spans per second. To handle an increased load, perform the following steps:

1. Open the `deploy/docker-swarm/clickhouse-setup/docker-compose.yaml` file in a plain-text editor.

2. In the `services.otel-collector.deploy.replicas` field, enter the number of replicas you wish to create. The following example creates four replicas:

  ![Open Telemetry Collector - Create four replicas](/img/scale-up-otel.png)

3. Update the `signoz` stack by entering the following command:

  ```bash
docker stack deploy -c docker-swarm/clickhouse-setup/docker-compose.yaml signoz
  ```
