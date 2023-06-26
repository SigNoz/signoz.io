import React, { useState } from "react";
import styles from "./styles.module.css";

const COMPANIES = [
  { image: "/img/users/zoom.png", imageDesc: "zoom logo" },
  { image: "/img/users/netapp.png", imageDesc: "netapp logo" },
  { image: "/img/users/zoho.png", imageDesc: "zoho logo" },
  { image: "/img/users/comcast.png", imageDesc: "comcast logo" },
  { image: "/img/users/wonder.png", imageDesc: "wonder logo" },
  { image: "/img/users/appier.png", imageDesc: "appier logo" },
  { image: "/img/users/wombo.png", imageDesc: "wombo logo" },
  { image: "/img/users/outplay.png", imageDesc: "outplay logo" },
];

export const ShowCompanyLogos = () => {
  return (
    <section className={styles.used_by}>
      <div className="container">
        <p className={styles.tagline}>Trusted by teams at</p>
        <ul className={`${styles.logoContainer} row`}>
          {COMPANIES.map((company, idx) => (
            <li key={`${idx}-${company.image}`} className="col col--3">
              <img src={company.image} alt={company.imageDesc} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
