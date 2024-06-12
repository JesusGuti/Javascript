function manufacture (gifts, materials) {
    let manufacturedGifts = []

    /* For each gift we will check if there are materials to construct it  */
    gifts.forEach((gift) => {
      let canBeManafactured = true
      const giftToArray = gift.split('')
      const materialsToArray = materials.split('')    
      
      // If any character is not included in the materials the answer will be false
      giftToArray.forEach((character) => {
          if (!materialsToArray.includes(character)) canBeManafactured = false
      })
      canBeManafactured ? manufacturedGifts.push(gift) : ''
    })
    return manufacturedGifts
}

const gifts = ['tren', 'oso', 'pelota']
const materials = 'tronesa'

// const gifts = ['juego', 'puzzle']
// const materials = 'jlepuz'

// const gifts = ['libro', 'ps5']
// const materials = 'psli'
manufacture(gifts, materials)
