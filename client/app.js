const url = 'http://localhost:8081';
const socket = io.connect(url);

(async () => {
  const response = await fetch(`${url}/api/trains/`);
  const trains = await response.json();
  console.log(trains[0]);
  socket.emit('train', trains[0]);
})();
