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

    const names = [
      'Valor atual',
      'Min. 52 semanas',
      'Máx. 52 semanas',
      'Valorização (12m)',
      'Val. patrimonial p/cota',
      'P/VP',
    ]

    const divs = $('div.top-info div.info div div')

    for (const div of divs) {
      const name = $(div).find('h3.title').text()

      if (name && names.includes(name)) {
        const value = $(div).find('strong').text()
        fiiObject[name] = value
      }

    }
  
    return fiiObject

   
  } catch (error) {
    console.log('this is the error =>', error)
  }

}

