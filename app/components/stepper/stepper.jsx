'use client'

import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';


const Stepper = ({steps, data}) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = () => {
    console.log(data)
    message.success('Inscription terminée!')
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