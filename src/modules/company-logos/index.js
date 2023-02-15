import React, { useState } from "react"
import styles from "./styles.module.css"
import useBaseUrl from '@docusaurus/useBaseUrl';


export const ShowCompanyLogos = () => {

return(


          <section className={styles.used_by}>
            <div
              className="container"
              style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            >
              {/* <p class="tagline" >Used by teams at</p> */}
              <p className={styles.tagline}> Used by teams at </p>
              <ul>
                <li>
                  <img src="/img/users/wonder_logo.png"  alt="wonder logo" />
                </li>
                <li>
                  <img src="/img/users/epifi.jpeg" alt="epifi logo" />
                </li>
                <li>
                  <img src="/img/users/outplay_logo.png" alt="outplay logo" />
                </li>
                <li>
                  <img src="/img/users/instasafe_logo.png" alt="instasafe logo" />
                </li>
                <li>
                  <img
                    src="/img/users/wombo_logo.png"
                    alt="wombo logo"
                  />
                </li>
              </ul>
            </div>
          </section>

)
}