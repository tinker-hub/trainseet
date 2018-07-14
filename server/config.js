module.exports = {
  twitter: {
    consumer_key: process.env.CONSUMER_KEY || '4hjMHohOn25PyE39KIu4BcuEC',
    consumer_secret: process.env.CONSUMER_SECRET || 'f9MVoal6tiIla62tZOrPKlzmJG4UYwxbfM3Otwsl7LkENcK9Jv',
    access_token_key: process.env.ACCESS_TOKEN_KEY || '1018262954540613632-DXldK62iecNrfto9H4LkALvzZ9DTip',
    access_token_secret: process.env.ACCESS_TOKEN_SECRET || 'NtrJJYot7t7uX4xQUbMNoyrp8BgIcE4EG7aMLirBu6bDX'
  },
  streamTracks: [ // standard account can only stream one track
    // 'from:officialLRT1',
    '@officialLRT1'
  ]
}