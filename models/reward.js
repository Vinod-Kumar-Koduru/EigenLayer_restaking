const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true },
  totalRewardsReceivedStETH: String,
  rewardsBreakdown: [
    {
      operatorAddress: String,
      amountStETH: String,
      timestamps: [Number],
    },
  ],
  lastUpdated: Number,
});

module.exports = mongoose.model('Reward', rewardSchema);
