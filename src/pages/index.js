import React, { Fragment, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";
import ReactGA from "react-ga";

import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import FAQBody from "@site/src/components/FAQ";

import Heading from "../components/ui/Heading";
import Hero from "../components/ui/Hero";
import SubHeading from "../components/ui/SubHeading";
import Button from "../components/ui/Button";

import { Header } from "../modules/index-header";
import { TrustedByTeams } from "../modules/trusted-by";
import { WhyOpenTelemetry } from "../modules/why-opentelemetry";
import { SigNozFeatures } from "../modules/index-features";
import { Testimonials } from "../modules/testimonials";

import BuildForDevelopers from "../modules/build-for-developers";
import DataProtectionLaws from "../modules/data-protection-laws";
import Observability from "../modules/observability";
import PricingStructure from "../modules/pricing-structure";
import SigNozStats from "../modules/signoz-stats";
import LatestInOpenTelementry from "../modules/latest-in-open-telementry";
import Tutorials from "../modules/tutorials";
import CTA from "../modules/index-cta";

import styles from "./styles.module.css";

ReactGA.initialize("G-6NFJ2Y6NQN");

function Home() {
  const [showVideo, setShowVideo] = useState(false);

  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  useEffect(() => {
    ReactModal.setAppElement("#modal-root");
  }, []);

  return (
    <Fragment>
      <Layout
        title={`Open-Source Observability`}
        description="SigNoz is an open-source observability tool to help you find issues in your deployed applications & solve them quickly.
      It provides logs, metrics, and traces under a single pane of glass. Built with ClickHouse as datastore, it is designed to handle enterprise scale."
      >
        <main className="landing-section">
          <Header />
          <TrustedByTeams />
          <SigNozFeatures />
          <WhyOpenTelemetry />
          <BuildForDevelopers />
          <DataProtectionLaws />
          <Observability />
          <PricingStructure />
          <SigNozStats />
          <Testimonials />
          <LatestInOpenTelementry />
          {/* <Tutorials /> */}
          <CTA />
        </main>
      </Layout>
      <div id={"modal-root"}></div>
    </Fragment>
  );
}

export default Home;
