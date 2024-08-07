
import { CardProfile, ProductCategory } from "../types/interfaces"
import { getCardsProfileApi, getProductsCategoriesApi } from "./endpoints"

export const getProfileByType = async(taxonomy: string) => {
  const response = await fetch(
    getCardsProfileApi+taxonomy,
    {
      method: 'GET'
    }
  )

  if (response) {
    const data  = await response.json()
    return data
  }
}

export const getProductsCategories = async() => {
    const username = 'ck_ddb764d6ebae1ec7998de3648f3eacfb15934f3a'// process.env.USERNAME_AUTH_KEY;
    const password = 'cs_e21dd71db48b6dd4f709e2d2a1c9690ae2c89903' //process.env.PWD_AUTH_KEY;

    console.log(process.env.USERNAME_AUTH_KEY)

    // Encoder les informations d'authentification en Base64
    const encodedCredentials = btoa(`${username}:${password}`);

    const response = await fetch(
      getProductsCategoriesApi,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        }
      }
    )
    
    if(!response.ok) {
      throw new Error("une erreur est intervnue")
    }

    if (response) {
      const data:ProductCategory[]  = await response.json()
      return data
    }
}