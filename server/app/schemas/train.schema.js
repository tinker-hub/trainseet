const mongoose = require('mongoose');

const GeoSchema = require('./geo.schema');
const DestinationSchema = require('./destination.schema');

const TrainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  direction: {
    type: String,
    enum: ['N', 'S']
  },
  status: {
    type: String,
    enum: ['on', 'off']
  },
  speed: {
    type: Number
  },
  destinations: [DestinationSchema],
  location: GeoSchema
});

module.exports = TrainSchema;
