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
    const DESCRIPTION2 = DATA2.list[1].weather[0].description;
    const DATE = DATA2.list[1].dt_txt;
    const TEMPERATURE = DATA.main.temp;
    const TEMP_MIN = DATA.main.temp_min;
    const TEMP_MAX = DATA.main.temp_max;
    const HUMIDITY = DATA.main.humidity;

    document.getElementById("resultat").textContent =
      `Description : ${DESCRIPTION}, Température : ${TEMPERATURE}°C, Taux d'humidité: ${HUMIDITY}%`;
    document.getElementById("Températures").textContent =
      `Min : ${TEMP_MIN}°C, Max : ${TEMP_MAX}°C`;
    document.getElementById("Prévisions").textContent =
      `Prévisions : ${DESCRIPTION2}, ${DATE}`;
  } catch (error) {
    document.getElementById("resultat").textContent = `Erreur réseau : ${error}`;
  }
}