const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
  type: {
      type: String,
      default: 'Point'
  },
  coordinates: {
      type: [Number],
      index: '2dsphere'
  }
}, { _id: false });

module.exports = GeoSchema;
