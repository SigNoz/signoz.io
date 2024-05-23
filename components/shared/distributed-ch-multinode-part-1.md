Next, you will have to toggle `DOCKER_MULTI_NODE_CLUSTER` environment variable
to `true` to ensure migrations are run on new instances (shards) of clickhouse.

```yaml
services:  
  otel-collector:
    environment:
      - DOCKER_MULTI_NODE_CLUSTER=true
```