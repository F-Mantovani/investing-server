const router = require('express').Router();
const getFiiData = require('../utils/getFiiData');
const asyncFor = require('../utils/asyncForEach');
const WatchList = require('../models/WatchList.model');
const throwError = require('../utils/throwError');

//POST: Create a watchlist for fiis and stocks of the brazilian market
router.post('/', async (req, res, next) => {
	const { fiis } = req.body;

	const { stocks } = req.body;

	const owner = req.payload._id;

	try {
		const watchFound = await WatchList.findOne({ owner });

		throwError(watchFound, 500, 'You already have a watch list', 'Creating Watch List');

		const watchList = await WatchList.create({ fiis, stocks, owner });

		res.status(200).json(watchList);
	} catch (err) {
		next(err);
	}
});

//GET: Scrap statusinvest.com for the information about FIIs
//     Will scrap stocks too in the future or use a package that exists for stocks
router.get('/', async (req, res, next) => {
	const { _id: id } = req.payload;

	try {
		const watchList = await WatchList.findOne({ owner: id });

		throwError(!watchList, 400, "You still don't have a watch list", )
	
		const portfolio = [];
	
		await asyncFor(watchList.fiis, getFiiData, portfolio);
	
		res.status(200).json(portfolio);
	} catch (err) {
		next(err)
	}
});

// PUT: Update the existing watchList 
router.put('/')

module.exports = router;
