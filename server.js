import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

// Charge les variables du fichier .env
dotenv.config();

// Initialisation du serveur
const APP = express();
const PORT = 3000;

// Autorise les requêtes depuis d'autres domaines
APP.use(cors());
// Permet de servir les fichiers dans le dossier public
APP.use(express.static('public'));

// Permet de GET les données de l'API
APP.get('/weather', async (req, res) => {
  const CITY = req.query.city;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  // Affiche des messages d'erreurs si la ville n'est pas reconnue ou si l'API n'est pas lisible ou absente
  if (!CITY) {
    return res.status(400).json({ error: 'Ville manquante' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'Clé API manquante' });
  }

  try {
    const URL1 = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=metric&lang=fr`;
    const URL2 = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=metric&lang=fr`;

    // Appelle des deux API en parallèle pour aller plus vite
    const [RES1, RES2] = await Promise.all([fetch(URL1), fetch(URL2)]);
    
    // Vérification des réponses
    if (!RES1.ok) {
      const DATA1 = await RES1.json();
      return res.status(RES1.status).json({ error: DATA1.message || "Erreur API météo" });
    }

    if (!RES2.ok) {
      const DATA2 = await RES2.json();
      return res.status(RES2.status).json({ error: DATA2.message || "Erreur API météo" });
    }

    // Transforme les données fetch en objets JSON exploitables
    const [DATA1, DATA2] = await Promise.all([RES1.json(), RES2.json()]);

    // Envoi de la réponse au client
    res.json({ current: DATA1, forecast: DATA2 });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Lancement du serveur
APP.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});