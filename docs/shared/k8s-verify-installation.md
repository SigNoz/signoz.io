import RetentionInfo from './retention-info.md'

Using the `kubectl -n platform get pods` command, monitor the SigNoz deployment process.
Wait for all the pods to be in running state:

```bash
kubectl -n platform get pods
```

Output:
```
NAME                                                        READY   STATUS    RESTARTS   AGE
chi-signoz-cluster-0-0-0                                    1/1     Running   0          8m21s
clickhouse-operator-8cff468-n5s99                           2/2     Running   0          8m55s
my-release-signoz-alertmanager-0                            1/1     Running   0          8m54s
my-release-signoz-frontend-78774f44d7-wl87p                 1/1     Running   0          8m55s
my-release-signoz-otel-collector-66c8c7dc9d-d8v5c           1/1     Running   0          8m55s
my-release-signoz-otel-collector-metrics-68bcfd5556-9tkgh   1/1     Running   0          8m55s
my-release-signoz-query-service-0                           1/1     Running   0          8m54s
my-release-zookeeper-0                                      1/1     Running   0          8m54s
```

<RetentionInfo />