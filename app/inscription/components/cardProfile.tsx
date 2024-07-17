import { Radio  } from 'antd';

async function getCardsProfile(taxonomy: string) {
    const res = await fetch(`https://grandmaxinfinity.com/wp-json/gmi/v1/cards?taxonomy=${taxonomy}`)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function CardProfile({taxonomy}: {taxonomy: string}) {
    // Initiate both requests in parallel
   // const cardsProfileData = getCardsProfile(taxonomy)
   
    // Wait for the promises to resolve
    //const cards = await cardsProfileData

    console.log(cards)
   
    return (
      <>
        {
            cards.map(card => (
                <Radio key={card.id} value={card.id}>Carte {card.title}</Radio>
            ))
        }
      </>
    )
  }