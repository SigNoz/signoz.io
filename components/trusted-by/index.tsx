import React from "react";
import styles from "./styles.module.css";
import Heading from "../../components/ui/Heading";

const COMPANIES = [
  { image: "/img/users/netapp.webp", imageDesc: "netapp logo" },
  { image: "/img/users/samsung.webp", imageDesc: "samsung logo" },
  { image: "/img/users/comcast.webp", imageDesc: "comcast logo" },
  { image: "/img/users/appier.webp", imageDesc: "appier logo" },
  { image: "/img/users/wombo.webp", imageDesc: "wombo logo" },
  { image: "/img/users/outplay.webp", imageDesc: "outplay logo" },
  { image: "/img/users/licious_f2.webp", imageDesc: "licious logo" },
  { image: "/img/users/wonder.webp", imageDesc: "wonder logo" },
];

export const TrustedByTeams = () => {
  return (
    <section className={styles.used_by}>
      <div className="container">
        <div className="flex flex-col items-center mb-5 text-center">
          <Heading type={1}>Trusted by teams at</Heading>
        </div>
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
