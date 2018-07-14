const botDialogs = require('../data/bot-dialogs');

module.exports = {
  initialize: (bootBot) => {
    bootBot.setGreetingText(botDialogs.greeting);

    bootBot.hear(botDialogs.basic.intents, async (payload, chat) => {
      const user = await chat.getUserProfile();
      chat.say(stringReplacer(botDialogs.basic.response, user.first_name));
    });

    bootBot.hear(botDialogs.help.intent, (payload, chat) => {
      chat.say(botDialogs.help.response);
    });

    bootBot.hear(botDialogs.quick.intent, (payload, chat) => {
      chat.say(botDialogs.quick.response);
    });
  }
}

function stringReplacer(stringToReplace, value) {
  return stringToReplace.replace('%@', value);
}