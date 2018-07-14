const bcryptService = require('../services/bcrypt.service');
const jwtService = require('../services/jsonwebtoken.service');
const Train = require('../models/train.model');
const Station = require('../models/station.model');
const Bluebird = require('bluebird');

class TrainService {
  async login(data) {
    const train = await Train.findOne({email: data.email});
    if (!train) throw new Error('Login failed');
    const isPasswordValid = await bcryptService.compareHash(data.password, train.password);
    if (!isPasswordValid) throw new Error('Login failed');
    const token = await jwtService.sign({
      _id: token._id,
      name: token.name
    });
    return { token: token, train: train };
  }
  async getTrains() {
    const trains = await Train.find()
    await Bluebird.map(trains, async (train) => {
      await Bluebird.map(train.destinations, async (destination) => {
        destination.station = await Station.findById(destination.station);
      });
    });
    return trains;
  }
}

module.exports = new TrainService();
