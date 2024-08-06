'use client'

import React, { useState } from 'react';
import { Button, FormInstance, message, Steps, theme } from 'antd';
import { createCustomerApi, createSupplierApi } from '../api/endpoints';


const Stepper = ({steps, formController, formFields, role}: {steps:Array<any>, formController:FormInstance, formFields:any, role:string }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  
  const next = () => {

    formController.validateFields().then(()=> {
      setCurrent(current + 1);
    }).catch((info) => console.log(info))
    
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = async () => {
    const formData = new FormData();
    for (const key in formFields) {
      formData.append(key, formFields[key]);
    }

    message.success('Inscription terminée!')
  
    try {
      const username = process.env.USERNAME_AUTH_KEY;
      const password = process.env.PWD_AUTH_KEY;
  
      // Encoder les informations d'authentification en Base64
      const encodedCredentials = btoa(`${username}:${password}`);

      const response = await fetch(role =='customer' ? createCustomerApi : createSupplierApi, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
        }
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