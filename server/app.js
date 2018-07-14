const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
const Bluebird = require('bluebird');

const Train = require('./app/models/train.model');
const Station = require('./app/models/station.model');
const bootBot = require('./app/bootbot/index');

const geoService = require('./app/services/geo.service');

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
app.use(bodyParser.urlencoded({extended: false}));

// initialize routes
app.use('/api', require('./app/routes/train.route'));
app.use('/api', require('./app/routes/station.route'));
app.use(require('./app/routes/webhook.route'));
app.use(express.static('./client'));

app.get('*', (req, res) => {
	res.sendFile('index.html', { root: './client' });
});

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
    if (train.location && train.location.coordinates) {
      await Bluebird.map(train.destinations, async (destination) => {
        const station = await Station.findById(destination.station);
        const distance = geoService.computeDistance(train.location.coordinates, station.location.coordinates);
        destination.eta = train.speed ? distance / train.speed : 0;
      }, { concurrency: 10 });
      train.save();    
    }
    socket.emit('eta', train.toJSON());
    // train.set({
    //   direction: data.direction,
    //   location: data.location,
    //   speed: data.speed
    // });

    // await train.save();
    // const destination = await Station.findOne().sort({
    //   index: train.direction === 'N' ? 'asc' : 'desc'
    // }).exec();
    // const distance = Math.sqrt(((train.location[0] - destination.location[0])) + ((train.location[1] - destination.location[1])))
    // const eta = distance / train.speed;
    // socket.emit('eta', eta);
  });
});

(async () => {
  let stations = require('./app/data/station.json');
  let trains = require('./app/data/train.json');
  await Station.deleteMany();
  await Station.create(stations);
  stations = await Station.find();
  trains.forEach(train => {
    train.destinations = [];
    stations.forEach(station => train.destinations.push({ station: station._id }));
  });
  console.dir(trains[0]);
  await Train.deleteMany();
  await Train.create(trains);
  console.log(await Station.find().exec());
  console.log(await Train.find().exec());
})();

bootBot.start();
