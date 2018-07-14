const Bluebird = require('bluebird');
const Station = require('../models/station.model');
const stations = require('../data/station.json');

(async () => {
  await Bluebird.map(stations, async (station, index) => {
    station.position = index;
    await Station.create(station);
  });
  console.log(await Station.find().exec());
})();
