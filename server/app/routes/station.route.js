const express = require ('express');
const router = express.Router();
const Station = require('../models/station.model');

// get the list of stations
router.get('/stations', async (req, res, next) => {
  const stations = await Station.find();
  res.send(stations);
});

// get the list of stations
router.get('/stations/:id', async (req, res, next) => {
  const station = await Station.findById(req.params.id);
  res.send(station);
});

module.exports = router;
