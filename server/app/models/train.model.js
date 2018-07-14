const mongoose = require('mongoose');
const TrainSchema = require('../schemas/train.schema');

module.exports = mongoose.model('Train', TrainSchema);
