import React from "react";
import styles from "./styles.module.css";
import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";

const MigrateSaving = (props) => {
  const {
    data: { TITLE, DESC, PORTAL_ID, FORM_ID },
  } = props;

  const { loaded, error, formCreated } = useHubspotForm({
    portalId: PORTAL_ID,
    formId: FORM_ID,
    target: "#my-hubspot-form",
  });

  return (
    <>
      <div className={styles.svsdHeaderContainer}>
        <h2 className={styles.headerTitle}>{TITLE}</h2>
        <p className={styles.headerDesc}>{DESC}</p>
        <div className="container">
          <div className="row">
            <div className={"col col--3 margin-vert--md"}></div>
            <div className={"col col--6 margin-vert--md"}>
              <div className={`card ${styles.hubForm}`}>
                <div className="card__body">
                  <div id="my-hubspot-form">
                    {!formCreated && !error && (
                      <p className="text--center">Loading...</p>
                    )}
                    {error && (
                      <p className="text--center">Some error occurred.</p>
                    )}
                  </div>
                  {loaded && error && <p>Some error occurred.</p>}
                </div>
              </div>
            </div>
            <div className={"col col--3 margin-vert--md"}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MigrateSaving;
