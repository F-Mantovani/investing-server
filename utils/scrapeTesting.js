const asyncForEach = require('./asyncForEach')
const getFiiData = require('./getFiiData')
const axios = require('axios')
const statusInvest = require('statusinvest')

const portfolio = []

// const test = ["HGLG11"]

// asyncForEach(test, getFiiData, portfolio)
//   .then(() => {
//     console.log(portfolio)
//   })
//   .catch((err) => {
//     console.log('Ih deu merda', err)
//   })

const stockScrapping = async () => {
  const testStocks = ["TRPL4", "TAEE11"]

  const stocks = await statusInvest.getStocksInfo()
  console.log(stocks.filter(stock => testStocks.includes(stock.Ativo)))
}

stockScrapping()
