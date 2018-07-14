const BootBot = require('bootbot');

const messengerHooks = require('../hooks/messenger.hooks');

module.exports = {
  /**
   * Will start listening for hooks
   */
  start: () => {
    const bootBot = new BootBot({
      accessToken: process.env.ACCESS_TOKEN,
      verifyToken: process.env.VERIFY_TOKEN,
      appSecret: process.env.APP_SECRET
    });

    messengerHooks.initialize(bootBot);
    bootBot.start();
  }
}