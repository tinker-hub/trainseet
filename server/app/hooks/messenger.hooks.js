const request = require('request');
const _ = require('lodash');

const botDialogs = require('../data/bot-dialogs');

module.exports = {
  initialize: (bootBot) => {
    bootBot.setGreetingText(botDialogs.greeting);

    bootBot.hear(botDialogs.basic.intents, async (payload, chat) => {
      const user = await chat.getUserProfile();
      chat.say(stringReplacer(botDialogs.basic.response, user.first_name));
    });

    bootBot.hear(botDialogs.help.intent, (payload, chat) => {
      chat.say(botDialogs.help.response, { typing: true });
    });

    bootBot.hear(botDialogs.quick.intent, (payload, chat) => {
      chat.say({
        text: botDialogs.quick.response.text,
        quickReplies: ['red', 'blue', 'yellow']
      });
    });

    bootBot.hear(botDialogs.eta.trainArrival.intents, (payload, chat) => {
      console.log('payload', payload);
      chat.say(botDialogs.eta.trainArrival.response, { typing: true });
    });

    bootBot.hear(botDialogs.density.intents, (payload, chat) => {
      chat.conversation((convo) => {
        const ask = {
          question: 'What station are you in?',
          answer: (payload, convo, data) => {
            const station = payload.message.text;
            
            convo.say('Please wait');

            request('http://2e3781ba.ngrok.io/api/density', (err, response, body) => {
              if (!body) body = `{"0":0,"density":15}`;
              const density = parseInt(JSON.parse(body).density);
              const densityMock = [
                { station: 'Edsa', density: 60, status: 'HIGH' },
                { station: 'Doroteo Jose', density: 20, status: 'LIGHT' },
                { station: 'Monumento', density: 40, status: 'MODERATE' }
              ];
              const statuses = {
                LIGHT: 'As of now, there are a few people in ${station}',
                MODERATE: 'As of now, there are moderate people in ${station}',
                HIGH: 'As of now, there are a lot of people in ${station}'
              };
              const status = density <= 20 ? 
                statuses.LIGHT : density >= 21 && density <= 60 ? 
                statuses.MODERATE : density >= 61 ? 
                statuses.HIGH : statuses.LIGHT;
              convo.say(status.replace('${station}', station));
              convo.end();
            });
          },
          options: {
            typing: true
          }
        };
        convo.ask(ask.question, ask.answer, () => {}, ask.options);
      });
    });
  }
}

function stringReplacer(stringToReplace, value) {
  return stringToReplace.replace('%@', value);
}