const jwt = require('jsonwebtoken');

function JwtService() {
  this.sign = (data) => {
    return jwt.sign(data, 'secret');
  };
  this.verify = (token) => {
    return verify(token, 'secret');
  }
}

module.exports = new JwtService();
