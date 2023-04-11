### Frequently Asked Questions

1. How to find what to use in `IP of SigNoz` if I have installed SigNoz in Kubernetes cluster?

    Based on where you have installed your application and where you have installed SigNoz, you need to find the right value for this. Please use [this grid](/docs/instrumentation/troubleshoot-instrumentation/) to find the value you should use for `IP of SigNoz`

2. I am sending data from my application to SigNoz, but I don't see any events or graphs in the SigNoz dashboard. What should I do?

    This could be because of one of the following reasons:

    1. *Your application is generating telemetry data, but not able to connect with SigNoz installation*

        Please use this [troubleshooting guide](/docs/install/troubleshooting/) to find if your application is able to access SigNoz installation and send data to it.

    2. *Your application is not actually generating telemetry data*

        Please check if the application is generating telemetry data first. You can use `Console Exporter` to just print your telemetry data in console first. Join our [Slack Community](https://signoz.io/slack/) if you need help on how to export your telemetry data in console

    3. *Your SigNoz installation is not running or behind a firewall*

        Please double check if the pods in SigNoz installation are running fine. `docker ps` or `kubectl get pods -n platform` are your friends for this. 

    