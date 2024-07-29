'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const FeedbackContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  color: #e0e0e0;
`;

const Title = styled.h3`
  margin-top: 0;
  color: #ffffff;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #3a3a3a;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4a4a4a;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Option = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
`;

const OptionText = styled.span`
  display: flex;
  flex-direction: column;
`;

const OptionDescription = styled.span`
  font-size: 0.9em;
  color: #aaa;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  align-self: flex-start;
  background-color: #4CAF50;
  color: white;
  border: none;

  &:hover {
    background-color: #45a049;
  }
`;

const PageFeedback = () => {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [reason, setReason] = useState<string>('');
  const [email, setEmail] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const data = {
      helpful,
      reason: helpful === false ? reason : '',
      email: helpful === false && email,
    };

    console.log('Submitting data:', data);

    // TODO: Replace with actual API call to your backend
    // await fetch('your-api-endpoint', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    setSubmitted(true);
  };

  if (submitted) {
    return <FeedbackContainer>Thank you for your feedback!</FeedbackContainer>;
  }

  return (
    <FeedbackContainer>
      <Title>Was this page helpful?</Title>
      <ButtonGroup>
        <Button onClick={() => setHelpful(true)}>👍 Yes</Button>
        <Button onClick={() => setHelpful(false)}>👎 No</Button>
      </ButtonGroup>
      
      {helpful === false && (
        <Form onSubmit={handleSubmit}>
          <Title>What went wrong?</Title>
          <OptionGroup>
            {[
              { value: 'Inaccurate', description: "Doesn't accurately describe the product or feature." },
              { value: "Couldn't find what I was looking for", description: "Missing important information." },
              { value: 'Hard to understand', description: "Too complicated or unclear." },
              { value: 'Code sample errors', description: "One or more code samples are incorrect." },
              { value: 'Another reason', description: "" },
            ].map((option) => (
              <Option key={option.value}>
                <input
                  type="radio"
                  name="reason"
                  value={option.value}
                  onChange={(e) => setReason(e.target.value)}
                />
                <OptionText>
                  {option.value}
                  {option.description && <OptionDescription>{option.description}</OptionDescription>}
                </OptionText>
              </Option>
            ))}
          </OptionGroup>
          <Checkbox>
            <input
              type="checkbox"
              checked={email}
              onChange={(e) => setEmail(e.target.checked)}
            />
            Yes, it's okay to follow up by email
          </Checkbox>
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      )}
    </FeedbackContainer>
  );
};

export default PageFeedback;