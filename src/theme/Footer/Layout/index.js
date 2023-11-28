import React from "react";
import clsx from "clsx";
import SignUpForm from "../../../modules/signup-form";
import styles from "./styles.module.css";

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer
      className={clsx("bg-[#242526] footer px-3", {
        "footer--dark": style === "dark",
      })}
    >
      <div className="container px-2 sm:px-10 md:p-5">
        <div className="flex flex-col-reverse gap-10 lg:gap-0 lg:grid grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex flex-col md:flex-row-reverse justify-between md:items-center gap-7 w-full">
              <div className="block lg:hidden w-auto md:w-2/3">
                <SignUpForm />
              </div>
              <div className="flex flex-col gap-5 w-full">
                <img
                  src="/img/landing/logo.webp"
                  className="w-28 object-contain"
                />
                <SignUpForm className={"hidden lg:block"} />
                <p className="text-gray-400 text-sm leading-loose m-0">
                  {copyright}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">{links}</div>
        </div>
      </div>
    </footer>
  );
}
