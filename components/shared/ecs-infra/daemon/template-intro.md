### Step 1: Daemon Service Template

<div>
    Create a new service in ECS cluster using template below. This service
    will run a container that will send data to SigNoz `{props.name}`. Data
    such as ECS infrastructure metrics as well as logs from docker containers.
    It also acts as a gateway to send any incoming OTLP telemetry data to
    SigNoz `{props.name}`.
</div>
<br/>