const dotenv = require('dotenv');
dotenv.config();
const Web3 = require('web3').Web3;
const axios = require('axios');
const mongoose = require('mongoose');
const Restaker = require('../models/restaker');
const Validator = require('../models/validator');
const Reward = require('../models/reward');

let request, gql;
(async () => {
  ({ request, gql } = await import('graphql-request'));
})();

const web3 = new Web3(process.env.RPC_URL);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const delegationManagerABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'delegator', type: 'address' },
      { indexed: true, name: 'operator', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ],
    name: 'Delegated',
    type: 'event',
  },
];

const contractAddress = '0x93c4b944D05dfe6df7645A86cd2206016c51564D';
const contract = new web3.eth.Contract(delegationManagerABI, contractAddress);

async function fetchDelegatedEvents() {
  const events = await contract.getPastEvents('Delegated', {
    fromBlock: 18000000,
    toBlock: 'latest',
  });

  for (const e of events) {
    const { delegator, operator, amount } = e.returnValues;
    await Restaker.findOneAndUpdate(
      { userAddress: delegator },
      {
        userAddress: delegator,
        amountRestakedStETH: web3.utils.fromWei(amount),
        targetAVSOperatorAddress: operator,
        lastUpdated: Date.now(),
      },
      { upsert: true }
    );
  }
  console.log('Delegation data updated.');
}

async function fetchValidatorData() {
  const headers = { Authorization: `Bearer ${process.env.RATED_API_KEY}` };
  const response = await axios.get('https://api.rated.network/v1/eigenlayer/rewards/operator', { headers });

  for (const v of response.data) {
    await Validator.findOneAndUpdate(
      { operatorAddress: v.operator_address },
      {
        operatorAddress: v.operator_address,
        totalDelegatedStakeStETH: v.total_delegated_steth,
        slashHistory: v.slashing_events || [],
        status: v.status,
        lastUpdated: Date.now(),
      },
      { upsert: true }
    );
  }
  console.log('Validator data updated.');
}

async function fetchRewardData(walletAddress) {
  const headers = { Authorization: `Bearer ${process.env.RATED_API_KEY}` };
  const response = await axios.get(`https://api.rated.network/v1/eigenlayer/rewards/delegator?address=${walletAddress}`, { headers });

  await Reward.findOneAndUpdate(
    { walletAddress },
    {
      walletAddress,
      totalRewardsReceivedStETH: response.data.total_rewards_received,
      rewardsBreakdown: response.data.rewards_breakdown || [],
      lastUpdated: Date.now(),
    },
    { upsert: true }
  );
  console.log('Reward data updated.');
}

// Uncomment to execute:
fetchDelegatedEvents();
//fetchValidatorData();
//fetchRewardData('0x1234...');
