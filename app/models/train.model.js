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

const trainSchema = new Schema({
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
  speed: {
    type: Number
  },
  location: GeoSchema
});

module.exports = mongoose.model('Train', trainSchema);
