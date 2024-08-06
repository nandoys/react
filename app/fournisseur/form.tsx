/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState, useEffect, useCallback, memo } from "react";
import { Card, Radio, Select, Flex, Form, Typography, Input, Empty } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload } from 'antd';
import ReactFlagsSelect, { Cd, Cg, Ng } from "react-flags-select";

const { Title } = Typography;
const { Dragger } = Upload;

import { Stepper } from "../components/stepper";
import { getProductsCategories, getProfileByType } from "../api/service";

import { CardProfile, CreateSupplierFields, ProductCategory } from "../types/interfaces";

const legalStatusOptions = [
  {value: 'SA', label: 'SA'},
  {value: 'SARLU', label: 'SARLU'},
  {value: 'SARL', label: 'SARL'},
  {value: 'ÉTABLISSEMENT', label: 'ÉTABLISSEMENT'},
  {value: 'ASBL & ONG', label: 'ASBL & ONG'},
  {value: 'PERSONNE PHYSIQUE', label: 'PERSONNES PHYSIQUES AVEC N° d’IMPÔTS'},
]

let categoriesID = new Set<number>()


const GeneralInfoForm = ({
  country, onChangeCountry, name, onChangeName, address, onChangeAddress, phone, onChangePhone
}) => {
  
  return (
    <>
      <Form.Item
        rules={[
          { required: true, message: 'Veuillez entrer le nom de votre entreprise' }
        ]}
        name={"name"}
        label={"Nom de votre entreprise"
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={"country"}
        label="Votre pays d'opération"
        rules={[
          {required: true, message: "Veuillez choisir votre pays"}
        ]}
      >
        <Select 
          options={[
            {label: <div><Cg fontSize={18} style={{display: 'inline-block'}} /> Rep Congo</div>, value: 'Rép. Congo'},
            {label: <div><Cd fontSize={18} style={{display: 'inline-block'}} /> RD Congo</div>, value: 'Rép. Dém. Congo'},
            {label: <div><Ng fontSize={18} style={{display: 'inline-block'}} /> Nigeria</div>, value: 'Nigeria'},
          ]}
          placeholder="Choisissez votre pays"
          showSearch
          notFoundContent={
          <div>
            <Empty description="Aucun pays disponible"  /> 
          </div>}
        />
      </Form.Item>

      <Form.Item
        rules={[
          { required: true, message: "Veuillez entrer votre adresse physique" }
        ]}
        name={"address"}
        label={"Adresse physique"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        rules={[
          { required: true, message: 'Veuillez entrer votre numéro de téléphone' }
        ]}
        name={"phone"}
        label={"Numéro de téléphone"}
      >
        <Input />
      </Form.Item>
    </>
  )
}


const ProfileInfoForm = ({rccm, onChangeRccm, tax, onChangeTax, nationalId, onChangenationalId, legalStatus, onChangeLegalStatus,
  profile, onChangeProfile, selectedCategories, onChangeProductCategories, files, onChangeFiles}) => {

  return (
    <>
      <Form.Item>
        <SelectProfileMemo value={profile} onChange={onChangeProfile} />
      </Form.Item>

      <Form.Item>
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
      </Form.Item>
      
      <Form.Item>
        <Input labelText="Numéro de RCCM" name="businessRegister" type="text" value={rccm} onChange={onChangeRccm} autoComplete="off" />
      </Form.Item>
      <Form.Item>
        <Input labelText="Numéro d’identification Nationale" name="nationalID" type="text" value={nationalId} onChange={onChangenationalId} autoComplete="off" />
      </Form.Item>
      <Form.Item>
        <Input labelText="Numéro d’impôt" name="taxID" type="text" value={tax} onChange={onChangeTax} autoComplete="off" />
      </Form.Item>
      <Form.Item>
      < label className="block text-sm font-medium leading-6 text-gray-900 mt-2">Catégorie des produits</label>
        <CategoriesMemo onChange={onChangeProductCategories} value={selectedCategories} />
      </Form.Item>
      <Form.Item>
        <FileUpload files={files} onChangeFiles={onChangeFiles} />
      </Form.Item>
    </>
  )
}

const SelectProfileMemo = memo(function SelectProfile({onChange, value}) {
  const [profiles, setProfiles] =  useState<CardProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selected = profiles.find(profile => typeof value != 'number' ? profile.title == value.title : profile.id == value)

  
  useEffect(() => {
    const cachedData = sessionStorage.getItem('supplier-profile-card');
    if (cachedData) {
      setProfiles(JSON.parse(cachedData));
      setLoading(false);
    } else {
      getProfileByType('fournisseur')
        .then((data) => {
          sessionStorage.setItem('supplier-profile-card', JSON.stringify(data));
          setProfiles(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [])


  return <>
    <div className="mt-5">
      <Card
        style={{
          height: 250,
          color: "#fff",
          backgroundImage: `url('/${selected?.title.toLowerCase() ?? 'dax'}.jpg')`,
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
        <label>Quel Profil pour votre compte ?</label>
        <Radio.Group onChange={onChange} value={selected?.id} id="profile" name="profile">
          {
            profiles.map(card => (
                <Radio key={card.id} value={card.id}>Carte {card.title}</Radio>
            ))
          }
        </Radio.Group>
      </div>
  </>
})

const CategoriesMemo = memo(function SelectCategories({onChange, value}) {
  
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  
  const options = productCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  useEffect(() => {
    const cachedData = sessionStorage.getItem('product-categories');
    if (cachedData) {
      setProductCategories(JSON.parse(cachedData));
      setLoading(false);
    } else {
      getProductsCategories()
        .then((data:ProductCategory[]) => {
          sessionStorage.setItem('product-categories', JSON.stringify(data));
          setProductCategories(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, []);


  useEffect(()=>{
    productCategories.forEach((category) => {
      categoriesID.add(category.id)
    })
  }, [productCategories])


  return <Select
      mode="multiple"
      className="mb-2"
      onChange={onChange}
      style={{
        width: '100%',
      }}
      options={options}
      notFoundContent={
        <div>Aucune catégorie trouvée</div>
      }
      aria-readonly
      value={value}
    />
})

const FileUpload = ({files, onChangeFiles}) => {  
  const props: UploadProps = {
    name: 'file',
    accept: 'image/png, image/jpeg, image/jpg, application/pdf',
    maxCount: 3,
    multiple: true,
    locale: {
      uploadError: "Erreur de chargement",
      removeFile: "Retirer"
    },
    fileList: files,
    //action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;

      if (status === 'done') {
        message.success(`${info.file.name} chargement réussi.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} chargement échoué.`);
      }
    },
    onDrop(e) {
      const file = e.dataTransfer.files[0]
      const accept = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
      if(!accept.some((format, index) => format == file.type)) {
        message.error(`${file.name} format invalide.`);
      }
    },
    beforeUpload(file) {
      if((file.size / 1048576) >= 5) {
        message.error(`${file.name} fichier volumineux.`);
        return Upload.LIST_IGNORE
      }
      if(files.length == 3) {
        message.error(`Nombre maximal de fichier atteint`);
        return Upload.LIST_IGNORE
      }
      files.push(file)
      onChangeFiles(files);
    },
    onRemove: file => {
      onChangeFiles(files.filter(f => f.uid !== file.uid));
    },
  };

  return <Dragger 
    {...props}
    name="files"
  >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Cliquer ou déposer des fichiers dans cette zone</p>
    <p className="ant-upload-hint">
      Vous pouvez selectionner un ou plusieurs fichiers au format : PDF | JPG | JPEG  |PNG
      <br />Taille Maximal: 5Mo
    </p>
  </Dragger>
}

const AccountInfoForm = ({email, onChangeEmail, passwod, onChangePasswod, confirm, onChangeConfirm}) => {
  return (
    <>
      <Form.Item>
        <Input labelText="Adresse Email" name="email" type="email" value={email} onChange={onChangeEmail} autoComplete="email" />
      </Form.Item>

      <Form.Item>
        <Input labelText="Mot de passe" name="password" type="password" value={passwod} onChange={onChangePasswod} autoComplete="new-password" />
      </Form.Item>

      <Form.Item>
        <Input labelText="Confirmer mot de passe" name="confirmPassword" type="password" value={confirm} onChange={onChangeConfirm} autoComplete="new-password" />
      </Form.Item>
    </>
  )
}


const RegisterForm = () => {
  const onSubmit = (e) => {
      e.preventDefault()
      console.log(e, 'here i\'m!!!')
  }

  const [formFields, setFormFields] = useState<CreateSupplierFields>({    
    name: '',
    username: '',
    country: '',
    address: '',
    phone: '',
    profile: {
      id: 5503, // to change
      title: 'DAX'
    },
    files: [],
    legalStatus: '',
    businessRegister: '',
    nationalID: '',
    taxID: '',
    categories: [],
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,     
      'username': `${formFields.name}`
    });
  };

  const handleCategoriesChange = useCallback((e: Array<number>) => {
    setFormFields({
      ...formFields,
      'categories': e
     });
  }, [formFields])

  const handleCountryChange = (e: string) => {
    setFormFields({
      ...formFields,
      'country': e
     });
  }

  const handleFilesChange = (e) => {
    setFormFields({
      ...formFields,
      'files': [...e]
     });
  }

  const handleLegalStatusChange = (e: string) => {
    setFormFields({
      ...formFields,
      'legalStatus': e
     });
  }

  const [confirm, setConfirm] = useState("")
  const onChangeConfirm = (e) => setConfirm(e.target.value)

  const [form] = Form.useForm()
 
  const steps = [
    {
      title: 'Général',
      content: <GeneralInfoForm 
          country={formFields.country} onChangeCountry={handleCountryChange}
          name={formFields.name} onChangeName={handleChange}
          address={formFields.address} onChangeAddress={handleChange}
          phone={formFields.phone} onChangePhone={handleChange}
      />,
    },

    {
      title: 'Choix du profil',
      content: <ProfileInfoForm 
        profile={formFields.profile} onChangeProfile={handleChange}
        legalStatus={formFields.legalStatus} onChangeLegalStatus={handleLegalStatusChange}
        rccm={formFields.businessRegister} onChangeRccm={handleChange}
        nationalId={formFields.nationalID} onChangenationalId={handleChange}
        tax={formFields.taxID} onChangeTax={handleChange}
        selectedCategories={formFields.categories} onChangeProductCategories={handleCategoriesChange}
        files={formFields.files} onChangeFiles={handleFilesChange}
      />
    },

    {
      title: 'Compte',
      content: <AccountInfoForm
            email={formFields.email} onChangeEmail={handleChange}
            passwod={formFields.password} onChangePasswod={handleChange}
            confirm={confirm} onChangeConfirm={onChangeConfirm}
       />,
    },
  ];


  

  return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form 
          form={form}
          scrollToFirstError={true}
          layout="vertical"
        >

          <Stepper steps={steps} formController={form} formFields={formFields} role="supplier" />
        </Form>
      </div>
  )
}


export { RegisterForm }