import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const TopReasons = (props) => {
  if (props?.points) {
    return (
      <section className={`container`}>
        <div className={`${styles.reasonsPoints}`}>
          <h3 className={`${styles.reasonsPointTitle} highlight`}>
            In-depth: SigNoz vs Grafana
          </h3>
          <h4 className={styles.reasonMainPointTitle}>
            Why do devs choose SigNoz over Grafana?
          </h4>
          <p className={styles.reasonMainPointDesc}>
            SigNoz is loved by developers. With over 14k+ Github stars, 100+
            contributors, and 20k+ community members, it’s one of the top open
            source projects in the observability domain. Many of our users have
            switched from Grafana. <br />
            Here are a few reasons why.
          </p>
          {props.reasons.map(({ reason, reasonDesc }, idx) => {
            return (
              <React.Fragment key={idx + new Date().getSeconds()}>
                <h4 className={styles.reasonTitle}>
                  {idx + 1}. {reason}
                </h4>
                <div className={styles.reasonDesc}>{reasonDesc}</div>
              </React.Fragment>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <>
      <div className={styles.svsdReasonContainer}>
        {props.title && (
          <h3 className={styles.reasonHeaderTitle}>{props.title}</h3>
        )}
        <div className="container">
          {props.withElonMuskReason && <OpenSourceReason />}
          {(props.reasons || []).map(({ TITLE, DESC, FIGURE }, index) => {
            return (
              <div
                className={`row ${styles.reasonRow} ${
                  !(index % 2) ? styles.shouldImageFirst : ""
                }`}
              >
                {index % 2 ? (
                  <div
                    className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}
                  >
                    <div className={styles.reasonImageContainer}>
                      <img src={FIGURE} alt="reason" />
                    </div>
                  </div>
                ) : null}
                <div className={`col col--6 margin-vert--md`}>
                  <div className={styles.reasonDetailContainer}>
                    <h4 className={styles.reasonTitle}>{TITLE}</h4>
                    <p className={styles.reasonDesc}>{DESC}</p>
                  </div>
                </div>
                {!(index % 2) ? (
                  <div
                    className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}
                  >
                    <div className={styles.reasonImageContainer}>
                      <img src={FIGURE} alt="reason" />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const OpenSourceReason = () => {
  return (
    <div className={`row ${styles.reasonRow} ${styles.reasonElonMusk}`}>
      <div className={`col col--6 margin-vert--md ${styles.reasonImageCol}`}>
        <div className={styles.reasonImageContainer}>
          <img src="/img/reasons/elon-musk.webp" alt="reason" />
          <div className={styles.reasonReviewContainer}>
            <p className={styles.reasonReview}>
              “In order to really build trust, you have to have transparency. If
              you want to trust something, you want to know how it works.”
              -&nbsp;<strong>Elon Musk</strong>
            </p>
          </div>
        </div>
      </div>
      <div className={`col col--6 margin-vert--md`}>
        <div className={styles.reasonDetailContainer}>
          <h4 className={styles.reasonTitle}>SigNoz is open source</h4>
          <p className={styles.reasonDesc}>
            We believe the decision of choosing one product over the other
            ultimately comes down to trust - whether you trust the product to
            fulfill all your use-cases, whether you trust it to be good value
            for your money. Trust starts with transparency. SigNoz is open
            source, so you can take a look at our code, test it out, and then
            make an informed decision.
          </p>
          <Link
            href="https://github.com/SigNoz/signoz"
            className="button button--primary"
          >
            Check out our GitHub repo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopReasons;
