import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useForm } from "react-hook-form";

const SelfHost = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    name: "",
    email: "",
    company: "",
  });

  const onSubmit = (data) => {
    // ! TODO : call api
  };

  return (
    <Layout title="Self Host">
      <section className="selfhost">
        <div
          className="container"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <div className="row">
            <div className="col col--6">
              <div className="card-demo margin--md">
                <div className="card no-color">
                  <div className="card__body">
                    <p className="title">
                      SigNoz <span className="highlight"> Enterprise</span>
                    </p>
                    <ul className="dashed">
                      <li>
                        Managed Self-Hosted SigNoz in your premise or cloud
                      </li>
                      <li>Single Sign-On</li>
                      <li>SAML and LDAP support</li>
                      <li>AWS Private Link</li>
                      <li>
                        Support for Dashboard configuration from expert
                        engineers
                      </li>
                      <li>Support plan with SLAs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <div className="card-demo margin--md">
                <div className="card">
                  <div className="card__body">
                    <p className="text-center form-title">
                      Get more info on SigNoz Enterprise
                    </p>
                    <input
                      type="text"
                      className="text-input"
                      name="email"
                      placeholder={"Email*"}
                      {...register("email", {
                        required: true,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      })}
                    />
                    {errors?.email?.type === "required" && (
                      <p className="error">This field is required</p>
                    )}
                    {errors?.email?.type === "pattern" && (
                      <p className="error">Enter valid email address</p>
                    )}
                    <input
                      type="text"
                      className="text-input"
                      name="name"
                      placeholder={"Name"}
                      {...register("name", {
                        required: true,
                        pattern: /^[A-Za-z ]+$/i,
                      })}
                    />
                    {errors?.name?.type === "required" && (
                      <p className="error">This field is required</p>
                    )}
                    {errors?.name?.type === "pattern" && (
                      <p className="error">Alphabetical characters only</p>
                    )}
                    <input
                      type="text"
                      className="text-input"
                      name="company"
                      placeholder={"Company"}
                      {...register("company", {
                        required: true,
                        pattern: /^[A-Za-z ]+$/i,
                      })}
                    />
                    {errors?.company?.type === "required" && (
                      <p className="error">This field is required</p>
                    )}
                    {errors?.company?.type === "pattern" && (
                      <p className="error">Alphabetical characters only</p>
                    )}
                    <button
                      className="submit-btn"
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SelfHost;
