const { Schema, model } = require('mongoose');

const watchSchema = new Schema({
		fiis: [{ 
			type: String,
			trim: true,
		}],
		stocks: [{ 
			type: String,
			trim: true,
		}],
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	});

const WatchList = model('WatchList', watchSchema);
module.exports = WatchList;
