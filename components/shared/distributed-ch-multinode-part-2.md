(Optional) After the migration files run once in all clickhouse instances
and healthy SigNoz cluster is verified, you need to make sure migration
files do not run for every `otel-collector` container restart.

You can do that by toggling back `DOCKER_MULTI_NODE_CLUSTER` environment
variable back to `false`.

```yaml
services:  
  otel-collector:
    environment:
      - DOCKER_MULTI_NODE_CLUSTER=false
```
