'use server'

export const getProfileByType = async(type: string) => {
    const response = await fetch(`https://grandmaxinfinity.com/wp-json/gmi/v1/cards?taxonomy=${type}`)
    return await response.json()
}