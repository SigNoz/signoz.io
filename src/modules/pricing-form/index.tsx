import React, { useState } from "react";
import styles from "./styles.module.css";
import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";

function PricingForm({ portalId, formId }) {
  const { loaded, error, formCreated } = useHubspotForm({
    portalId,
    formId,
    target: "#my-hubspot-form",
  });
  return (
    <>
      <div id="my-hubspot-form">
        {!formCreated && !error && <p className="text--center">Loading...</p>}
        {error && <p className="text--center">Some error occurred.</p>}
      </div>
      {loaded && error && <p>Some error occurred.</p>}
    </>
  );
}

export default PricingForm;
