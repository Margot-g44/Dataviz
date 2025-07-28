import { getFavorites, saveFavorites } from './localStorage.js';

// Fonction qui formate la température avec un + devant si positive
function formatTemp(temp) {
  const ROUNDED = Math.round(temp);
  return (ROUNDED > 0 ? '+' : '') + ROUNDED;
}

// Nouvelle version : récupère la température actuelle pour chaque favori
export async function displayFavorites() {
  const CONTAINER = document.getElementById('favorites-container');
  if (!CONTAINER) return;

  const favorites = getFavorites();
  CONTAINER.innerHTML = '<h3>Favoris</h3>';

  if (favorites.length === 0) {
    CONTAINER.innerHTML += '<p>Aucun favori</p>';
    return;
  }

  for (const fav of favorites) {
    try {
      const RESPONSE = await fetch(`/weather?city=${encodeURIComponent(fav.city)}`);
      const RESULT = await RESPONSE.json();

      if (!RESPONSE.ok || !RESULT.current) {
        throw new Error(RESULT.error || RESULT.message || "Erreur inconnue");
      }

      const TEMP = RESULT.current.main.temp;
      const DISPLAY_TEMP = formatTemp(TEMP);

      const CARD = document.createElement('div');
      CARD.className = 'favorite-card';
      CARD.innerHTML = `
        <strong>${fav.city}</strong> ${DISPLAY_TEMP}°C
        <button data-city="${fav.city}">✕</button>
      `;
      CARD.querySelector('button').addEventListener('click', () => removeFavorite(fav.city));
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