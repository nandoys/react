export interface CardProfile {
    id: number,
    title: string,
  }
  
  
export  interface CreateCustomerForm {
    firstname: string,
    lastname: string,
    username: string,
    country: string,
    phone: string,
    profile: CardProfile,
    email: string,
    password: string
  }

export  interface CreateSupplierForm {
    name: string,
    username: string,
    country: string,
    address: string,
    phone: string,
    profile: CardProfile,
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