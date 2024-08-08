'use client'

import React, { useState } from 'react';
import { Button, Form, FormInstance, message, Steps, theme } from 'antd';
import { createCustomerApi, createSupplierApi } from '../api/endpoints';


const Stepper = ({steps, formController, role}: {steps:Array<any>, formController:FormInstance, role:string }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  
  const next = () => {

    formController.validateFields().then((values)=> {
      setFormData({ ...formData, ...values });
      setCurrent(current + 1);
    }).catch((info) => console.log(info))
    
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = async () => {

    formController
    .validateFields()
    .then(async (values) => {
      setLoading(true)

      const finalData = { ...formData, ...values, 'username': values["email"] };

      // Create a FormData object to handle file uploads
      const formDataToSend = new FormData();
      Object.keys(finalData).forEach(key => {
        if (key === 'async-upload') {
          finalData[key].forEach((file: any) => {
            formDataToSend.append(key, file.originFileObj);
          });
        } else {
          formDataToSend.append(key, finalData[key]);
        }
      });

      try {
        const username = process.env.USERNAME_AUTH_KEY;
        const password = process.env.PWD_AUTH_KEY;
    
        // Encoder les informations d'authentification en Base64
        const encodedCredentials = btoa(`${username}:${password}`);

        const response = await fetch(role =='customer' ? createCustomerApi : createSupplierApi, {
          method: 'POST',
          body: formDataToSend,
          headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'multipart/form-data',
          }
        });

        const result = await response.json();
        setLoading(false)
        console.log('Success:', result);
      } catch (error) {
        message.error("Echec de l'inscription!!")
        setLoading(false)
      }
  
    })
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
            disabled={loading}
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
          <Button type="primary" onClick={done} loading={loading}> 
            Terminer
          </Button>
        )}
      </div>
    </>
  );
};
export {Stepper}