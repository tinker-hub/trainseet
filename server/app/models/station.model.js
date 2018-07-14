const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
      type: String,
      default: 'Point'
  },
  coordinates: {
      type: [Number],
      index: '2dsphere'
  }
});

const stationSchema = new Schema({
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

module.exports = mongoose.model('Station', stationSchema);
