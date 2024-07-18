
import { CardProfile, ProductCategory } from "../types/interfaces"
import { getCardsProfileApi, getProductsCategoriesApi } from "./endpoints"

export const getProfileByType = async(setProfiles: React.Dispatch<React.SetStateAction<CardProfile[]>>) => {
    try {
      const response = await fetch(
        getCardsProfileApi,
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

export const getProductsCategories = async() => {
    const username = 'ck_ddb764d6ebae1ec7998de3648f3eacfb15934f3a';
    const password = 'cs_e21dd71db48b6dd4f709e2d2a1c9690ae2c89903';

    // Encoder les informations d'authentification en Base64
    const encodedCredentials = btoa(`${username}:${password}`);

    try {
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
        const data:ProductCategory  = await response.json()
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
}