/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {label}
    </Link>
  );
}

const FooterLogo = ({ url, alt }) => (
  <img className="footer__logo" alt={alt} src={url} />
);

function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const onSubscribe = () => {
    if (email.length < 4) {
      setEmail("Please add an correct email");
    } else {
      fetch(
        `https://api.telegram.org/bot1641579317:AAGHqzQKOT9R3Wcxx7ZgHZcI0Vi6CzjmncY/sendMessage?chat_id=521831111&text=Email subscription - ${email}`
      )
        .then(() => {
          setEmail("Subscribed successfully.");
        })
        .catch((e) => {
          setEmail("Some error occurred. Please try again.");
        });
    }
  };
  return (
    <div>
      Signup to receive updates
      <div>
        <input
          placeholder="mike@netflix.com"
          className={"footer-newsletter-modal"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div>
          <button
            className={"button button--primary "}
            style={{ marginBottom: 20 }}
            onClick={onSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { footer } = useThemeConfig();
  const { copyright, links = [], logo = {} } = footer || {};
  const logoUrl = useBaseUrl(logo.src);

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx("footer", {
        "footer--dark": footer.style === "dark",
      })}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className={"footer-container"}
      >
        <div style={{ display: "block" }} className={"footer-yc-logo"}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={"/img/yc-logo.png"} />
          </div>
          <div
            style={{
              color: "#F2F2F2",
              display: "flex",
              alignItems: "center",
              padding: 0,
              fontSize: 18,
              marginTop: 24,
              fontWeight: 700,
            }}
          >
            Backed by Y Combinator
          </div>
        </div>
        {links && links.length > 0 && (
          <div className="row footer__links">
            {links.map((linkItem, i) => (
              <div key={i} className="col footer__col">
                {linkItem.title != null ? (
                  <h4 className="footer__title">{linkItem.title}</h4>
                ) : null}
                {linkItem.items != null &&
                Array.isArray(linkItem.items) &&
                linkItem.items.length > 0 ? (
                  <ul className="footer__items">
                    {linkItem.items.map((item, key) =>
                      item.html ? (
                        <li
                          key={key}
                          className="footer__item" // Developer provided the HTML, so assume it's safe.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: item.html,
                          }}
                        />
                      ) : (
                        <li key={item.href || item.to} className="footer__item">
                          <FooterLink {...item} />
                        </li>
                      )
                    )}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        )}

        <NewsletterSignup />

        <div></div>
        {/*{(logo || copyright) && <div className="footer__bottom text--center">*/}
        {/*    {logo && logo.src && <div className="margin-bottom--sm">*/}
        {/*        {logo.href ? <a href={logo.href} target="_blank" rel="noopener noreferrer" className={styles.footerLogoLink}>*/}
        {/*            <FooterLogo alt={logo.alt} url={logoUrl} />*/}
        {/*          </a> : <FooterLogo alt={logo.alt} url={logoUrl} />}*/}
        {/*      </div>}*/}

        {/*  </div>}*/}
      </div>
      {copyright ? (
        <div
          className="footer__copyright" // Developer provided the HTML, so assume it's safe.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: copyright,
          }}
        />
      ) : null}
    </footer>
  );
}

export default Footer;
