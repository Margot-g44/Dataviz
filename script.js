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
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
 
startTime();
  
async function getWeather() {
  const API_KEY = "f726ef78e6b1a9b2d37393a7d1aef3db";
  const CITY = document.getElementById("city").value;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=metric&lang=fr`; // API pour la météo en temps réel
  const URL2 = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=metric&lang=fr`; // API pour une durée de 5 jours avec un affichage toutes les 3h

  try {
    const RESPONSE = await fetch(URL);
    const RESPONSE2 = await fetch(URL2);
    const DATA = await RESPONSE.json();
    const DATA2 = await RESPONSE2.json();

      if (RESPONSE.ok) {
        const DESCRIPTION = DATA.weather[0].description;
        const DESCRIPTION2 = DATA2.list[1].weather[0].description;
        const DATE = DATA2.list[1].dt_txt;
        const TEMPERATURE = DATA.main.temp;
        const TEMP_MIN = DATA.main.temp_min;
        const TEMP_MAX = DATA.main.temp_max;
        const HUMIDITY = DATA.main.humidity;             
        
  // Affiche le résultat dans l'élément HTML avec id "resultat"
        
        document.getElementById("resultat").textContent = `Description : ${DESCRIPTION}, Température : ${TEMPERATURE}°C, Taux d'humidité: ${HUMIDITY}%`;
        
        document.getElementById("Températures").textContent = `Température minimale : ${TEMP_MIN}°C, Température maximale : ${TEMP_MAX}°C`;
        
        document.getElementById("Prévisions").textContent = `Prévisions : ${DESCRIPTION2},  ${DATE}`
      } else {
        document.getElementById("resultat").textContent = `Erreur : ${DATA.message}`;
      }
  } catch (error) {
      document.getElementById("resultat").textContent = `Erreur réseau : ${error}`;
  }
}