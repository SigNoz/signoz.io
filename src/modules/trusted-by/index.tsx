import React from "react";
import styles from "./styles.module.css";
import Heading from "../../components/ui/Heading";

const COMPANIES = [
  { image: "/img/users/netapp.png", imageDesc: "netapp logo" },
  { image: "/img/users/samsung.png", imageDesc: "samsung logo" },
  { image: "/img/users/zoho.png", imageDesc: "zoho logo" },
  { image: "/img/users/comcast.png", imageDesc: "comcast logo" },
  { image: "/img/users/appier.png", imageDesc: "appier logo" },
  { image: "/img/users/wombo.png", imageDesc: "wombo logo" },
  { image: "/img/users/outplay.png", imageDesc: "outplay logo" },
  { image: "/img/users/licious_f2.png", imageDesc: "licious logo" },
  { image: "/img/users/wonder.png", imageDesc: "wonder logo" },
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
