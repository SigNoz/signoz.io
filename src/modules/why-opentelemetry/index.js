import React from "react"
import styles from "./styles.module.css"

export const WhyOpenTelemetry = () => {

    return(

        <section>
        <div
          className="container"
          style={{ marginTop: "6rem", marginBottom: "3rem" }}
        >
        <h1 class="text--center margin-vert--sm">
                Why use <span className={styles.highlight}>OpenTelemetry</span>?
        </h1>
        <p className="hero__subtitle text--center margin-bottom--xl">
        Say bye to proprietary vendor agents, say hello to open source
        </p>

        <div class="row">
                <div  style={{textAlign:"center"}} class="col col--4">
                        <img  className={styles.iconImage}  src="/img/website/vendorlockin-otel.svg" alt="opentelemetry" />

                        <h4>
                        No vendor lock-in with OpenTelemetry
                        </h4>

                </div>

                <div  style={{textAlign:"center"}} class="col col--4">
                        <img  className={styles.iconImage} src="/img/website/standardise-otel.svg" alt="opentelemetry" />

                        <h4>
                        Standardize Observability with one open source standard
                        </h4>

                </div>

                <div  style={{textAlign:"center"}} class="col col--4">
                        <img  className={styles.iconImage} src="/img/website/high-quality-otel.svg" alt="opentelemetry" />

                        <h4>
                        High Quality Telemetry with intelligent correlation
                        </h4>

                </div>
        </div>
        </div>

      </section>
    )
}