const axios = require('axios')

const cheerio = require('cheerio');


module.exports =  async (fiiName) => {
  try {
    const { data } = await axios.get(`https://statusinvest.com.br/fundos-imobiliarios/${fiiName}`)
    
    const $ = cheerio.load(data)
    const fiiObject = {}
    fiiObject.name = fiiName
  
    $('div.top-info strong.value').each((i, el) => {
    
      const fiiInfo = $(el).text()
       
      switch(i){
        case 0:
          fiiObject.currentValue = fiiInfo
          break;
        case 3:
          fiiObject.dividendYield = fiiInfo
          break;
        case 5:
          fiiObject.patrimonialPerShare = fiiInfo
          break;
        case 6:
          fiiObject.pvp = fiiInfo
          break;
        case 11: 
          fiiObject.dividend24Months = fiiInfo
          break;
        case 20:
          fiiObject.rent = fiiInfo
          break;
        case 23:
          fiiObject.cnpj = fiiInfo
          break;
      }
  
    })
  
    return fiiObject
  
  } catch (error) {
    console.log(error)
  }

}

// module.exports = getFiiData