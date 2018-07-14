const _ = require('lodash');

const stations = require('./station');

module.exports = {
  greeting: 'Hello there, Train Seet can help you get the ETA arrival of the train at your place. Just type help for more information.',
  basic: {
    intents: [
      'hi',
      'hello',
      'hey',
      'sup'
    ],
    response: 'Hey %@, How are you today?'
  },
  help: {
    intent: 'Help',
    response: 'Here are the following commands for use.'
  },
  quick: {
    intent: "quick",
    response: {
      text: "Which station are you taking?",
      quickReplies: _.map(stations, 'name')
    }
  }
}