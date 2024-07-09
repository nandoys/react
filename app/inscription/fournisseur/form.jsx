'use client'

import React, { useState } from "react";
import { Card, Radio, Select } from 'antd';
import ReactFlagsSelect from "react-flags-select";
import './style.css'


import { Input } from "../../components/input";
import { Stepper } from "../../components/stepper/stepper";

const GeneralInfoForm = ({
  selected, onSelect, name, onChangeName, phone, onChangePhone
}) => {
  
  return (
    <>
      <Input labelText="Nom de votre entreprise" name="entreprise" type="text" value={name} onChange={onChangeName} autocomplete="off" />

      <div>
          <label htmlFor="rfs-btn" className="block text-sm font-medium leading-6 text-gray-900">
            Votre pays d'opération
          </label>
      
        <ReactFlagsSelect
          selected={selected}
          onSelect={onSelect}
          placeholder="Choisissez votre pays"
          searchPlaceholder="Recherche..."
          searchable
          showSecondarySelectedLabel
          id="country"
        />
      </div>
      <Input labelText="Adresse physique" name="address" type="text" value={phone} onChange={onChangePhone} autocomplete="street-address" />
      <Input labelText="Numéro de téléphone" name="phone" type="text" value={phone} onChange={onChangePhone} autocomplete="tel" />
    </>
  )
}


const ProfileInfoForm = ({rccm, onChangeRccm, tax, onChangeTax, nationalId, onChangenationalId, category, onChangeCategory,
  profile, onChangeProfile, productCategories, productCategoriesOptions, onChangeProductCategories}) => {

  const categories = [
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
  
          <p className="flex justify-center mt-20">S2367S2022-ID</p>
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
        <Select
            //defaultValue="SA"
            value={category}
            style={{
              width: "100%",
            }}
            onChange={onChangeCategory}
            options={categories}
        />
      </div>
      <Input labelText="Numéro de RCCM" name="rccm" type="text" value={rccm} onChange={onChangeRccm} autocomplete="off" />
      <Input labelText="Numéro d’identification Nationale" name="nationalId" type="text" value={nationalId} onChange={onChangenationalId} autocomplete="off" />
      <Input labelText="Numéro d’impôt" name="tax" type="text" value={tax} onChange={onChangeTax} autocomplete="off" />
      <Select
        mode="multiple"
        placeholder="Inserted are removed"
        value={productCategories}
        onChange={onChangeProductCategories}
        style={{
          width: '100%',
        }}
        options={productCategoriesOptions}
      />
      
    </>
  )
}

const AccountInfoForm = ({email, onChangeEmail, passwod, onChangePasswod, confirm, onChangeConfirm}) => {
  return (
    <>
      <Input labelText="Adresse Email" name="email" type="email" value={email} onChange={onChangeEmail} autocomplete="email" />
      <Input labelText="Mot de passe" name="password" type="password" value={passwod} onChange={onChangePasswod} autocomplete="new-password" />
      <Input labelText="Confirmer mot de passe" name="confirmPassword" type="password" value={confirm} onChange={onChangeConfirm} autocomplete="new-password" />
    </>
  )
}


const RegisterForm = () => {
  const onSubmit = (e) => {
      e.preventDefault()
      console.log(e, 'here i\'m!!!')
  }

  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

  // states of Personnal Component
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const onSelect = (code) => setCountry(code);
  const onChangeFirstname = (e) => setFirstname(e.target.value)
  const onChangeLastname = (e) => setLastname(e.target.value)
  const onChangePhone = (e) => setPhone(e.target.value)

  // states of Profile Component
  const [profile, setProfile] = useState("EVOX")

  const onChangeProfile = (e) => setProfile(e.target.value);

  const [rccm, setRccm] = useState("")
  const [nationalId, setNationalId] = useState("")
  const [tax, setTax] = useState("")
  const [category, setCategory] = useState("SA")
  const [productCategories, setProductCategories] = useState([]);

  const onChangeRccm = (e) => setRccm(e.target.value)
  const onChangeNationalId = (e) => setNationalId(e.target.value)
  const onChangeTax = (e) => setTax(e.target.value)
  const onChangeCategory = (value) => setCategory(value);


  const filteredOptions = OPTIONS.filter((o) => !productCategories.includes(o));


  // states of Account Component
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const onChangeEmail = (e) => setEmail(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)
  const onChangeConfirm = (e) => setConfirm(e.target.value)


  const steps = [
    {
      title: 'Général',
      content: <GeneralInfoForm 
          selected={country} onSelect={onSelect}
          firstname={firstname} onChangeFirstname={onChangeFirstname}
          lastname={lastname} onChangeLastname={onChangeLastname}
          phone={phone} onChangePhone={onChangePhone}
      />,
    },

    {
      title: 'Choix du profil',
      content: <ProfileInfoForm 
        profile={profile} onChangeProfile={onChangeProfile}
        category={category} onChangeCategory={onChangeCategory}
        rccm={rccm} onChangeRccm={onChangeRccm}
        nationalId={nationalId} onChangenationalId={onChangeNationalId}
        tax={tax} onChangeTax={onChangeTax}
        productCategories={productCategories}
        onChangeProductCategories={setProductCategories}
        productCategoriesOptions={filteredOptions.map((item) => ({
          value: item,
          label: item,
        }))}
      />
    },
    {
      title: 'Compte',
      content: <AccountInfoForm
            email={email} onChangeEmail={onChangeEmail}
            passwod={password} onChangePasswod={onChangePassword}
            confirm={confirm} onChangeConfirm={onChangeConfirm}
       />,
    },
  ];

  const data = {
    firstname: firstname,
    lastname: lastname,
    country: country,
    phone: phone,
    profile: profile,
    email: email,
    pwd: password
  }
  

  return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-1" action="#" method="POST" onSubmit={onSubmit}>

          <Stepper steps={steps} data={data} />
        </form>
      </div>
  )
}


export { RegisterForm }