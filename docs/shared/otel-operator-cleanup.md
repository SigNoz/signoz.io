At last, we can clean it all up:

To remove spring-petclinic deployment:

```bash
kubectl delete deployment/spring-petclinic
```

To remove OpenTelemetry Instrumentation:

```bash
kubectl delete instrumentation/my-instrumentation
```