// Sélection du canevas SVG dans lequel tout sera dessiné
const SVG = d3.select("#sky");

// Définition des dimensions du canevas et des marges intérieures
const WIDTH = 800;
const HEIGHT = 250;
const MARGIN = { top: 40, bottom: 15, left: 50, right: -400 };

// Création d'une échelle horizontale : convertit l'heure (de 0 à 23) en position en pixels
const SCALE_X = d3.scaleLinear()
  .domain([0, 23])
  .range([MARGIN.left, WIDTH - MARGIN.right]);

// Création d'une échelle verticale : convertit une hauteur (de 0 à 1) en position en pixels
const SCALE_Y = d3.scaleLinear()
  .domain([0, 1])
  .range([HEIGHT - MARGIN.bottom, MARGIN.top]);

// Génération des données pour tracer la courbe du soleil
// Chaque point représente une heure avec sa hauteur selon une sinusoïde
const DATA = d3.range(0, 24.1, 0.1).map(h => ({
  hour: h,
  height: Math.sin((Math.PI * h) / 24)
}));

// Création d'un générateur de ligne à partir des données, avec une courbe lissée
const LINE = d3.line()
  .x(d => SCALE_X(d.hour))
  .y(d => SCALE_Y(d.height))
  .curve(d3.curveMonotoneX);

// Ajout de la courbe tracée dans le canevas SVG
SVG.append("path")
  .datum(DATA)
  .attr("class", "curve")
  .attr("d", LINE);

// Récupération de l’heure réelle actuelle au format décimal (ex: 13h30 devient 13.5)
const NOW = new Date();
const CURRENT_HOUR = NOW.getHours() + NOW.getMinutes() / 60;

// Ajout une condition juste après pour savoir si c’est la nuit
const ISNIGHT = CURRENT_HOUR < 6 || CURRENT_HOUR >= 20;

// Fonction qui met à jour le fond d'écran avec l'heure.
function updateBackground(hour) {
  const BODY = document.body;

  if (hour < 6) {
    BODY.style.backgroundColor = "#0d1b2a"; // Nuit
  } else if (hour < 12) {
    BODY.style.backgroundColor = "#4682b4"; // Matin
  } else if (hour < 18) {
    BODY.style.backgroundColor = "#58b1d4ff"; // Après-midi
  } else if (hour < 20) {
    BODY.style.backgroundColor = "#ffa07a"; // Fin d'après-midi
  } else if (hour < 22) {
    BODY.style.backgroundColor = "#ff6f61"; // Crépuscule
  } else {
    BODY.style.backgroundColor = "#0d1b2a"; // Nuit
  }
}

updateBackground(CURRENT_HOUR);


// Création d’un cercle représentant le soleil, placé au départ à minuit (heure 0)
const SUN = SVG.append("circle")
  .attr("class", ISNIGHT ? "moon" : "sun")
  .attr("r", 12)
  .attr("cx", SCALE_X(0))
  .attr("cy", SCALE_Y(0));

// Animation du soleil : il avance progressivement de minuit jusqu’à l’heure actuelle
SUN.transition()
  .duration(4000)
  .ease(d3.easeCubicInOut)
  .tween("moveSun", () => {
    const INTERPOLATE_X = d3.interpolate(0, CURRENT_HOUR);
    return function (t) {
      const HOUR = INTERPOLATE_X(t);
      const height = Math.sin((Math.PI * HOUR) / 24);
      SUN.attr("cx", SCALE_X(HOUR)).attr("cy", SCALE_Y(height));
    
      // Changement dynamique de classe en fonction de l'heure
      if (HOUR < 6 || HOUR >= 20) {
        SUN.attr("class", "moon");
      } else {
        SUN.attr("class", "sun");
      }

      updateBackground(HOUR);
    };
  });

// Ajout de repères horaires fixes sous la courbe : 0h, 6h, 12h, 18h, 24h
const HOURS_TO_MARK = [0, 6, 12, 18, 24];
SVG.selectAll("text.hour-label")
  .data(HOURS_TO_MARK)
  .enter()
  .append("text")
  .attr("class", "hour-label")
  .attr("x", d => SCALE_X(d))
  .attr("y", HEIGHT + 7)
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .text(d => `${d.toString().padStart(2, "0")}h`);
  d3.selectAll("text.hour-label").filter((d) => d === 24).remove();