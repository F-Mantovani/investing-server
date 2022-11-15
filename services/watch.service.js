const WatchList = require('../models/WatchList.model');

const Watch = {
	create: async ({ fiis, stocks, owner }) => await WatchList.create({ fiis, stocks, owner }),

	update: async ({ owner, fiis, stocks }) => await WatchList.findOneAndUpdate({ owner }, { fiis, stocks }, { new: true, runValidators: true }),

	findWatch: async owner => await WatchList.findOne({ owner }),

	delete: async owner => await WatchList.deleteOne({ owner }),
};

module.exports = Watch;
