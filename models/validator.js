const mongoose = require('mongoose');

const validatorSchema = new mongoose.Schema({
  operatorAddress: { type: String, unique: true },
  totalDelegatedStakeStETH: String,
  slashHistory: [
    {
      timestamp: Number,
      amountStETH: String,
      reason: String,
    },
  ],
  status: String,
  lastUpdated: Number,
});

module.exports = mongoose.model('Validator', validatorSchema);
