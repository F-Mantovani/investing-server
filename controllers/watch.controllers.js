const Watch = require('../services/watch.service');
const asyncForEach = require('../utils/asyncForEach');
const getFiiData = require('../utils/getFiiData');
const throwError = require('../utils/throwError');

const WatchControllers = {
	create: async (req, res, next) => {
		const { fiis, stocks } = req.body;

		const owner = req.payload._id;

		const newWatch = { fiis, stocks, owner };

		try {
			const watchSearch = await Watch.findWatch(owner);

			throwError(watchSearch, 500, 'You already have a watch list', 'Creating Watch List');

			const watchList = await Watch.create(newWatch);

			res.status(200).json(watchList);
		} catch (err) {
			next(err);
		}
	},

	get: async (req, res, next) => {
		const owner = req.payload._id;

		try {
			const watchList = await Watch.findWatch(owner);

			throwError(!watchList, 400, "You still don't have a watch list");

			const portfolio = { fiis: [], stocks: [] };

			await asyncForEach(watchList.fiis, getFiiData, portfolio.fiis);

			if (watchList.stocks.length !== 0) {
				const allStocks = await statusInvest.getStocksInfo();

				portfolio.stocks = allStocks.filter(stock => watchList.stocks.includes(stock.Ativo));
			}

			res.status(200).json(portfolio);
		} catch (err) {
			next(err);
		}
	},

	update: async (req, res, next) => {
		const owner = req.payload._id;

		const { fiis, stocks } = req.body;

		const updateWatchList = { owner, fiis, stocks };

		try {
			if (fiis.length === 0 && stocks.length === 0)
				throwError(true, 400, 'You need at least one fiis and/or stock', 'Updating watch list');

			const watchList = await Watch.update(updateWatchList);

			throwError(!watchList, 400, 'You need a WatchList to update', 'Updating watch list');

			res.status(200).json(watchList);
		} catch (err) {
			next(err);
		}
	},

	delete: async (req, res, next) => {
		const owner = req.payload._id;

		try {
			const { deletedCount } = await Watch.delete(owner);

			throwError(!deletedCount, 400, "You don't have a WatchList", 'Deleting a watchlist');

			res.status(204).json();
		} catch (err) {
			next(err);
		}
	},
};

module.exports = WatchControllers;
