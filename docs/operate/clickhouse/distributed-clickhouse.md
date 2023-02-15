---
id: distributed-clickhouse
title: Set Up Distributed ClickHouse for SigNoz
sidebar_label: Distributed ClickHouse
---

:::info
In v0.12, SigNoz introduces support for distributed clickhouse. Multiple replicas for clickhouse shards are not supported in v0.12.0, please follow upcoming releases to check availability.
:::

## Prerequisites

- SigNoz version >= 0.12
- SigNoz OtelCollector >= 0.66
- SigNoz Chart >= 0.6.0
- Zookeeper (or ClickHouse Keeper) is mandatory for running a distributed
ClickHouse cluster
- 3 nodes Zookeeper cluster recommended for distributed ClickHouse cluster
with production environment, while single instance of Zookeeper should suffice for
development environment.

## Distributed ClickHouse Setup for SigNoz

Basically, distributed ClickHouse cluster consists of the following:

- More than one clickhouse shard instances
- All clickhouse server information included in `remote_servers` clickhouse config as shards
- Zookeeper cluster with 1 or 3 nodes, and including it in `zookeeper` clickhouse config

Follow the instructions in the respective sections below to set up distributed
clickhouse with multiple shards for your SigNoz cluser.

### Using Docker 

For ClickHouse cluster with 3 shards, you will need to include additional
clickhouse services in `docker-compose.yaml`. You will also need to update
`clickhouse-cluster.xml` to include those additional clickhouse services
as multiple shards.

That can be done in the by un-commenting the following in `docker-compose.yaml`:

```yaml
x-clickhouse-depend: &clickhouse-depend
  depends_on:
    clickhouse:
      condition: service_healthy
    clickhouse-2:
      condition: service_healthy
    clickhouse-3:
      condition: service_healthy

services:
  ...

  clickhouse-2:
    <<: *clickhouse-defaults
    container_name: clickhouse-2
    hostname: clickhouse-2
    ports:
      - "9001:9000"
      - "8124:8123"
      - "9182:9181"
    volumes:
      - ./clickhouse-config.xml:/etc/clickhouse-server/config.xml
      - ./clickhouse-users.xml:/etc/clickhouse-server/users.xml
      - ./clickhouse-cluster.xml:/etc/clickhouse-server/config.d/cluster.xml
      # - ./clickhouse-storage.xml:/etc/clickhouse-server/config.d/storage.xml
      - ./data/clickhouse-2/:/var/lib/clickhouse/

  clickhouse-3:
    <<: *clickhouse-defaults
    container_name: clickhouse-3
    hostname: clickhouse-3
    ports:
      - "9002:9000"
      - "8125:8123"
      - "9183:9181"
    volumes:
      - ./clickhouse-config.xml:/etc/clickhouse-server/config.xml
      - ./clickhouse-users.xml:/etc/clickhouse-server/users.xml
      - ./clickhouse-cluster.xml:/etc/clickhouse-server/config.d/cluster.xml
      # - ./clickhouse-storage.xml:/etc/clickhouse-server/config.d/storage.xml
      - ./data/clickhouse-3/:/var/lib/clickhouse/
```

To switch to **3 nodes** Zookeepers cluster from default **1 node** Zookeeper,
un-comment the following in `docker-compose.yaml`:

```yaml
x-clickhouse-defaults: &clickhouse-defaults
  ...
  depends_on:
    - zookeeper-1
    - zookeeper-2
    - zookeeper-3

services:
  zookeeper-1:
    ...
    environment:
      - ZOO_SERVER_ID=1
      - ZOO_SERVERS=0.0.0.0:2888:3888,zookeeper-2:2888:3888,zookeeper-3:2888:3888
      ...

  zookeeper-2:
    image: bitnami/zookeeper:3.7.0
    container_name: zookeeper-2
    hostname: zookeeper-2
    user: root
    ports:
      - "2182:2181"
      - "2889:2888"
      - "3889:3888"
    volumes:
      - ./data/zookeeper-2:/bitnami/zookeeper
    environment:
      - ZOO_SERVER_ID=2
      - ZOO_SERVERS=zookeeper-1:2888:3888,0.0.0.0:2888:3888,zookeeper-3:2888:3888
      - ALLOW_ANONYMOUS_LOGIN=yes
      - ZOO_AUTOPURGE_INTERVAL=1

  zookeeper-3:
    image: bitnami/zookeeper:3.7.0
    container_name: zookeeper-3
    hostname: zookeeper-3
    user: root
    ports:
      - "2183:2181"
      - "2890:2888"
      - "3890:3888"
    volumes:
      - ./data/zookeeper-3:/bitnami/zookeeper
    environment:
      - ZOO_SERVER_ID=3
      - ZOO_SERVERS=zookeeper-1:2888:3888,zookeeper-2:2888:3888,0.0.0.0:2888:3888
      - ALLOW_ANONYMOUS_LOGIN=yes
      - ZOO_AUTOPURGE_INTERVAL=1
```

Next, you will have to un-comment the following from `clickhouse-cluster.xml`:

```xml
<clickhouse>
    <zookeeper>
        ...
        <node index="2">
            <host>zookeeper-2</host>
            <port>2181</port>
        </node>
        <node index="3">
            <host>zookeeper-3</host>
            <port>2181</port>
        </node>
    </zookeeper>

    <remote_servers>
        <cluster>
            ...
            <shard>
                <replica>
                    <host>clickhouse-2</host>
                    <port>9000</port>
                </replica>
            </shard>
            <shard>
                <replica>
                    <host>clickhouse-3</host>
                    <port>9000</port>
                </replica>
            </shard>
        </cluster>
    </remote_servers>
</clickhouse>
```

