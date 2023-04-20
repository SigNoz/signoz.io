import React from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

function PricingForm() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const atLeastOne = () =>
    getValues("useCase").length
      ? true
      : "Select at least one use case for SigNoz.";

  const onSubmit = (data) => {
    console.log("Data", data);
    // ! TODO : call api
  };

  return (
    <div>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.formLabel}>
          Work Email
        </label>
        <input
          type="text"
          className={styles.textInput}
          id="email"
          name="email"
          placeholder={"Enter Work Email"}
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
        />
        {errors?.email?.type === "required" && (
          <p className={styles.error}>Please complete this required field.</p>
        )}
        {errors?.email?.type === "pattern" && (
          <p className={styles.error}>Enter valid email address</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="scale" className={styles.formLabel}>
          What is the current scale in terms of request per second?
        </label>
        <input
          type="text"
          className={styles.textInput}
          name="scale"
          id="scale"
          placeholder={"Request per Second"}
          {...register("scale", {
            required: true,
          })}
        />
        {errors?.scale?.type === "required" && (
          <p className={styles.error}>Please complete this required field.</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.formLabel}>
          Key use cases you’re trying to solve with SigNoz
        </label>
        <span className={styles.formCheckWrapper}>
          <input
            type="checkbox"
            className={styles.checkInput}
            id="application-monitoring"
            {...register("useCase", {
              validate: atLeastOne,
            })}
            value="application-monitoring"
          />
          <label htmlFor="application-monitoring">Application Monitoring</label>
        </span>
        <span className={styles.formCheckWrapper}>
          <input
            type="checkbox"
            className={styles.checkInput}
            value="distributed-tracing"
            defaultChecked={false}
            id="distributed-tracing"
            {...register("useCase", {
              validate: atLeastOne,
            })}
          />
          <label htmlFor="distributed-tracing">Distributed Tracing</label>
        </span>
        <span className={styles.formCheckWrapper}>
          <input
            type="checkbox"
            className={styles.checkInput}
            value="logs-management"
            id="logs-management"
            {...register("useCase", {
              validate: atLeastOne,
            })}
          />
          <label htmlFor="logs-management">Logs Management</label>
        </span>
        <span className={styles.formCheckWrapper}>
          <input
            type="checkbox"
            className={styles.checkInput}
            value="infrastructure-monitoring"
            id="infrastructure-monitoring"
            {...register("useCase", {
              validate: atLeastOne,
            })}
          />
          <label htmlFor="infrastructure-monitoring">
            Infrastructure Monitoring
          </label>
        </span>
        <span className={styles.formCheckWrapper}>
          <input
            type="checkbox"
            className={styles.checkInput}
            value="other-case"
            id="other-case"
            {...register("useCase", {
              validate: atLeastOne,
            })}
          />
          <label htmlFor="other">
            Other:{" "}
            <input
              type="text"
              className={styles.textInputLine}
              id="other"
              {...register("otherUseCase", {
                required: (getValues("useCase") || []).includes("other-case"),
              })}
            />
          </label>
        </span>
        {console.log("###errors", errors)}
        {errors?.useCase && (
          <p className={styles.error}>Please complete this required field.</p>
        )}
        {errors?.otherUseCase?.type === "required" && (
          <p className={styles.error}>Other field is required</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="services" className={styles.formLabel}>
          How many services do you run in production?
        </label>
        <input
          type="text"
          className={styles.textInput}
          name="services"
          id="services"
          placeholder={"Number of Services"}
          {...register("services", {
            required: true,
          })}
        />
        {errors?.services?.type === "required" && (
          <p className={styles.error}>Please complete this required field.</p>
        )}
      </div>

      <button
        className={`button button--primary ${styles.submitBtn}`}
        type="button"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </div>
  );
}

export default PricingForm;
