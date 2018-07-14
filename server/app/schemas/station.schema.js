const mongoose = require('mongoose');

const GeoSchema = require('./geo.schema');

const StationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  location: GeoSchema
});

module.exports = StationSchema;