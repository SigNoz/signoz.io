import React from "react";
import styles from "./styles.module.css";

const Migration = (props) => {
  const { title, desc } = props;
  return (
    <div className={styles.svsdMigrationContainer}>
      <div className="container">
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{desc}</p>
      </div>
    </div>
  );
};

export default Migration;
