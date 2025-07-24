function startTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}
function checkTime(i) {
  return i < 10 ? "0" + i : i;
}

startTime();

async function getWeather() {
  const CITY = document.getElementById("city").value;

  try {
    const RESPONSE = await fetch(`/weather?city=${encodeURIComponent(CITY)}`);
    const result = await RESPONSE.json();

    if (!RESPONSE.ok) {
      document.getElementById("resultat").textContent =
        `Erreur : ${result?.error || result?.message || "inconnue"}`;
      return;
    }

    const DATA = result.current;
    const DATA2 = result.forecast;

    const DESCRIPTION = DATA.weather[0].description;
    const TEMPERATURE = DATA.main.temp;
    const TEMP_MIN = DATA.main.temp_min;
    const TEMP_MAX = DATA.main.temp_max;
    const HUMIDITY = DATA.main.humidity;

    function getDayName(date) {
      const OPTIONS = { weekday: 'short' };
      return date.toLocaleDateString('fr-FR', OPTIONS);
    }

    let forecastHTML = `
      <div class="carousel-container">
        <button class="carousel-button left" onclick="scrollCarousel(-1)">◀</button>
        <button class="carousel-button right" onclick="scrollCarousel(1)">▶</button>
        <div class="carousel-track" id="carousel-track">
    `;

    // Boucle pour récupérer les différents éléments du forecast pour les mettre dans une div
    for (let i = 0; i < 10; i++) {
      const forecast = DATA2.list[i];
      const DATE = new Date(forecast.dt_txt);
      const DAY = getDayName(DATE);
      const DATE_NUMBER = DATE.getDate();
      const HOUR = DATE.getHours().toString().padStart(2, '0') + "h";
      const TEMP = forecast.main.temp.toFixed(1);
      const DESC = forecast.weather[0].description;
      const ICON_CODE = forecast.weather[0].icon;
      const ICON_URL = `https://openweathermap.org/img/wn/${ICON_CODE}@2x.png`;

      // Affichage des différentes prévisions
      forecastHTML += `
        <div class="forecast-item">
          <div class="forecast-day">${DAY} ${DATE_NUMBER}</div>
          <div class="forecast-hour">${HOUR}</div>
          <img src="${ICON_URL}" alt="${DESC}" width="50" height="50">
          <div class="forecast-temp">${TEMP}°C</div>
          <div class="forecast-desc">${DESC}</div>
        </div>
      `;
    }

    forecastHTML += `</div></div>`;
    document.getElementById("forecast").innerHTML = forecastHTML;

    // Lancement de l'auto-scroll UNE SEULE FOIS, après affichage complet
    startAutoScroll();

    // Ajouter les événements de pause/reprise au survol
  const CARROUSEL_CONTAINER = document.querySelector('.carousel-container');

  CARROUSEL_CONTAINER.addEventListener('mouseenter', stopAutoScroll);
  CARROUSEL_CONTAINER.addEventListener('mouseleave', startAutoScroll);

    document.getElementById("results").textContent =
      `Description : ${DESCRIPTION} 
      \nTemperature : ${TEMPERATURE}°C 
      \nTaux d'humidité: ${HUMIDITY}%`;
    document.getElementById("temperature").textContent =
      `Min : ${TEMP_MIN}°C, Max : ${TEMP_MAX}°C`;
  } catch (error) {
    document.getElementById("results").textContent = `Erreur réseau : ${error}`;
  }
}


let carrouselPosition = 0;
let autoScrollInterval;
const AUTO_SCROLL_DELAY = 3000; // 3 secondes entre chaque défilement automatique

function scrollCarrousel(direction) {
  stopAutoScroll();  // stoppe auto-scroll quand on clique manuel

  const TRACK = document.getElementById("carousel-track");
  const ITEM = TRACK.querySelector(".forecast-item");
  const ITEM_WIDTH = ITEM.offsetWidth + 5; // case + marge
  const VISIBLE_WIDTH = TRACK.parentElement.offsetWidth;
  const TOTAL_ITEMS = TRACK.children.length;
  const TOTAL_WIDTH = TOTAL_ITEMS * ITEM_WIDTH;

  carrouselPosition += direction * ITEM_WIDTH;

  if (carrouselPosition < 0) carrouselPosition = 0;
  if (carrouselPosition > TOTAL_WIDTH - VISIBLE_WIDTH) {
    carrouselPosition = TOTAL_WIDTH - VISIBLE_WIDTH;
  }

  TRACK.style.transform = `translateX(-${carrouselPosition}px)`;
}

function startAutoScroll() {
  const TRACK = document.getElementById("carousel-track");
  const ITEM = TRACK?.querySelector(".forecast-item");

  if (!TRACK || !ITEM) return; // Évite toute erreur si éléments manquants

  autoScrollInterval = setInterval(() => {
    const ITEM_WIDTH = ITEM.offsetWidth + 15; // case + marge
    const VISIBLE_WIDTH = TRACK.parentElement.offsetWidth;
    const TOTAL_ITEMS = TRACK.children.length;
    const TOTAL_WIDTH = TOTAL_ITEMS * ITEM_WIDTH;

    carrouselPosition += ITEM_WIDTH;

    if (carrouselPosition > TOTAL_WIDTH - VISIBLE_WIDTH) {
      carrouselPosition = 0; // revient au début pour loop infini
    }

    TRACK.style.transform = `translateX(-${carrouselPosition}px)`;
  }, AUTO_SCROLL_DELAY);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}