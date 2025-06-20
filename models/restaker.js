const mongoose = require('mongoose');

const restakerSchema = new mongoose.Schema({
  userAddress: { type: String, unique: true },
  amountRestakedStETH: String,
  targetAVSOperatorAddress: String,
  lastUpdated: Number,
});

module.exports = mongoose.model('Restaker', restakerSchema);
