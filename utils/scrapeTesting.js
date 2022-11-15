const asyncForEach = require('./asyncForEach')
const getFiiData = require('./getFiiData')
const axios = require('axios')

const portfolio = []

const test = ["HGLG11"]

asyncForEach(test, getFiiData, portfolio)
  .then(() => {
    console.log(portfolio)
  })
  .catch((err) => {
    console.log('Ih deu merda', err)
  })
