import React from 'react'
import styles from './styles.module.css'

const ComparisonGrid = (props) => {
  const { comparisonData } = props
  const { DATA, TITLE, OTHER_HEADING } = comparisonData

  return (
    <div>
      <h3 className={styles.reasonHeaderTitle}>{TITLE}</h3>
      <ComparisonGridDesktop data={DATA} otherHeading={OTHER_HEADING} />
      <ComparisonGridMobile data={DATA} otherHeading={OTHER_HEADING} />
    </div>
  )
}

const ComparisonGridDesktop = (props) => {
  const { data, otherHeading } = props
  return (
    <div className="container">
      <div className={styles.tableGrid}>
        {/* header */}
        <div className={styles.tableHeader}></div>
        <div className={styles.tableHeader}>SigNoz</div>
        <div className={styles.tableHeader}>{otherHeading}</div>
        {/* data */}
        {data.map((row) => {
          return (
            <>
              <div className={styles.tableMetric}>{row.sideHeader}</div>
              <div className={styles.tableMetricAvailability}>
                {row.isAvailableInSignoz ? '✅' : '❌'}
                {row.signozExtraDetail && (
                  <small className={styles.tableMetricDesc}>{row.signozExtraDetail}</small>
                )}
              </div>
              <div className={styles.tableMetricAvailability}>
                {row.isAvailableInOther ? '✅' : '❌'}
                {row.otherExtraDetail && (
                  <small className={styles.tableMetricDesc}>{row.otherExtraDetail}</small>
                )}
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

const ComparisonGridMobile = (props) => {
  const { data, otherHeading } = props
  return (
    <div className="container">
      <div className={styles.tableGridMobile}>
        {data.map((cell, index) => {
          return (
            <div className={styles.tableGridCell} key={index}>
              <h4 className={styles.tableGridCellHeader}>{cell.sideHeader}</h4>
              <div>
                <div className={styles.tableGridCompareCell}>
                  <span className={styles.tableGridProdCell}>
                    Signoz
                    {cell.signozExtraDetail && (
                      <small className={styles.tableMetricDesc}>{cell.signozExtraDetail}</small>
                    )}
                  </span>
                  <span> {cell.isAvailableInSignoz ? '✅' : '❌'}</span>
                </div>
                <div className={styles.tableGridCompareCell}>
                  <span className={styles.tableGridProdCell}>
                    {otherHeading}
                    {cell.otherExtraDetail && (
                      <small className={styles.tableMetricDesc}>{cell.otherExtraDetail}</small>
                    )}
                  </span>
                  <span> {cell.isAvailableInOther ? '✅' : '❌'}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ComparisonGrid
