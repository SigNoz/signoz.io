Output:
```
NAME: my-release
LAST DEPLOYED: Mon May 23 20:34:55 2022
NAMESPACE: platform
STATUS: deployed
REVISION: 1
NOTES:
1. You have just deployed SigNoz cluster:

- frontend version: '0.8.0'
- query-service version: '0.8.0'
- alertmanager version: '0.23.0-0.1'
- otel-collector version: '0.43.0-0.1'
- otel-collector-metrics version: '0.43.0-0.1'
```

  *_Note that the above command installs the latest stable version of SigNoz._
  
  (Optional) To install a different version, you can use the `--set` flag to specify the version you wish to install. The following example command installs SigNoz version `0.8.0`:
  
```bash
helm --namespace platform install my-release signoz/signoz \
  --set frontend.image.tag="0.8.0" \
  --set queryService.image.tag="0.8.0"
```

:::info
  - If you use the `--set` flag, ensure that you specify the same versions for the `frontend` and `queryService` images. Specifying different versions could lead the SigNoz cluster to behave abnormally.
  - Do not use the `latest` or `develop` tags in a production environment. Specifying these tags could install different versions of SigNoz on your cluster and could lead to data loss.
:::

5. You can access SigNoz by setting up port forwarding and browsing to the specified port. The following `kubectl port-forward` example command forwards all connections made to `localhost:3301` to `<signoz-frontend-service>:3301`:

```bash
export SERVICE_NAME=$(kubectl get svc --namespace platform -l "app.kubernetes.io/component=frontend" -o jsonpath="{.items[0].metadata.name}")

kubectl --namespace platform port-forward svc/$SERVICE_NAME 3301:3301
```