### Using Docker Swarm

To set up ClickHouse cluster with 3 shards in Docker Swarm, you will need to include additional
clickhouse services in `docker-compose.yaml`. You will also need to update
`clickhouse-cluster.xml` to include those additional clickhouse services
as multiple shards.

That can be done in the by un-commenting the following in `docker-compose.yaml`:

```yaml
x-clickhouse-depend: &clickhouse-depend
  depends_on:
    clickhouse:
      condition: service_healthy
    clickhouse-2:
      condition: service_healthy
    clickhouse-3:
      condition: service_healthy

services:
  ...

  clickhouse-2:
    <<: *clickhouse-defaults
    hostname: clickhouse-2
    ports:
      - "9001:9000"
      - "8124:8123"
      - "9182:9181"
    volumes:
      - ./clickhouse-config.xml:/etc/clickhouse-server/config.xml
      - ./clickhouse-users.xml:/etc/clickhouse-server/users.xml
      - ./clickhouse-cluster.xml:/etc/clickhouse-server/config.d/cluster.xml
      # - ./clickhouse-storage.xml:/etc/clickhouse-server/config.d/storage.xml
      - ./data/clickhouse-2/:/var/lib/clickhouse/

  clickhouse-3:
    <<: *clickhouse-defaults
    hostname: clickhouse-3
    ports:
      - "9002:9000"
      - "8125:8123"
      - "9183:9181"
    volumes:
      - ./clickhouse-config.xml:/etc/clickhouse-server/config.xml
      - ./clickhouse-users.xml:/etc/clickhouse-server/users.xml
      - ./clickhouse-cluster.xml:/etc/clickhouse-server/config.d/cluster.xml
      # - ./clickhouse-storage.xml:/etc/clickhouse-server/config.d/storage.xml
      - ./data/clickhouse-3/:/var/lib/clickhouse/
```

To switch to **3 nodes** Zookeepers cluster from default **1 node** Zookeeper,
un-comment the following in `docker-compose.yaml`:

```yaml
x-clickhouse-defaults: &clickhouse-defaults
  ...
  depends_on:
    - zookeeper-1
    - zookeeper-2
    - zookeeper-3

services:
  zookeeper-1:
    ...
    environment:
      - ZOO_SERVER_ID=1
      - ZOO_SERVERS=0.0.0.0:2888:3888,zookeeper-2:2888:3888,zookeeper-3:2888:3888
      ...

  zookeeper-2:
    image: bitnami/zookeeper:3.7.0
    hostname: zookeeper-2
    user: root
    ports:
      - "2182:2181"
      - "2889:2888"
      - "3889:3888"
    volumes:
      - ./data/zookeeper-2:/bitnami/zookeeper
    environment:
      - ZOO_SERVER_ID=2
      - ZOO_SERVERS=zookeeper-1:2888:3888,0.0.0.0:2888:3888,zookeeper-3:2888:3888
      - ALLOW_ANONYMOUS_LOGIN=yes
      - ZOO_AUTOPURGE_INTERVAL=1

  zookeeper-3:
    image: bitnami/zookeeper:3.7.0
    hostname: zookeeper-3
    user: root
    ports:
      - "2183:2181"
      - "2890:2888"
      - "3890:3888"
    volumes:
      - ./data/zookeeper-3:/bitnami/zookeeper
    environment:
      - ZOO_SERVER_ID=3
      - ZOO_SERVERS=zookeeper-1:2888:3888,zookeeper-2:2888:3888,0.0.0.0:2888:3888
      - ALLOW_ANONYMOUS_LOGIN=yes
      - ZOO_AUTOPURGE_INTERVAL=1
```

Next, you will have to un-comment the following from `clickhouse-cluster.xml`:

```xml
<clickhouse>
    <zookeeper>
        ...
        <node index="2">
            <host>zookeeper-2</host>
            <port>2181</port>
        </node>
        <node index="3">
            <host>zookeeper-3</host>
            <port>2181</port>
        </node>
    </zookeeper>

    <remote_servers>
        <cluster>
            ...
            <shard>
                <replica>
                    <host>clickhouse-2</host>
                    <port>9000</port>
                </replica>
            </shard>
            <shard>
                <replica>
                    <host>clickhouse-3</host>
                    <port>9000</port>
                </replica>
            </shard>
        </cluster>
    </remote_servers>
</clickhouse>
```

### Kubernetes Installation

To set up ClickHouse cluster with **3 shards** and  **3 nodes** Zookeeper cluster,
include the following in `override-values.yaml`:

```yaml
clickhouse:
  layout:
    shardsCount: 3
    replicasCount: 1

  zookeeper:
    replicaCount: 3
```

Followed by `helm upgrade` command:

```bash
helm --namespace platform upgrade my-release signoz/signoz -f override-values.yaml
```

:::info
Multiple replicas for clickhouse shards are not supported in v0.12.0 so don't change `replicasCount` in the clickhouse config, please follow upcoming releases to check availability of replication of clickhouse shards
:::

:::info
Replace `my-release` and `platform` from above with appropriate release name
and SigNoz namespace respectively.
:::
