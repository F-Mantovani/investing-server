const router = require('express').Router();
const getFiiData = require('../utils/getFiiData');
const asyncFor = require('../utils/asyncForEach');
const WatchList = require('../models/WatchList.model');
const throwError = require('../utils/throwError');
const statusInvest = require('statusinvest');

//POST: Create a watchlist for fiis and stocks of the brazilian market
router.post('/', async (req, res, next) => {
	const { fiis, stocks } = req.body;

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
	const owner = req.payload._id;

	try {
		const watchList = await WatchList.findOne({ owner });

		throwError(!watchList, 400, "You still don't have a watch list");

		const portfolio = { fiis: [], stocks: [] };

		await asyncFor(watchList.fiis, getFiiData, portfolio.fiis);

		if (watchList.stocks.length !== 0) {
			const allStocks = await statusInvest.getStocksInfo();

			portfolio.stocks = allStocks.filter(stock => watchList.stocks.includes(stock.Ativo));
		}

		res.status(200).json(portfolio);
	} catch (err) {
		next(err);
	}
});

// PUT: Update the existing watchList
router.put('/', async (req, res, next) => {
	const owner = req.payload._id;

	const { fiis, stocks } = req.body;

	try {
		if (fiis.length === 0 && stocks.length === 0)
			throwError(true, 400, 'You need at least one fiis and/or stock', 'Updating watch list');

		const watchList = await WatchList.findOneAndUpdate(
			{ owner },
			{ fiis, stocks },
			{ new: true, runValidators: true }
		);

		throwError(!watchList, 400, 'You need a WatchList to update', 'Updating watch list');

		res.status(200).json(watchList);
	} catch (err) {
		next(err);
	}
});

router.delete('/', async (req, res, next) => {
	const owner = req.payload._id;

	try {
		const { deletedCount } = await WatchList.deleteOne({ owner });

		throwError(!deletedCount, 400, "You don't have a WatchList", 'Deleting a watchlist');

		res.status(204).json();
	} catch (err) {
		next(err);
	}
});

module.exports = router;
