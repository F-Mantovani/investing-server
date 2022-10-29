const router = require('express').Router();
const getFiiData = require('../utils/getFiiData');
const asyncFor = require('../utils/asyncForEach');
const WatchList = require('../models/WatchList.model');
const throwError = require('../utils/throwError');
const errorHandling = require('../utils/errorHandling');

//POST: Create a watchlist for fiis and stocks of the brazilian market
router.post('/create-watch', async (req, res, next) => {
	const { fiis } = req.body;

	const { stocks } = req.body;

	const owner = req.payload._id;

	try {
		const watchFound = await WatchList.findOne({ owner });

		throwError(watchFound, 500, 'You already have a watch list', 'Creating Watch List');

		const watchList = await WatchList.create({ fiis, stocks, owner });

		res.status(200).json(watchList);
	} catch (error) {
		errorHandling(res, error);
	}
});

//GET: Scrap statusinvest.com for the information about FIIs
//     Will scrap stocks too in the future
router.get('/get-watch', async (req, res, next) => {
	const { _id: id } = req.payload;

	const watchList = await WatchList.findOne({ owner: id });

	const portfolio = [];

	await asyncFor(watchList.fiis, getFiiData, portfolio);

	res.status(200).json(portfolio);
});

module.exports = router;
