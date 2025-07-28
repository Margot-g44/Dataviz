import { getFavorites, saveFavorites } from './localStorage.js';
import { displayFavorites, addFavorite, removeFavorite } from './favorites.js';

window.addEventListener("load", () => {
  displayFavorites();
  startTime();
});

function startTime() {
  const NOW = new Date();
  const H = String(NOW.getHours()).padStart(2, '0');
  const M = String(NOW.getMinutes()).padStart(2, '0');
  const S = String(NOW.getSeconds()).padStart(2, '0');
  document.getElementById('time').textContent = `${H}:${M}:${S}`;
  setTimeout(startTime, 1000);
}

export async function getWeather() {
  const CITY_INPUT = document.getElementById("city").value.trim();
  if (!CITY_INPUT) return alert("Veuillez entrer une ville");

  try {
    const RESPONSE = await fetch(`/weather?city=${encodeURIComponent(CITY_INPUT)}`);
    const RESULT = await RESPONSE.json();
    console.log('API response:', RESULT);
    if (!RESPONSE.ok) {
      showError(RESULT.error || RESULT.message || "Erreur inconnue");
      return;
    }

    const CURRENT = RESULT.current;
    const FORECAST = RESULT.forecast;
    const TEMP_DIV = document.getElementById("temperature");

    // Affichage météo actuelle
    TEMP_DIV.style.display = "block";
    TEMP_DIV.innerHTML = `
      <h2>${CITY_INPUT}</h2>
      <div>Description : ${CURRENT.weather[0].description}</div>
      <div>Humidité : ${CURRENT.main.humidity}%</div>
      <div>Min : ${CURRENT.main.temp_min}°C, Max : ${CURRENT.main.temp_max}°C</div>
      <img src="https://openweathermap.org/img/wn/${CURRENT.weather[0].icon}@2x.png"
           alt="${CURRENT.weather[0].description}" width="50" height="50" />
    `;

    // Bouton favoris
    const FAVORITES = getFavorites();
    const IS_FAV = FAVORITES.some(f => f.city.toLowerCase() === CITY_INPUT.toLowerCase());

    if (!IS_FAV) {
      const BTN = document.createElement("button");
      BTN.textContent = "Ajouter aux favoris";
      BTN.className = "add-fav-button";
      BTN.addEventListener("click", () => {
        addFavorite(CITY_INPUT);
        BTN.remove();
      });
      TEMP_DIV.appendChild(BTN);
    }

    document.getElementById("results").style.display = "none";

    // Prévisions météo
    const FORECAST_DIV = document.getElementById("forecast");
    if (FORECAST && FORECAST.list.length) {
      FORECAST_DIV.style.display = "block";

      let forecastHTML = `
        <h3>Prévisions à venir</h3>
        <div class="carousel-container">
          <button class="carousel-button left" onclick="scrollCarousel(-1)">◀</button>
          <div class="carousel-track" id="carousel-track">
      `;

      FORECAST.list.slice(0, 10).forEach(item => {
        const DATE = new Date(item.dt_txt);
        const DAY = DATE.toLocaleDateString('fr-FR', { weekday: 'short' });
        const HOUR = DATE.getHours().toString().padStart(2, '0') + "h";
        const TEMP = item.main.temp.toFixed(1);
        const DESC = item.weather[0].description;
        const ICON = item.weather[0].icon;
        const ICON_URL = `https://openweathermap.org/img/wn/${ICON}@2x.png`;

        forecastHTML += `
          <div class="forecast-item">
            <div class="forecast-day">${DAY}</div>
            <div class="forecast-hour">${HOUR}</div>
            <img src="${ICON_URL}" alt="${DESC}" width="50" height="50" />
            <div class="forecast-temp">${TEMP}°C</div>
            <div class="forecast-desc">${DESC}</div>
          </div>
        `;
      });

      forecastHTML += `
          </div>
          <button class="carousel-button right" onclick="scrollCarousel(1)">▶</button>
        </div>
      `;

      FORECAST_DIV.innerHTML = forecastHTML;
      startAutoScroll();

      const CONTAINER = FORECAST_DIV.querySelector(".carousel-container");
      CONTAINER.addEventListener("mouseenter", stopAutoScroll);
      CONTAINER.addEventListener("mouseleave", startAutoScroll);
    }

  } catch (err) {
    showError(`Erreur réseau : ${err.message}`);
  }
}

function showError(msg) {
  document.getElementById("results").style.display = "block";
  document.getElementById("results").textContent = msg;
  document.getElementById("temperature").style.display = "none";
  document.getElementById("forecast").style.display = "none";
}

// ----- Carrousel -----

let carouselPosition = 0;
let autoScrollInterval;
const AUTO_SCROLL_DELAY = 3000;

window.scrollCarousel = function(direction) {
  stopAutoScroll();

  const TRACK = document.getElementById("carousel-track");
  const ITEM = TRACK?.querySelector(".forecast-item");
  if (!TRACK || !ITEM) return;

  const ITEM_WIDTH = ITEM.offsetWidth + 15;
  const VISIBLE_WIDTH = TRACK.parentElement.offsetWidth;
  const TOTAL_WIDTH = TRACK.scrollWidth;

  carouselPosition += direction * ITEM_WIDTH;
  carouselPosition = Math.max(0, Math.min(carouselPosition, TOTAL_WIDTH - VISIBLE_WIDTH));
  TRACK.style.transform = `translateX(-${carouselPosition}px)`;
};

function startAutoScroll() {
  const TRACK = document.getElementById("carousel-track");
  const ITEM = TRACK?.querySelector(".forecast-item");
  if (!TRACK || !ITEM) return;

  const ITEM_WIDTH = ITEM.offsetWidth + 15;
  const VISIBLE_WIDTH = TRACK.parentElement.offsetWidth;
  const TOTAL_WIDTH = TRACK.scrollWidth;

  autoScrollInterval = setInterval(() => {
    carouselPosition += ITEM_WIDTH;
    if (carouselPosition >= TOTAL_WIDTH - VISIBLE_WIDTH) {
      carouselPosition = 0;
    }
    TRACK.style.transform = `translateX(-${carouselPosition}px)`;
  }, AUTO_SCROLL_DELAY);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Expose global
window.getWeather = getWeather;