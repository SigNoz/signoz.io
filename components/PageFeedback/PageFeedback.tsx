'use client';

import React, { useState } from 'react';
import styles from './PageFeedback.module.css';

interface AdditionalDetails {
  [key: string]: string;
}

const PageFeedback: React.FC = () => {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [reason, setReason] = useState<string>('');
  const [positiveFeedback, setPositiveFeedback] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleTextAreaChange = (option: string, value: string) => {
    setAdditionalDetails({
      ...additionalDetails,
      [option]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      helpful,
      reason: helpful === false ? reason : '',
      positiveFeedback: helpful === true ? positiveFeedback : '',
      additionalDetails,
      page: window.location.href,
    };

    console.log('Submitting data:', data);

    setSubmitted(true);
  };

  if (submitted) {
    return <div className={styles.feedbackContainer}>Thank you for your feedback!</div>;
  }

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.separatorLine}></div>
      {helpful === null && (
        <>
          <h3 className={styles.title}>Was this page helpful?</h3>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => setHelpful(true)}>👍 Yes</button>
            <button className={styles.button} onClick={() => setHelpful(false)}>👎 No</button>
          </div>
        </>
      )}
      
      {helpful === false && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.title}>What went wrong?</h3>
          <div className={styles.optionGroup}>
            {[
              { value: 'Inaccurate', description: "Doesn't accurately describe the product or feature." },
              { value: "Couldn't find what I was looking for", description: "Missing important information." },
              { value: 'Hard to understand', description: "Too complicated or unclear." },
              { value: 'Code sample errors', description: "One or more code samples are incorrect." },
              { value: 'Another reason', description: "" },
            ].map((option) => (
              <label className={styles.option} key={option.value}>
                <input
                  type="radio"
                  name="reason"
                  value={option.value}
                  onChange={(e) => setReason(e.target.value)}
                />
                <span className={styles.optionText}>
                  {option.value}
                  {option.description && <span className={styles.optionDescription}>{option.description}</span>}
                </span>
                {reason === option.value && (
                  <textarea
                    className={styles.textArea}
                    placeholder="Optional: Provide more details..."
                    value={additionalDetails[option.value] || ''}
                    onChange={(e) => handleTextAreaChange(option.value, e.target.value)}
                  />
                )}
              </label>
            ))}
          </div>
          <button className={styles.submitButton} type="submit">Submit</button>
        </form>
      )}

      {helpful === true && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.title}>What did you like?</h3>
          <div className={styles.optionGroup}>
            {[
              { value: 'Accurate', description: "Accurately describes the product or feature." },
              { value: 'Solved my problem', description: "Helped me resolve an issue." },
              { value: 'Easy to understand', description: "Easy to follow and comprehend." },
              { value: 'Helped me decide to use the product', description: "Convinced me to adopt the product or feature." },
              { value: 'Another reason', description: "" },
            ].map((option) => (
              <label className={styles.option} key={option.value}>
                <input
                  type="radio"
                  name="positiveFeedback"
                  value={option.value}
                  onChange={(e) => setPositiveFeedback(e.target.value)}
                />
                <span className={styles.optionText}>
                  {option.value}
                  {option.description && <span className={styles.optionDescription}>{option.description}</span>}
                </span>
                {positiveFeedback === option.value && (
                  <textarea
                    className={styles.textArea}
                    placeholder="Optional: Provide more details..."
                    value={additionalDetails[option.value] || ''}
                    onChange={(e) => handleTextAreaChange(option.value, e.target.value)}
                  />
                )}
              </label>
            ))}
          </div>
          <button className={styles.submitButton} type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PageFeedback;
