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
      quickReplies: _.map(stations, 'name').splice(0, 3)
    }
  },
  eta: {
    trainArrival: {
      intents: [
        'What time will the train arrive?'
      ],
      response: 'What is your current station?'
    }
  },
  density: {
    intents: [
      '\bWhat is the current situation in\b',
      'current situation'
    ],
    response: 'Test'
  },
  salamat: {
    intents: [
      'thank you',
      'thanks',
      'ty'
    ],
    response: `You're welcome, %@`
  }
}