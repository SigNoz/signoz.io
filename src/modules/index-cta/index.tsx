import React from "react";
import ReactGA from "react-ga";
import Heading from "../../components/ui/Heading";
import SubHeading from "../../components/ui/SubHeading";
import Button from "../../components/ui/Button";

ReactGA.initialize("UA-152867655-1");

const CTA = () => {

  const requestDemoClicked = () => {
    ReactGA.event({
      category: "User",
      action: "Request Demo Clicked",
    });
  };

  return (
    <section className="bluish-gradient py-16">
      <div className="container">
        <div className="mx-auto max-w-xl">
          <div className="">
            <Heading type={2}>
              OpenTelemetry-Native Metrics, Logs,
              <br className="hidden lg:inline" />
              and Traces in a single pane of glass
            </Heading>
            <SubHeading>
              Check out our hosted and enterprise solutions.
            </SubHeading>
          </div>
          <div className="flex gap-5 flex-col sm:flex-row">
            <Button
              isButton
              className=""
              to={"/teams/"}
              id="btn-get-started-homepage-bottom"
            >
              Try SigNoz Cloud
            </Button>
            <Button
              isButton
              outlined
              className=""
              to={"/docs/install/"}
              onClick={requestDemoClicked}
              id="btn-self-hosted-homepage-bottom"
            >
              Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
