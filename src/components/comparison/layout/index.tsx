import React from "react";
import styles from "./styles.module.css";

const ComparisonLayout = (props) => {
  const { children } = props;
  return <section className={styles.comparisonContainer}>{children}</section>;
};

export default ComparisonLayout;
