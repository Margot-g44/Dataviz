import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'Ville manquante' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Clé API manquante' });
  }

  try {
    const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`;
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`;

    const [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);
    
    if (!res1.ok) {
      const data1 = await res1.json();
      return res.status(res1.status).json({ error: data1.message || "Erreur API météo" });
    }

    if (!res2.ok) {
      const data2 = await res2.json();
      return res.status(res2.status).json({ error: data2.message || "Erreur API météo" });
    }

    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

    res.json({ current: data1, forecast: data2 });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});