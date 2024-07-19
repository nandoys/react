/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState, useEffect } from "react";
import { Card, Radio, Select, Flex, Typography } from 'antd';
import ReactFlagsSelect from "react-flags-select";

const { Title } = Typography;

import { Input } from "../components/input";
import { Stepper } from "../components/stepper";
import { getProductsCategories } from "../api/service";

import { CardProfile, CreateSupplierForm, ProductCategory } from "../types/interfaces";


const GeneralInfoForm = ({
  country, onChangeCountry, name, onChangeName, address, onChangeAddress, phone, onChangePhone
}) => {
  
  return (
    <>
      <Input labelText="Nom de votre entreprise" name="name" type="text" value={name} onChange={onChangeName} autoComplete="off" />

      <div>
          <label htmlFor="rfs-btn" className="block text-sm font-medium leading-6 text-gray-900">
            Votre pays d'opération
          </label>
      
        <ReactFlagsSelect
          selected={country}
          onSelect={onChangeCountry}
          placeholder="Choisissez votre pays"
          searchPlaceholder="Recherche..."
          searchable
          showSecondarySelectedLabel
          id="country"
        />
      </div>
      <Input labelText="Adresse physique" name="address" type="text" value={address} onChange={onChangeAddress} autoComplete="street-address" />
      <Input labelText="Numéro de téléphone" name="phone" type="text" value={phone} onChange={onChangePhone} autoComplete="tel" />
    </>
  )
}


const ProfileInfoForm = ({rccm, onChangeRccm, tax, onChangeTax, nationalId, onChangenationalId, legalStatus, onChangeLegalStatus,
  profile, onChangeProfile, onChangeProductCategories}) => {

  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [profiles, setProfiles] =  useState<CardProfile[]>([]);
  
  const categoriesOptions = productCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  useEffect(() => {
    getProductsCategories(setProductCategories)
  }, [])

  const legalStatusOptions = [
    {value: 'SA', label: 'SA'},
    {value: 'SARLU', label: 'SARLU'},
    {value: 'SARL', label: 'SARL'},
    {value: 'ÉTABLISSEMENT', label: 'ÉTABLISSEMENT'},
    {value: 'ASBL & ONG', label: 'ASBL & ONG'},
    {value: 'PERSONNE PHYSIQUE', label: 'PERSONNES PHYSIQUES AVEC N° d’IMPÔTS'},
  ]

  return (
    <>
      <div className="mt-5">
        <Card
          style={{
            height: 250,
            color: "#fff",
            backgroundImage: `url('/${profile}.jpg')`,
            backgroundSize: "cover"
          }}
          hoverable
        >
  
            <br />
            <Flex justify="center" align="center" vertical className="mt-20">
              <Title level={3} style={{color: "#fff",}}>2035MAX-6790-1MA</Title>
            </Flex>
        </Card>
      </div>

      <div className="mt-5 mb-5">
        <label htmlFor="profile">Quel Profil pour votre compte ?</label>
        <Radio.Group onChange={onChangeProfile} value={profile} id="profile">
          <Radio value="EVOX">Carte EVOX</Radio>
          <Radio value="DAX">Carte DAX</Radio>
        </Radio.Group>
      </div>

      <div className="mt-5 mb-5">
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-2">Forme juridique</label>
        <Select
            //defaultValue="SA"
            value={legalStatus}
            style={{
              width: "100%",
            }}
            onChange={onChangeLegalStatus}
            options={legalStatusOptions}
        />
      </div>

      <Input labelText="Numéro de RCCM" name="businessRegister" type="text" value={rccm} onChange={onChangeRccm} autoComplete="off" />
      <Input labelText="Numéro d’identification Nationale" name="nationalID" type="text" value={nationalId} onChange={onChangenationalId} autoComplete="off" />
      <Input labelText="Numéro d’impôt" name="taxID" type="text" value={tax} onChange={onChangeTax} autoComplete="off" />
      
      <label className="block text-sm font-medium leading-6 text-gray-900 mt-2">Catégorie des produits</label>
      <Select
        mode="multiple"
        onChange={onChangeProductCategories}
        style={{
          width: '100%',
        }}
        options={categoriesOptions}
      />
      
    </>
  )
}

const AccountInfoForm = ({email, onChangeEmail, passwod, onChangePasswod, confirm, onChangeConfirm}) => {
  return (
    <>
      <Input labelText="Adresse Email" name="email" type="email" value={email} onChange={onChangeEmail} autoComplete="email" />
      <Input labelText="Mot de passe" name="password" type="password" value={passwod} onChange={onChangePasswod} autoComplete="new-password" />
      <Input labelText="Confirmer mot de passe" name="confirmPassword" type="password" value={confirm} onChange={onChangeConfirm} autoComplete="new-password" />
    </>
  )
}


const RegisterForm = () => {
  const onSubmit = (e) => {
      e.preventDefault()
      console.log(e, 'here i\'m!!!')
  }

  const [formData, setFormData] = useState<CreateSupplierForm>({    
    name: '',
    username: '',
    country: '',
    address: '',
    phone: '',
    profile: {
      id: 5499, // to change
      title: 'SSID'
    },
    legalStatus: '',
    businessRegister: '',
    nationalID: '',
    taxID: '',
    categories: [],
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    console.log(e)
    const hasTargetProperty :boolean = Object.hasOwn(e, 'target')
    setFormData({
      ...formData,
      [hasTargetProperty ? e.target.name : 'legalStatus']: hasTargetProperty ? e.target.value : e,
      'username': `${formData.name}.${formData.legalStatus}`
    });
  };

  const [confirm, setConfirm] = useState("")
  const onChangeConfirm = (e) => setConfirm(e.target.value)
  

  const OPTIONS = ['Alimentation et Épicerie', 'Animaux de Compagnie', 'Automobiles et Motos', 'Divers', 'Électronique', 
    'Jouets et Jeux', 'Livres et Papeterie'];


  const filteredOptions = OPTIONS.filter((o) => ![''].includes(o));

  const steps = [
    {
      title: 'Général',
      content: <GeneralInfoForm 
          country={formData.country} onChangeCountry={handleChange}
          name={formData.name} onChangeName={handleChange}
          address={formData.address} onChangeAddress={handleChange}
          phone={formData.phone} onChangePhone={handleChange}
      />,
    },

    {
      title: 'Choix du profil',
      content: <ProfileInfoForm 
        profile={formData.profile} onChangeProfile={handleChange}
        legalStatus={formData.legalStatus} onChangeLegalStatus={handleChange}
        rccm={formData.businessRegister} onChangeRccm={handleChange}
        nationalId={formData.nationalID} onChangenationalId={handleChange}
        tax={formData.taxID} onChangeTax={handleChange}
        onChangeProductCategories={handleChange}
        /*productCategoriesOptions={filteredOptions.map((item) => ({
          value: item,
          label: item,
        }))}*/
      />
    },
    {
      title: 'Compte',
      content: <AccountInfoForm
            email={formData.email} onChangeEmail={handleChange}
            passwod={formData.password} onChangePasswod={handleChange}
            confirm={confirm} onChangeConfirm={onChangeConfirm}
       />,
    },
  ];


  

  return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-1" action="#" method="POST">

          <Stepper steps={steps} formData={undefined} />
        </form>
      </div>
  )
}


export { RegisterForm }