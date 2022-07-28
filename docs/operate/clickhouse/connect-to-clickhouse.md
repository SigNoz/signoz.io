---
id: connect-to-clickhouse
title: Connect to ClickHouse
sidebar_label: Connect to ClickHouse
---

import CHClientWithOutput from '../../shared/ch-client-with-output.md'

Follow the instructions below for connecting to your clickhouse database:

## Docker

1. To exec to `clickhouse` container:

```bash
docker exec -it clickhouse-setup_clickhouse_1 bash
```

<CHClientWithOutput/>

## Docker Swarm

To exec to `clickhouse` container:

```bash
docker exec -it $(docker ps -q -f name=signoz_clickhouse) bash
```

<CHClientWithOutput/>

## Kubernetes

To exec to `clickhouse` pod:

```bash
kubectl -n platform exec -i --tty pod/chi-signoz-cluster-0-0-0 -- bash
```

<CHClientWithOutput/>

:::warning
You are connected to your production database, proceed with caution!
:::