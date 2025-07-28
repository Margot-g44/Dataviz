import { getFavorites, saveFavorites } from './localStorage.js';
import { getWeather } from './script.js';

// Fonction qui formate la température avec un + devant si positive
function formatTemp(temp) {
  const ROUNDED = Math.round(temp);
  return (ROUNDED > 0 ? '+' : '') + ROUNDED;
}

// Nouvelle version : récupère la température actuelle pour chaque favori
export async function displayFavorites() {
  const CONTAINER = document.getElementById('favorites-container');
  if (!CONTAINER) return;

  const FAVORITES = getFavorites();
  CONTAINER.innerHTML = '<h3>Favoris</h3>';

  if (FAVORITES.length === 0) {
    CONTAINER.innerHTML += '<p>Aucun favori</p>';
    return;
  }

  for (const fav of FAVORITES) {
    try {
      const RESPONSE = await fetch(`/weather?city=${encodeURIComponent(fav.city)}`);
      const RESULT = await RESPONSE.json();

      if (!RESPONSE.ok || !RESULT.current) {
        throw new Error(RESULT.error || RESULT.message || "Erreur inconnue");
      }

      const TEMP = RESULT.current.main.temp;
      const DISPLAY_TEMP = formatTemp(TEMP);

      const ICON = RESULT.current.weather[0].icon;
      const ICON_URL = `https://openweathermap.org/img/wn/${ICON}@2x.png`;

      const CARD = document.createElement('div');
      CARD.className = 'favorite-card';
      CARD.innerHTML = `
        <strong>${fav.city}</strong> ${DISPLAY_TEMP}°C
        <img src="${ICON_URL}" alt="Météo" width="50" height="50">
        <button data-city="${fav.city}">✕</button>
      `;

      CARD.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); // Évite conflit clic sur carte
        removeFavorite(fav.city);
      });

      CARD.addEventListener('click', () => {
        getWeather(fav.city);
      });

      CONTAINER.appendChild(CARD);
    } catch (err) {
      console.error(`Erreur lors de la récupération de la météo pour ${fav.city} :`, err);
    }
  }
}

// Version simplifiée : on ne stocke plus la température
export function addFavorite(city) {
  let favorites = getFavorites();
  if (favorites.some(fav => fav.city.toLowerCase() === city.toLowerCase())) return false;

  favorites.push({ city });
  saveFavorites(favorites);
  displayFavorites();
  return true;
}

export function removeFavorite(city) {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => fav.city.toLowerCase() !== city.toLowerCase());
  saveFavorites(favorites);
  displayFavorites();
}