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

  for (const FAV of FAVORITES) {
    try {
      const RESPONSE = await fetch(`/weather?city=${encodeURIComponent(FAV.city)}`);
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
        <strong>${FAV.city}</strong> ${DISPLAY_TEMP}°C
        <img src="${ICON_URL}" alt="Météo" width="50" height="50">
        <button data-city="${FAV.city}">✕</button>
      `;

      CARD.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); // Évite conflit clic sur carte
        removeFavorite(FAV.city);
      });

      CARD.addEventListener('click', () => {
        getWeather(FAV.city);
      });

      CONTAINER.appendChild(CARD);
    } catch (err) {
      console.error(`Erreur lors de la récupération de la météo pour ${FAV.city} :`, err);
    }
  }
}

export function addFavorite(city) {
  const ERROR_CONTAINER = document.getElementById('favorite-error');
  if (ERROR_CONTAINER) ERROR_CONTAINER.textContent = ''; // Réinitialise les erreurs

  let favorites = getFavorites();

  // Limite à 4 favoris
  if (favorites.length >= 4) {
    if (ERROR_CONTAINER) {
      ERROR_CONTAINER.textContent = "Vous ne pouvez avoir que 4 favoris maximum.";
      setTimeout(() => {
        ERROR_CONTAINER.textContent = '';
      }, 5000); // Disparaît après 5 secondes
    }
    return false;
  }

  // Formate la ville : Majuscule + minuscules
  const FORMATTED_CITY = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  // Évite les doublons
  if (favorites.some(fav => fav.city.toLowerCase() === FORMATTED_CITY.toLowerCase())) return false;

  favorites.push({ city: FORMATTED_CITY });
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