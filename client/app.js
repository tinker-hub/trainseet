const url = 'http://localhost:8081';
const socket = io.connect(url);

(async () => {
  const response = await fetch(`${url}/api/trains/`);
  const trains = await response.json();
  const train = {
    location: {
      coordinates: [120.980373, 14.6113278]
    },
    _id: trains[0]._id,
    speed: 7.5
  };
  socket.emit('train', train);
  socket.on('eta', (data)=> {
    console.log(data);
  })
})();
