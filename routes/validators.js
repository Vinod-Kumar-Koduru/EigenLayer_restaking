const express = require('express');
const router = express.Router();
const Validator = require('../models/validator');

router.get('/', async (req, res) => {
  try {
    const validators = await Validator.find();
    res.json(validators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
