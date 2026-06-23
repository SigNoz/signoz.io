export default function TraefikMetrics() {
  return (
    <>
      <h3>Traefik Metrics</h3>
      <ul>
        <li>traefik_config_last_reload_success</li>
        <li>traefik_config_reloads_total</li>
        <li>traefik_entrypoint_request_duration_seconds_bucket</li>
        <li>traefik_entrypoint_request_duration_seconds_count</li>
        <li>traefik_entrypoint_request_duration_seconds_sum</li>
        <li>traefik_entrypoint_requests_bytes_total</li>
        <li>traefik_entrypoint_requests_total</li>
        <li>traefik_entrypoint_responses_bytes_total</li>
        <li>traefik_open_connections</li>
        <li>traefik_service_request_duration_seconds_bucket</li>
        <li>traefik_service_request_duration_seconds_count</li>
        <li>traefik_service_request_duration_seconds_sum</li>
        <li>traefik_service_requests_bytes_total</li>
        <li>traefik_service_requests_total</li>
        <li>traefik_service_responses_bytes_total</li>
      </ul>
    </>
  )
}
