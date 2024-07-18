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
    firstname: string,
    lastname: string,
    username: string,
    country: string,
    phone: string,
    profile: CardProfile,
    email: string,
    password: string
  }

export interface ProductCategory {
  id: number,
  name: string,
}