const router = require('express').Router();
const getFiiData = require('../utils/getFiiData');
const asyncFor = require('../utils/asyncForEach');
const WatchList = require('../models/WatchList.model');
const throwError = require('../utils/throwError');
const statusInvest = require('statusinvest');

const WatchControllers = require('../controllers/watch.controllers')

//POST: Create a watchlist for fiis and stocks of the brazilian market
router.post('/', WatchControllers.create);

//GET: Scrap statusinvest.com for the information about FIIs
//     Will scrap stocks too in the future or use a package that exists for stocks
router.get('/', WatchControllers.get);

// PUT: Update the existing watchList
router.put('/', WatchControllers.update);

router.delete('/', WatchControllers.delete);

module.exports = router;
