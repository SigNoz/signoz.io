import React, { useState } from "react";
import styles from "./styles.module.css";

const COMPANIES = [
  { image: "/img/users/wonder_logo.png", imageDesc: "wonder logo" },
  { image: "/img/users/epifi.jpeg", imageDesc: "epifi logo" },
  { image: "/img/users/outplay_logo.png", imageDesc: "outplay logo" },
  { image: "/img/users/instasafe_logo.png", imageDesc: "instasafe logo" },
  { image: "/img/users/wombo_logo.png", imageDesc: "wombo logo" },
];

export const ShowCompanyLogos = () => {
  return (
    <section className={styles.used_by}>
      <div className="container">
        <p className={styles.tagline}>Trusted By Teams</p>
        <ul>
          {COMPANIES.map((company, idx) => (
            <li key={`${idx}-${company.image}`}>
              <img src={company.image} alt={company.imageDesc} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
