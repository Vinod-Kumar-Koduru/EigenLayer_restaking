const express = require('express');
const router = express.Router();
const Restaker = require('../models/restaker');

router.get('/', async (req, res) => {
  try {
    const restakers = await Restaker.find();
    res.json(restakers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
