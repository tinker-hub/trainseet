const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
const Bluebird = require('bluebird');
const Twitter = require('twitter');
const _ = require('lodash');
const cv = require('opencv4nodejs');
const utils = require('./utils');
const path = require('path');

const Train = require('./app/models/train.model');
const Station = require('./app/models/station.model');
const bootBot = require('./app/bootbot/index');

const geoService = require('./app/services/geo.service');
const config = require('./config');

const port = 8080;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const bgSubtractor = new cv.BackgroundSubtractorMOG2();
const capture = new cv.VideoCapture(path.resolve('data', 'output.mp4'));
const client = new Twitter(config.twitter);
let density;

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

app.get('', (req, res) => {
	res.sendFile('index.html', { root: './client' });
});

// error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.get('/api/density', (req, res) => {
  return res.status(200).json({density: density});
})

server.listen(port, async () => {
  console.log(`server listening on port ${port}`);
});


// const streamTo = (trackFilter = '', streamHandler = (err, tweet) => {}) => {
//   console.log('trackFilter', trackFilter);
//   client.stream('statuses/filter', { track: trackFilter }, (stream) => {
//     stream.on('data', (tweet) => {
//       streamHandler(null, tweet);
//     });
//     stream.on('error', (error) => {
//       streamHandler(error);
//     });
//   });
// };

io.on('connection', async (socket) => {

  // streamTo(config.streamTracks[0], (err, tweet) => {
  //   console.log('err', err);
  //   if (err) return err;
  //   const data = _.pick(tweet, ['text', 'created_at', 'user.name', 'user.screen_name', 'user.profile_image_url', 'user.profile_image_url_https']);
  //   socket.emit('tweet', { data });
  // });

  socket.on('train', async (data) => {
    console.log(data);
    const train = await Train.findById(data._id);
    train.set({
      direction: data.direction,
      location: data.location,
      speed: data.speed
    });
    if (data.location && data.location.coordinates) {
      await Bluebird.map(train.destinations, async (destination) => {
        const station = await Station.findById(destination.station);
        let distance = geoService.computeDistance(train.location.coordinates, station.location.coordinates);
        distance = distance * 1000 * 100; // convert to meters
        destination.eta = train.speed ? distance / train.speed : 0;
      }, { concurrency: 10 });
      await train.save();
    }
    socket.emit('eta', train);
  });

  let baseFrame;
	utils.grabFrames(capture, 1, (frame) => {
		if(!baseFrame) baseFrame = utils.preprocessedFrame(frame)
		const subtractedFrame = baseFrame.absdiff(utils.preprocessedFrame(frame));
		const blurred = subtractedFrame.blur(new cv.Size(12, 12));
		const thresholded = blurred.threshold(15, 255, 0);
		density = (thresholded.countNonZero() / (480 * 640) ) * 100;
    socket.emit('density', density);
    // socket.emit('frame', {
    //   or: cv.imencode('.jpg', frame).toString('base64'), 
    //   th: cv.imencode('.jpg', thresholded).toString('base64')
    // });
		// cv.imshow('thresholded', thresholded);
	});
});

// (async () => {
//   let stations = require('./app/data/station.json');
//   let trains = require('./app/data/train.json');
//   await Station.deleteMany();
//   await Station.create(stations);
//   stations = await Station.find();
//   trains.forEach(train => {
//     train.destinations = [];
//     stations.forEach(station => train.destinations.push({ station: station._id }));
//   });
//   console.dir(trains[0]);
//   await Train.deleteMany();
//   await Train.create(trains);
//   console.log(await Station.find().exec());
//   console.log(await Train.find().exec());
// })();


bootBot.start();
