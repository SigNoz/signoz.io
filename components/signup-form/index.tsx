////////////////
//
// Using Framer?
// See https://www.framer.com/learn/code-components/ for more info
//
////////////////

import React, { useState } from "react";
import styles from "./styles.module.css";

const DOMAIN = "app.loops.so";

const INIT = "INIT";
const SUBMITTING = "SUBMITTING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;

const formStyles = {
  id: "cl8osdvv7459609la3ahy4uzo",
  placeholderText: "you@example.com",
  buttonText: "Subscribe",
  successMessage: "Thanks! We'll be in touch!",
  userGroup: "",
};

export default function SignUpFormReact({ className }) {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<(typeof formStates)[number]>(INIT);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setEmail("");
    setFormState(INIT);
    setErrorMessage("");
  };

  /**
   * Rate limit the number of submissions allowed
   * @returns {boolean} true if the form has been successfully submitted in the past minute
   */
  const hasRecentSubmission = () => {
    const time = new Date();
    const timestamp = time.valueOf();
    const previousTimestamp = localStorage.getItem("loops-form-timestamp");

    // Indicate if the last sign up was less than a minute ago
    if (
      previousTimestamp &&
      Number(previousTimestamp) + 60 * 1000 > timestamp
    ) {
      setFormState(ERROR);
      setErrorMessage("Too many signups, please try again in a little while");
      return true;
    }

    localStorage.setItem("loops-form-timestamp", timestamp.toString());
    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission
    event.preventDefault();

    // boundary conditions for submission
    if (formState !== INIT) return;
    if (!isValidEmail(email)) {
      setFormState(ERROR);
      setErrorMessage("Please enter a valid email");
      return;
    }
    if (hasRecentSubmission()) return;
    setFormState(SUBMITTING);

    // build body
    const formBody = `userGroup=${encodeURIComponent(
      formStyles.userGroup
    )}&email=${encodeURIComponent(email)}`;

    // API request to add user to newsletter
    fetch(`https://${DOMAIN}/api/newsletter-form/${formStyles.id}`, {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res: any) => [res.ok, res.json(), res])
      .then(([ok, dataPromise, res]) => {
        if (ok) {
          resetForm();
          setFormState(SUCCESS);
        } else {
          dataPromise.then((data: any) => {
            setFormState(ERROR);
            setErrorMessage(data.message || res.statusText);
            localStorage.setItem("loops-form-timestamp", "");
          });
        }
      })
      .catch((error) => {
        setFormState(ERROR);
        // check for cloudflare error
        if (error.message === "Failed to fetch") {
          setErrorMessage(
            "Too many signups, please try again in a little while"
          );
        } else if (error.message) {
          setErrorMessage(error.message);
        }
        localStorage.setItem("loops-form-timestamp", "");
      });
  };

  switch (formState) {
    case SUCCESS:
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <p className={styles.successMessage}>{formStyles.successMessage}</p>
        </div>
      );
    case ERROR:
      return (
        <>
          <div className="flex justify-between items-center">
            <SignUpFormError />
            <BackButton />
          </div>
        </>
      );
    default:
      return (
        <>
          <form
            onSubmit={handleSubmit}
            className={`h-10 flex flex-nowrap rounded-sm overflow-hidden gap-0 w-full sm:w-1/2 md:w-full ${className}`}
          >
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              placeholder="Type your email to sign up"
              className="h-10 placeholder:text-gray-400 text-gray-900 text-sm px-2 pr-1 font-normal leading-loose bg-white rounded-none border-none subscribe-input w-8/12"
            />
            <SignUpFormButton />
          </form>
        </>
      );
  }

  function SignUpFormError() {
    return (
      <p className={"text-red-400 text-sm m-0"}>
        {errorMessage || "Oops! Something went wrong, please try again"}
      </p>
    );
  }

  function BackButton() {
    return (
      <button
        className={
          "text-gray-400 text-sm bg-transparent outline-none border-none cursor-pointer"
        }
        onClick={resetForm}
      >
        &larr; Back
      </button>
    );
  }

  function SignUpFormButton({ props }: any) {
    return (
      <button
        type="submit"
        className="h-10 border-none outline-none text-sm rounded-none bg-primary-500 hover:bg-primary-600 cursor-pointer w-4/12"
      >
        {formState === SUBMITTING ? "Please wait..." : formStyles.buttonText}
      </button>
    );
  }
}

function isValidEmail(email: any) {
  return /.+@.+/.test(email);
}
