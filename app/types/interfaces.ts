import { UploadFile } from "antd"

export interface CardProfile {
    id: number,
    title: string,
  }
  
  
export  interface CreateCustomerFields {
    firstname: string,
    lastname: string,
    username: string,
    country: string,
    phone: string,
    profile: CardProfile,
    email: string,
    password: string
  }

export  interface CreateSupplierFields {
    name: string,
    username: string,
    country: string,
    address: string,
    phone: string,
    profile: CardProfile,
    files: UploadFile[],
    email: string,
    password: string,
    legalStatus: string,
    businessRegister: string,
    nationalID: string,
    taxID: string,
    categories: number[]
  }

export interface ProductCategory {
  id: number,
  name: string,
}