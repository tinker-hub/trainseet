module.exports = {
  twitter: {
    consumer_key: process.env.CONSUMER_KEY || 'aj3C4YAvhoZ8tyx211X20dOyZ',
    consumer_secret: process.env.CONSUMER_SECRET || 'B43Vehn1m9m6qMERc7e70gzuPR8VzWIf9RYBCPbamNYCHiAExr',
    access_token_key: process.env.ACCESS_TOKEN_KEY || '1018297745256222720-oRBxVHR3Uqyi8YAaiOi1QyyEQSnRIc',
    access_token_secret: process.env.ACCESS_TOKEN_SECRET || 'Jyb3PEXFgdhNzZ4nkmu9qcW5DfmlbyfkKeKKtVGkKj6ES'
  },
  streamTracks: [ // standard account can only stream one track
    // 'from:officialLRT1',
    '@officialLRT1'
  ]
}