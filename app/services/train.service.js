const bcryptService = require('../services/bcrypt.service');
const jwtService = require('../services/jsonwebtoken.service');
const Train = require('../models/train.model');

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
}

module.exports = new TrainService();
