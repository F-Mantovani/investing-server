const axios = require('axios')

const cheerio = require('cheerio');

// Fake User-Agent so we can scrape the data without getting blocked
// Cloudflare was blocking in that case
const header = {"User-Agent": 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'}


module.exports =  async (fiiName) => {
  try {
    const { data } = await axios.get(`https://statusinvest.com.br/fundos-imobiliarios/${fiiName}`, {headers: header})
                                               
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
      }
  
    })
  
    return fiiObject
  
  } catch (error) {
    console.log('this is the error =>',error)
  }

}

