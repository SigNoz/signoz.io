### Step 1: Sidecar Collector Container

<div>
    In this approach, we will deploy a sidecar collector container in the same task
    definition as your application container. The sidecar container will
    collect ECS container metrics and send them to SigNoz {props.name}.
    It also acts as a gateway to send any telemetry data from your
    application container to SigNoz {props.name}.
</div>
<br/>