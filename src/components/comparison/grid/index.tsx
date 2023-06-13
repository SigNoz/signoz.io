import React from "react";
import styles from "./styles.module.css";

const ComparisonGrid = (props) => {
  const { comparisonData } = props;
  const { DATA, TITLE } = comparisonData;

  return (
    <div>
      <h3 className={styles.reasonHeaderTitle}>{TITLE}</h3>
      <ComparisonGridDesktop data={DATA} />
      <ComparisonGridMobile data={DATA} />
    </div>
  );
};

const ComparisonGridDesktop = (props) => {
  const { data } = props;
  return (
    <div className="container">
      <div className={styles.tableGrid}>
        {/* header */}
        <div className={styles.tableHeader}></div>
        <div className={styles.tableHeader}>SigNoz</div>
        <div className={styles.tableHeader}>New Relic</div>
        {/* data */}
        {data.map((row) => {
          return (
            <>
              <div className={styles.tableMetric}>{row.sideHeader}</div>
              <div className={styles.tableMetricAvailability}>
                {row.isAvailableInSignoz ? "✅" : "❌"}
                {row.signozExtraDetail && (
                  <small className={styles.tableMetricDesc}>
                    {row.signozExtraDetail}
                  </small>
                )}
              </div>
              <div className={styles.tableMetricAvailability}>
                {row.isAvailableInDatadog ? "✅" : "❌"}
                {row.datadogExtraDetail && (
                  <small className={styles.tableMetricDesc}>
                    {row.datadogExtraDetail}
                  </small>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

const ComparisonGridMobile = (props) => {
  const { data } = props;
  return (
    <div className="container">
      <div className={styles.tableGridMobile}>
        {data.map((cell) => {
          return (
            <div className={styles.tableGridCell}>
              <h4 className={styles.tableGridCellHeader}>{cell.sideHeader}</h4>
              <div>
                <div className={styles.tableGridCompareCell}>
                  <span className={styles.tableGridProdCell}>
                    Signoz
                    {cell.signozExtraDetail && (
                      <small className={styles.tableMetricDesc}>
                        {cell.signozExtraDetail}
                      </small>
                    )}
                  </span>
                  <span> {cell.isAvailableInSignoz ? "✅" : "❌"}</span>
                </div>
                <div className={styles.tableGridCompareCell}>
                  <span className={styles.tableGridProdCell}>
                    New Relic
                    {cell.datadogExtraDetail && (
                      <small className={styles.tableMetricDesc}>
                        {cell.datadogExtraDetail}
                      </small>
                    )}
                  </span>
                  <span> {cell.isAvailableInDatadog ? "✅" : "❌"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparisonGrid;
