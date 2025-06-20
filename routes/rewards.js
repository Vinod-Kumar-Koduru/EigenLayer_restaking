const express = require('express');
const router = express.Router();
const Reward = require('../models/reward');

router.get('/:address', async (req, res) => {
  try {
    const reward = await Reward.findOne({ walletAddress: req.params.address });
    if (!reward) return res.status(404).json({ msg: 'no reward' });
    res.json(reward);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
