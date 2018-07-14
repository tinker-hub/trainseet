const mongoose = require('mongoose');

const StationSchema = require('./station.schema');

const DestinationSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Station'
  },
  eta: {
    type: Number
  }
}, { _id: false });

module.exports = DestinationSchema;
