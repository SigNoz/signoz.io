### Step 3: Add Service Name of your Application

To add the service name of your application, you need to set the
`OTEL_RESOURCE_ATTRIBUTES` environment variable of the application container
to `service.name=<your-service-name>`.

In your task definition, you can add the following lines.

```yaml

...
    ContainerDefinitions:
        - Name: <your-container-name>
          ...
          Environment:
            - Name: OTEL_RESOURCE_ATTRIBUTES
              Value: service.name=<your-service-name>
          ...
...
```

In case of JSON task definition, you can add the following lines.

```json
...
    "containerDefinitions": [
        {
            "name": "<your-container-name>",
            ...
            "environment": [
                {
                    "name": "OTEL_RESOURCE_ATTRIBUTES",
                    "value": "service.name=<your-service-name>"
                }
            ],
            ...
        }
    ],
...

```

### Step 4: Rebuild and Deploy Application Container

After following previous step, you need to rebuild the application container and deploy it to ECS cluster.

### Step 5: Verify Data in SigNoz

<div>
You will need to generate some traffic to your application. After which you can go to the
SigNoz {props.name} Services page and you should see your application in the services list.
</div>
<br/>