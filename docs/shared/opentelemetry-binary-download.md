<p>To download <code>{props.name}</code> file of release version <code>{props.version}</code>:</p>

<pre>
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v{props.version}/otelcol-contrib_{props.version}_linux_amd64.{props.name}
</pre>

:::info
<p>In case of different OpenTelemetry version, replace <code>{props.version}</code> with respective version.</p>
:::