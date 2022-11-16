const router = require('express').Router();

const WatchControllers = require('../controllers/watch.controllers')

//POST: Create a watchlist for fiis and stocks of the brazilian market
router.post('/', WatchControllers.create);

//GET: Scrap statusinvest.com for the information about FIIs and Stocks (using npm package)
router.get('/', WatchControllers.get);

// PUT: Update the existing watchList
router.put('/', WatchControllers.update);


router.delete('/', WatchControllers.delete);

module.exports = router;
