/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState, useEffect, useCallback, memo } from "react";
import { Card, Radio, Select, Flex, Form, Typography, Input, Empty } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
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


const GeneralInfoForm = () => {

  return (
    <>
      <Form.Item
        rules={[
          { required: true, message: 'Veuillez entrer le nom de votre entreprise' }
        ]}
        name={"name"}
        label="Nom de votre entreprise"
        tooltip="obligatoire"
        hasFeedback
        validateFirst
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={"country"}
        label="Votre pays d'opération"
        rules={[
          {required: true, message: "Veuillez choisir votre pays"}
        ]}
        tooltip="obligatoire"
        hasFeedback
        validateFirst
      >
        <Select
          options={[
            {label: <div><Cg fontSize={18} style={{display: 'inline-block'}} /> Rep Congo</div>, value: 'Rép. Congo'},
            {label: <div><Cd fontSize={18} style={{display: 'inline-block'}} /> RD Congo</div>, value: 'Rép. Dém. Congo'},
            {label: <div><Ng fontSize={18} style={{display: 'inline-block'}} /> Nigeria</div>, value: 'Nigeria'},
          ]}
          placeholder="Choisissez votre pays"
          showSearch
          notFoundContent={<Empty description="Aucun pays disponible"  />}
          allowClear
          aria-readonly
        />
      </Form.Item>

      <Form.Item
        rules={[
          { required: true, message: "Veuillez entrer votre adresse physique" }
        ]}
        tooltip="obligatoire"
        hasFeedback
        validateFirst
        name={"address"}
        label={"Adresse physique"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        rules={[
          { required: true, message: 'Veuillez entrer votre numéro de téléphone' }
        ]}
        tooltip="obligatoire"
        hasFeedback
        validateFirst
        name={"phone"}
        label={"Numéro de téléphone"}
      >
        <Input />
      </Form.Item>
    </>
  )
}


const ProfileInfoForm = ({form})  => {

  return (
    <>
      <SelectProfileMemo formInstance={form} />

      <Form.Item label="Forme juridique" name={"legalStatus"}
        rules={[
          {required: true, message: "Veuillez choisir votre forme juridique"}
        ]}
        tooltip="obligatoire"
        hasFeedback
        validateFirst
      >
        <Select
            style={{
              width: "100%",
            }}
            options={legalStatusOptions}
        />
      </Form.Item>

      <Form.Item label="Numéro de RCCM" name={"businessRegister"}>
        <Input />
      </Form.Item>
      <Form.Item label="Numéro d’identification Nationale" name={"nationalID"}>
        <Input />
      </Form.Item>
      <Form.Item label="Numéro d’impôt" name={"taxID"}
        rules={[
          {required: true, message: "Veuillez saisir votre numéro d'impôt"}
        ]}
        tooltip="obligatoire"
        hasFeedback
        validateFirst
      >
        <Input />
      </Form.Item>
      <CategoriesMemo />
      <FileUpload />
    </>
  )
}

const SelectProfileMemo = function SelectProfile({formInstance}) {
  const [profiles, setProfiles] =  useState<CardProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  let selected = Form.useWatch('profile', formInstance)

  selected = profiles.find(p =>  p.id == selected)


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
          backgroundImage: `url('/${selected?.title?.toLowerCase() ?? 'dax'}.jpg')`,
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
        <Form.Item label="Quel Profil pour votre compte ?" name={"profile"}
          // initialValue={{
          //   id: 5503, // to change
          //   title: 'DAX'
          // }}
          rules={[
            {required: true, message: "Veuillez choisir un profil"},
          ]}
          tooltip="obligatoire"
          hasFeedback
          validateFirst
        >
          <Radio.Group id="profile">
            {
              profiles.map(card => (
                  <Radio key={card.id} value={card.id}>Carte {card.title}</Radio>
              ))
            }
          </Radio.Group>
        </Form.Item>
      </div>
  </>
}

const CategoriesMemo = function SelectCategories() {

  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
    /*
    productCategories.forEach((category) => {
      categoriesID.add(category.id)
    })
      */
  }, [productCategories])

  const options = productCategories.length > 0 ? productCategories.map((category) => ({
    value: category.id,
    label: category.name,
  })) : [g]


  return <>
    <Form.Item
      label="Catégorie des produits" name={"categories"}
      rules={[
        {required: true, message: "Veuillez choisir une catégorie"}
      ]}
      tooltip="obligatoire"
      hasFeedback
      validateFirst
    >
      <Select
        mode="multiple"
        className="mb-2"
        style={{
          width: '100%',
        }}
        options={options}
        notFoundContent={<Empty description="Aucune catégorie trouvée" />}
        aria-readonly
      />
    </Form.Item>
  </>
}

const FileUpload = () => {
  const props: UploadProps = {
    name: 'file',
    accept: 'image/png, image/jpeg, image/jpg, application/pdf',
    maxCount: 3,
    multiple: true,
    locale: {
      uploadError: "Erreur de chargement",
      removeFile: "Retirer"
    },
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
    beforeUpload(file, fileList) {
      if((file.size / 1048576) >= 5) {
        message.error(`${file.name} fichier volumineux.`);
        return Upload.LIST_IGNORE
      }
      
      if(fileList.length == 4) {
        message.error(`Nombre maximal de fichier atteint`);
        return Upload.LIST_IGNORE
      }
      //files.push(file)
      //onChangeFiles(files);
    },
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Form.Item name={"files"} valuePropName="fileList" getValueFromEvent={normFile}
        rules={[
          {required: true, message: "Veuillez ajouter vos documents"}
        ]}
        tooltip="obligatoire"
        hasFeedback
        validateFirst
      >
        <Dragger
          {...props}
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
      </Form.Item>
    </>
  )
}

const AccountInfoForm = () => {
  return (
    <>
      <Form.Item label="Adresse Email" name={"email"}
        rules={[
          {required: true, message: "Veuillez saisir votre adresse email"}
        ]}
        tooltip="obligatoire"
        hasFeedback
        validateFirst
      >
        <Input type="email" autoComplete="email" />
      </Form.Item>

      <Form.Item label="Mot de passe" name={"password"}
        rules={[
          {required: true, message: "Veuillez saisir un mot de passe"}
        ]}
        tooltip="obligatoire"
        hasFeedback
        validateFirst
      >
        <Input.Password autoComplete="new-password" />
      </Form.Item>

      <Form.Item label="Confirmer mot de passe" name={"confirmPassword"}
          rules={[
            {required: true, message: "Veuillez valider le mot de passe"}
          ]}
          tooltip="obligatoire"
          hasFeedback
          validateFirst
      >
        <Input.Password />
      </Form.Item>
    </>
  )
}


const RegisterForm = () => {
  const onSubmit = (e) => {
      e.preventDefault()
      console.log(e, 'here i\'m!!!')
  }

  const onFinish = (values: any) => {
    message.success('Form submitted successfully');
    console.log('Received values: ', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [confirm, setConfirm] = useState("")
  const onChangeConfirm = (e) => setConfirm(e.target.value)

  const [form] = Form.useForm<CreateSupplierFields>()

  const steps = [
    {
      title: 'Général',
      content: <GeneralInfoForm />,
    },

    {
      title: 'Choix du profil',
      content: <ProfileInfoForm form={form} />
    },

    {
      title: 'Compte',
      content: <AccountInfoForm />,
    },
  ];




  return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          form={form}
          scrollToFirstError={true}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Stepper steps={steps} formController={form} role="supplier" />
        </Form>
      </div>
  )
}


export { RegisterForm }