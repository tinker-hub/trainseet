const Station = require('../models/station.model');

(async () => {
  await Station.deleteMany();
  await Station.create(
    [
      {
        "name": "Baclaran",
        "location": {
          "coordinates": [ 120.997793, 14.5342872 ]
        }
      },
      {
        "name": "Edsa",
        "location": {
          "coordinates": [ 120.998564, 14.5391672 ]
        }
      }
    ]
    
  )
})()