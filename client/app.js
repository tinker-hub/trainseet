const url = 'https://trainseet.tk';
const socket = io.connect(url);
const divCounter = document.getElementById('counter');


(async () => {
  // const response = await fetch(`${url}/api/trains/`);
  // const trains = await response.json();
  // const train = {
  //   location: {
  //     coordinates: [120.980373, 14.6113278]
  //   },
  //   _id: trains[0]._id,
  //   speed: 7.5
  // };
  // socket.emit('train', train);
  // socket.on('eta', (data)=> {
  //   console.log(data);
  // })
  socket.on('density', function (data) {
    divCounter.innerHTML = `density: ${parseInt(data)} %`;
  });
  // const or = document.getElementById('canvas-or');
  // const th = document.getElementById('canvas-th');

  // const orContext = or.getContext('2d');
  // const thContext = th.getContext('2d');

  // let img1 = new Image();

  // let img2 = new Image();

  // // show loading notice
  // orContext.fillStyle = '#333';
  // orContext.fillText('Loading...', or.width/2-30, or.height/3);
  // thContext.fillStyle = '#333';
  // thContext.fillText('Loading...', th.width/2-30, th.height/3);

  // socket.on('frame', function (data) {
  //   img1.onload = function () {
  //     orContext.drawImage(this, 0, 0, or.width, or.height);
  //   };

  //   img1.src = 'data:image/png;base64,' + data.or;
  //   img2.onload = function () {
  //     thContext.drawImage(this, 0, 0, th.width, th.height);
  //   };
  //   img2.src = 'data:image/png;base64,' + data.th;
  // });

})();
