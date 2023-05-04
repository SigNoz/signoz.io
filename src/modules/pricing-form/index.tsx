import React from "react";
import styles from "./styles.module.css";
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form';

function PricingForm(){
  const { loaded, error, formCreated } = useHubspotForm({
    portalId: '22308423',
    formId: '30d999cc-d423-445a-a28a-6058ee6eae95',
    target: '#my-hubspot-form'
  });
  return (<div id="my-hubspot-form"></div>)
}

export default PricingForm;