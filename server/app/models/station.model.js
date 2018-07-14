const mongoose = require('mongoose');
const StationSchema = require('../schemas/station.schema');

module.exports = mongoose.model('Station', StationSchema);
