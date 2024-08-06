
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
    const username = process.env.USERNAME_AUTH_KEY;
    const password = process.env.PWD_AUTH_KEY;

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

    if (response) {
      const data:ProductCategory[]  = await response.json()
      return data
    }
}