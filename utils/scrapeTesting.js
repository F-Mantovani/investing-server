const asyncForEach = require('./asyncForEach')
const getFiiData = require('./getFiiData')
const axios = require('axios')
const statusInvest = require('statusinvest')
const getStocksData = require('./getStocksData')

const portfolio = []

const test = ["TAEE11"]

asyncForEach(test, getStocksData, portfolio)
  .then(() => {
    console.log(portfolio)
  })
  .catch((err) => {
    console.log('Ih deu merda', err)
  })



