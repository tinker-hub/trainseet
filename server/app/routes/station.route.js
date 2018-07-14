const express = require ('express');
const router = express.Router();
const Station = require('../models/station.model');
const Train = require('../models/train.model');
const trainService = require('../services/train.service');
const _ = require('lodash');

// get the list of stations
router.get('/stations', async (req, res, next) => {
  const stations = await Station.find();
  res.send(stations);
});

// get the list of stations
router.get('/stations/:id', async (req, res, next) => {
  const station = await Station.findById(req.params.id);
  const trains = await trainService.getTrains();
  _.forEach(trains, (train) =>
    train.destinations = _.filter(train.destinations, (destination) => destination.station.name === station.name));
  res.send({ station, trains });
});

module.exports = router;
