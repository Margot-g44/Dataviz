function startTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML =
  "Heure local : "+h + ":" + m + ":" + s;
  let t = setTimeout(startTime, 1000);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
 
startTime();
  
async function getWeather() {
  const API_KEY = "f726ef78e6b1a9b2d37393a7d1aef3db";
  const CITY = document.getElementById("city").value;
  // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=metric&lang=fr`; API pour la météo en temps réel
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=metric&lang=fr`; // API pour une durée de 5 jours avec un affichage toutes les 3h

  try {
    const RESPONSE = await fetch(URL);
    const DATA = await RESPONSE.json();

      if (RESPONSE.ok) {
        document.getElementById("resultat").textContent = JSON.stringify(DATA, null, 2);
      } else {
        document.getElementById("resultat").textContent = `Erreur : ${DATA.message}`;
      }
    } catch (error) {
    document.getElementById("resultat").textContent = `Erreur réseau : ${error}`;
  }
}