const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
const Bluebird = require('bluebird');

const Train = require('./app/models/train.model');
const Station = require('./app/models/station.model');
const bootBot = require('./app/bootbot/index');

const port = 8081;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// /**
//  * Put .env into process.env
//  */
dotenv.config();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/lrt', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./app/routes/train.route'));
app.use('/api', require('./app/routes/station.route'));
app.use(require('./app/routes/webhook.route'));

// error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

server.listen(port, async () => {
  console.log(`server listening on port ${port}`);
});

io.on('connection', async (socket) => {
  socket.on('train', async (data) => {
    const train = await Train.findById(data._id);
    train.set({
      direction: data.direction,
      location: data.location,
      speed: data.speed
    });
    await train.save();
    const destination = await Station.findOne().sort({
      index: train.direction === 'N' ? 'asc' : 'desc'
    }).exec();
    const distance = Math.sqrt(((train.location[0] - destination.location[0])) + ((train.location[1] - destination.location[1])))
    const eta = distance / train.speed;
    socket.emit('eta', eta);
  });
});

(async () => {
  const stations = require('./app/data/station.json');
  const trains = require('./app/data/train.json');
  await Station.deleteMany();
  await Station.create(stations);
  await Train.deleteMany();
  await Train.create(trains);
  console.log(await Station.find().exec());
})();

bootBot.start();
