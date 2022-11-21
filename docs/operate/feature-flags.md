---
id: feature-flags
title: Feature Flags
description: Learn how to use feature flags in SigNoz.
---

## Available Feature Flags

`TIMESTAMP_SORT_FEATURE` and `DURATION_SORT_FEATURE` are enabled by default.

- `TIMESTAMP_SORT_FEATURE`: When this feature is enabled, then SigNoz creates a materialized view table to optimize sorting spans/traces by timestamp at cost of increasing storage by 40-50% of `signoz_index_v2` table.

- `DURATION_SORT_FEATURE`: When this feature is enabled, then SigNoz creates a projection over table to optimize sorting spans/traces by timestamp at cost of increasing storage by 40-50% of `signoz_index_v2` table.



:::note
To toggle features, configs have to be added on both OTel Collector and Query Service
:::

## Adding configs to OTel collector

Features can be enabled or disabled via the arguments to OTel Collector with the `--feature-gates` flag. 

:::info
When using the `--feature-gates` flag, feature identifiers must be presented as a comma-delimited list. Feature identifiers prefixed with `-` will disable the feature, and prefixing with `+` or with no prefix will enable the feature.
:::

To disable both `DURATION_SORT_FEATURE` and `TIMESTAMP_SORT_FEATURE` , you need to update the `docker-compose.yaml` file of SigNoz installation.

Replace [this line](https://github.com/SigNoz/signoz/blob/65af8c1b98d85469da6fdb40584df24457c9dbb4/deploy/docker/clickhouse-setup/docker-compose.yaml#L85) in your file with below line:

```bash
command: ["--config=/etc/otel-collector-config.yaml", "--feature-gates=-DURATION_SORT_FEATURE,-TIMESTAMP_SORT_FEATURE"]
```

## Adding configs to Query Service

We need to set environment variables to toggle features. Add new environment variables [here](https://github.com/SigNoz/signoz/blob/65af8c1b98d85469da6fdb40584df24457c9dbb4/deploy/docker/clickhouse-setup/docker-compose.yaml#L52) to enable or disable features:

```bash
- DURATION_SORT_FEATURE=false
- TIMESTAMP_SORT_FEATURE=false
```