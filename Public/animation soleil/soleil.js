// Sélection du canevas SVG dans lequel tout sera dessiné
const SVG = d3.select("#sky");

// Définition des dimensions du canevas et des marges intérieures
const WIDTH = 800;
const HEIGHT = 300;
const MARGIN = { top: 20, bottom: 30, left: 50, right: 50 };

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

// Création d’un cercle représentant le soleil, placé au départ à minuit (heure 0)
const SUN = SVG.append("circle")
  .attr("class", "sun")
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
    };
  });

// Ajout de repères horaires fixes sous la courbe : 0h, 6h, 12h, 18h, 23h
const HOURS_TO_MARK = [0, 6, 12, 18, 23];
SVG.selectAll("text.hour-label")
  .data(HOURS_TO_MARK)
  .enter()
  .append("text")
  .attr("class", "hour-label")
  .attr("x", d => SCALE_X(d))
  .attr("y", HEIGHT - 5)
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .text(d => `${d.toString().padStart(2, "0")}h`);
