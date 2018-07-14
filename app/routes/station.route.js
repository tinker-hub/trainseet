const express = require ('express');
const router = express.Router();
const Station = require('../models/station.model');

// get the list of stations
router.get('/stations', async (req, res, next) => {
  const stations = await Station.find();
  res.send(stations);
});

module.exports = router;
