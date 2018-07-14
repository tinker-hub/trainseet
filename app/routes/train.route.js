const express = require ('express');
const router = express.Router();
const Train = require('../models/train.model');

// get the list of trains
router.get('/trains', async (req, res, next) => {
  const trains = await Train.find();
  res.send(trains);
});

router.get('/train/:id', async (req, res, next) => {
  const id = req.param.id;
  return Train.findById(id);
});

module.exports = router;
