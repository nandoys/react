'use client'

import React, { useEffect, useState } from "react";
import { Card, Radio, Flex, Typography, RadioChangeEvent  } from 'antd';
import ReactFlagsSelect from "react-flags-select";

const { Title } = Typography;


import { Input } from "./components/input";
import { Stepper } from "./components/stepper";
import { getProfileByType } from "./api/service";
import { CardProfile, CreateCustomerForm } from "./types/interfaces";


//const FormContext = createContext();


const PersonalInfoForm = ({
  country, onChangeCountry, firstname, onChangeFirstname, lastname, onChangeLastname, phone, onChangePhone
}) => {
  
  return (
    <>
      <Input labelText="Votre prénom" name="firstname" type="text" value={firstname} onChange={onChangeFirstname} autoComplete="given-name" />
      <Input labelText="Votre nom de famille" name="lastname" type="text" value={lastname} onChange={onChangeLastname} autoComplete="family-name" />
      
      <div>
          <label htmlFor="rfs-btn" className="block text-sm font-medium leading-6 text-gray-900">
            Votre pays de résidence
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

      <Input labelText="Numéro de téléphone" name="phone" type="text" value={phone} onChange={onChangePhone} autoComplete="tel" />
    </>
  )
}


const ProfileInfoForm = ({profile, onChangeProfile} : {profile: CardProfile, onChangeProfile: (e: RadioChangeEvent)=> void }) => {
  
  const [profiles, setProfiles] =  useState<CardProfile[]>([]);
  //const { formData, setFormData } = useContext(FormContext);


  useEffect(() => {
    getProfileByType(setProfiles)
  }, [])


  const selected = profiles.find(p => typeof profile != 'number' ? p.title == profile.title : p.id == profile)


  return (
    <>
      <div className="mt-5 mb-5">
        <label htmlFor="profile">Quel Profil pour votre compte ? </label>
        <Radio.Group onChange={onChangeProfile} value={selected?.id} id="profile" name="profile">
          {
              profiles.map(card => (
                  <Radio key={card.id} value={card.id}>Carte {card.title}</Radio>
              ))
          }
        </Radio.Group>
      </div>
      
      <div>
        <Card
          style={{
            height: 250,
            backgroundImage: `url('/${selected?.title ?? 'ssid'}.jpg')`,
            backgroundSize: "cover"
          }}
          hoverable
        >
            <br />
            <Flex justify="center" align="center" vertical className="mt-20">
              <Title level={3} style={{color: "#fff",}}>S2367S2022-ID</Title>
            </Flex>
        </Card>
      </div>
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

  const [formData, setFormData] = useState<CreateCustomerForm>({    
    firstname: '',
    lastname: '',
    username: '',
    country: '',
    phone: '',
    profile: {
      id: 5499, // to change
      title: 'SSID'
    },
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const hasTargetProperty :boolean = Object.hasOwn(e, 'target')
    setFormData({
      ...formData,
      [hasTargetProperty ? e.target.name : 'country']: hasTargetProperty ? e.target.value : e,
      'username': `${formData.firstname}.${formData.lastname}`
    });
  };


  const [confirm, setConfirm] = useState("")
  const onChangeConfirm = (e) => setConfirm(e.target.value)


  const steps = [
    {
      title: 'Infos personnelles',
      content: <PersonalInfoForm 
          country={formData.country} onChangeCountry={handleChange}
          firstname={formData.firstname} onChangeFirstname={handleChange}
          lastname={formData.lastname} onChangeLastname={handleChange}
          phone={formData.phone} onChangePhone={handleChange}
      />,
    },
    {
      title: 'Choix du profil',
      content: <ProfileInfoForm profile={formData.profile} onChangeProfile={handleChange} />,
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

        <Stepper steps={steps} formData={formData} />
      </form>
    </div>
  )
}


export { RegisterForm }