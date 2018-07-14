const express = require ('express');
const router = express.Router();
const Train = require('../models/train.model');

// get the list of trains
router.get('/trains', async (req, res, next) => {
  const trains = await Train.find();
  res.send(trains);
});

router.get('/trains/:id', async (req, res, next) => {
  const id = req.params.id;
  const train = await Train.findById(id);
  res.send(train);
});

module.exports = router;
