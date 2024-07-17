'use client'

import React, { useEffect, useState } from "react";
import { Card, Radio, Flex, Typography  } from 'antd';
import ReactFlagsSelect from "react-flags-select";

const { Title } = Typography;


import { Input } from "../components/input";
import { Stepper } from "../components/stepper/stepper";



type Profile = {
  id: number,
  title: string,
}


const PersonalInfoForm = ({
  selected, onSelect, firstname, onChangeFirstname, lastname, onChangeLastname, phone, onChangePhone
}) => {
  
  return (
    <>
      <Input labelText="Votre prénom" name="firstname" type="text" value={firstname} onChange={onChangeFirstname} autocomplete="given-name" />
      <Input labelText="Votre nom de famille" name="lastname" type="text" value={lastname} onChange={onChangeLastname} autocomplete="family-name" />
      
      <div>
          <label htmlFor="rfs-btn" className="block text-sm font-medium leading-6 text-gray-900">
            Votre pays de résidence
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

      <Input labelText="Numéro de téléphone" name="phone" type="text" value={phone} onChange={onChangePhone} autocomplete="tel" />
    </>
  )
}


const ProfileInfoForm = ({profile, onChangeProfile}) => {
  const [profiles, setProfiles] =  useState<Profile[]>([]);

  const getProfileByType = async() => {
      try {
        const response = await fetch(
          `https://grandmaxinfinity.com/wp-json/gmi/v1/cards?taxonomy=client`,
          {
            method: 'GET'
          }
        )

        if (response) {
          const data  = await response.json()
          setProfiles(data)
        }
      } catch (error) {
        console.log(error)
      }
  }


  useEffect(()=> {
    getProfileByType()
  }, [])

  const selected = profiles.find(p => isNaN(profile) ? p.title == profile : p.id == profile)

  return (
    <>
      <div className="mt-5 mb-5">
        <label htmlFor="profile">Quel Profil pour votre compte ?</label>
        <Radio.Group onChange={onChangeProfile} value={selected?.id} id="profile">
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
  const onSubmit = (e) => {
      e.preventDefault()
      console.log(e, 'here i\'m!!!')
  }

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
  const [profile, setProfile] = useState("SSID")

  const onChangeProfile = (e) => setProfile(e.target.value);


  // states of Account Component
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const onChangeEmail = (e) => setEmail(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)
  const onChangeConfirm = (e) => setConfirm(e.target.value)


  const steps = [
    {
      title: 'Infos personnelles',
      content: <PersonalInfoForm 
          selected={country} onSelect={onSelect}
          firstname={firstname} onChangeFirstname={onChangeFirstname}
          lastname={lastname} onChangeLastname={onChangeLastname}
          phone={phone} onChangePhone={onChangePhone}
      />,
    },
    {
      title: 'Choix du profil',
      content: <ProfileInfoForm profile={profile} onChangeProfile={onChangeProfile} />,
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