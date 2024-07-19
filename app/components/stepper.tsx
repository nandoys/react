'use client'

import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import { createCustomerApi } from '../api/endpoints';


const Stepper = ({steps, formData}) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = async () => {
    console.log(formData)
    message.success('Inscription terminée!')
    try {
      const response = await fetch(createCustomerApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));


  return (
    <>
      <Steps current={current} items={items} size="small" />
      <div>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Précédent
          </Button>
        )}

        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Suivant
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button type="primary" onClick={done}> 
            Terminer
          </Button>
        )}
      </div>
    </>
  );
};
export {Stepper};