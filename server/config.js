module.exports = {
  twitter: {
    consumer_key: process.env.CONSUMER_KEY || 'LkSQyLF0euUgDUdGseEBctIsj',
    consumer_secret: process.env.CONSUMER_SECRET || 'CnkLPhQJwwUnoSQSkq52DyDDeiU9zmY4DyOpHdT9fIGeZIaKdL',
    access_token_key: process.env.ACCESS_TOKEN_KEY || '1018276019462029312-B25lf6iC9u1iajhBJD0FkC502mVbEc',
    access_token_secret: process.env.ACCESS_TOKEN_SECRET || 'ucmOTZaBxDNb97WClB0edSzs2dfmjmPbLa6NRoGljdNyG'
  },
  streamTracks: [ // standard account can only stream one track
    // 'from:officialLRT1',
    '@officialLRT1'
  ]
}