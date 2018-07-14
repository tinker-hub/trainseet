const express = require ('express');
const router = express.Router();
const Train = require('../models/train.model');
const Station = require('../models/station.model');
const Bluebird = require('bluebird');
const trainService = require('../services/train.service');

// get the list of trains
router.get('/trains', async (req, res, next) => {
  const trains = await trainService.getTrains();
  res.send(trains);
});

router.get('/trains/:id', async (req, res, next) => {
  const train = await Train.findById(req.params.id);
  res.send(train);
});

module.exports = router;
