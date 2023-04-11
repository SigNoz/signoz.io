To obtain name of the Pet Clinic pod:

```bash
export POD_NAME=$(kubectl get pod -l app=spring-petclinic -o jsonpath="{.items[0].metadata.name}")
```

To forward port `8080` of the Pet Clinic pod:

```bash
kubectl port-forward ${POD_NAME} 8080:8080
```

Now, let's use Pet Clinic UI for a while in browser to generate telemetry
data: [http://localhost:8080](http://localhost:8080).

![Spring Pet Clinic metrics page](/img/docs/otel-operator-spring-pet-clinic.png)