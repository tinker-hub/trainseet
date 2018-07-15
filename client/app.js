const url = 'http://178.128.63.0:8081/';
const socket = io.connect(url);

(async () => {
  const response = await fetch(`${url}/api/trains/`);
  const trains = await response.json();
  const train1 = {
    location: {
      coordinates: [120.980373, 14.6113278]
    },
    _id: trains[0]._id,
    speed: 7.5
  };
  const train2 = {
    location: {
      coordinates: [120.980373, 14.6113278]
    },
    _id: trains[0]._id,
    speed: 7.5
  };
  socket.emit('train', train1);

  socket.emit('train', train2);
  socket.on('eta', (data)=> {
    console.log(data);
  })
})();
