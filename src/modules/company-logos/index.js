import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export const ShowCompanyLogos = () => {
  return (
    <section className={styles.used_by}>
      <div className="container">
        <p className={styles.tagline}>Trusted By Teams</p>
        <ul>
          <li>
            <img src="/img/users/wonder_logo.png" alt="wonder logo" />
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
            <img src="/img/users/wombo_logo.png" alt="wombo logo" />
          </li>
        </ul>
      </div>
    </section>
  );
};
