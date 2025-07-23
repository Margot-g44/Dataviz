//----------------------------------------------------------------------------------------------------------------------------------------------//
// 1. Sélection du SVG :
//----------------------------------------------------------------------------------------------------------------------------------------------//

// On sélectionne le SVG qu’on a créé dans index.html (avec l’ID sky) 
// pour pouvoir lui ajouter des éléments avec D3.
const svg = d3.select("#sky");

//----------------------------------------------------------------------------------------------------------------------------------------------//
// 2. Définition des dimensions et marges :
//----------------------------------------------------------------------------------------------------------------------------------------------//

// la taille du canevas (800x300).
// et des marges intérieures, pour éviter que les éléments ne soient collés au bord.
const width = 800;
const height = 300;
const margin = { top: 20, bottom: 30, left: 50, right: 50 };

//----------------------------------------------------------------------------------------------------------------------------------------------//
// 3. Création des échelles (scales) :
//----------------------------------------------------------------------------------------------------------------------------------------------//

//Échelle horizontale :
const x = d3.scaleLinear()
  .domain([0, 23])                              // domain : de 0 à 23 heures (format 24h).
  .range([MARGIN.left, WIDTH - MARGIN.right]);  // range : pixels réels, entre la marge gauche et droite.

// Échelle verticale :
const y = d3.scaleLinear()
  .domain([0, 1])                               // domain : valeurs de 0 à 1, car on utilise Math.sin(...), 0 est en bas du SVG, 1 est en haut.
  .range([HEIGHT - MARGIN.bottom, MARGIN.top]); // range : on inverse l’axe Y (le haut du SVG est 0, le bas est height) donc :


//----------------------------------------------------------------------------------------------------------------------------------------------//
// 4. Génération des données de la courbe :
//----------------------------------------------------------------------------------------------------------------------------------------------//

const data = d3.range(0, 24.1, 0.1).map(h => ({ // On crée un tableau avec des points toutes les 0.1h (toutes les 6 minutes) :
  hour: h,                                      // h = heure (ex : 0.0, 0.1, 0.2, ..., 23.9)
  height: Math.sin((Math.PI * h) / 24)          // height = valeur de la sinusoïde à cette heure (simulateur du cycle solaire)
}));


//----------------------------------------------------------------------------------------------------------------------------------------------//
// 5. Génération de la ligne :
//----------------------------------------------------------------------------------------------------------------------------------------------//

// On définit une fonction génératrice de courbe :
// Elle prend les données data
const line = d3.line()
  .x(d => SCALE_X(d.hour))          // x = position horizontale (heure transformée en pixel)
  .y(d => SCALE_Y(d.height))        // y = hauteur du soleil (fonction sinusoïdale transformée en pixel)
  .curve(d3.curveMonotoneX);  // curveMonotoneX : rend la courbe lisse


//----------------------------------------------------------------------------------------------------------------------------------------------//
// 6. Affichage de la courbe :
//----------------------------------------------------------------------------------------------------------------------------------------------//

SVG.append("path")            // On dessine un path (ligne) dans le SVG :
  .datum(DATA)                // datum(data) lie la data à l’élément
  .attr("class", "curve")
  .attr("d", LINE);           // .attr("d", line) trace la ligne grâce à la fonction précédente



//----------------------------------------------------------------------------------------------------------------------------------------------//
// 7. Récupération de l’heure actuelle :
//----------------------------------------------------------------------------------------------------------------------------------------------//

const now = new Date();
const currentHour = NOW.getHours() + NOW.getMinutes() / 60; // On récupère l’heure actuelle avec les minutes converties en décimales.



//----------------------------------------------------------------------------------------------------------------------------------------------//
// 8. Création du cercle soleil (position initiale : minuit) :
//----------------------------------------------------------------------------------------------------------------------------------------------//

// On ajoute un cercle (<circle>) représentant le soleil, et on le place à minuit (x(0), y(0)).
const sun = SVG.append("circle")
  .attr("class", "sun")
  .attr("r", 12)
  .attr("cx", SCALE_X(0))
  .attr("cy", SCALE_Y(0)); 


//----------------------------------------------------------------------------------------------------------------------------------------------//
// 9. Animation du soleil jusqu’à l’heure actuelle :
//----------------------------------------------------------------------------------------------------------------------------------------------//

SUN.transition()                                          // on déclare une animation,
  .duration(4000)                                         // qui dure 4 secondes,
  .ease(d3.easeCubicInOut)                                // rend l’animation fluide.
  .tween("moveSun", () => {                               // fonction personnalisée qui :
    const interpolateX = d3.interpolate(0, CURRENT_HOUR);  // interpole entre 0 (minuit) et currentHour.
    return function (t) {                                 // à chaque instant t (entre 0 et 1), on calcule la position du soleil.
      const hour = interpolateX(t);
      const height = Math.sin((Math.PI * hour) / 24);
      SUN.attr("cx", SCALE_X(hour)).attr("cy", SCALE_Y(height));      // on met à jour cx (x) et cy (y) pour le déplacer sur la courbe.
    };
  });

//----------------------------------------------------------------------------------------------------------------------------------------------//
// 10. Ajout des heures de repère (0h, 6h, 12h, 18h, 23h) :
//----------------------------------------------------------------------------------------------------------------------------------------------//

const hoursToMark = [0, 6, 12, 18, 23];
SVG.selectAll("text.hour-label")                      // sélection fictive (n'existe pas encore).
  .data(HOURS_TO_MARK)                                  // données = heures importantes.
  .enter()
  .append("text")                                     //  crée un texte pour chaque valeur.
  .attr("class", "hour-label")
  .attr("x", d => SCALE_X(d))
  .attr("y", HEIGHT - 5)
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .text(d => `${d.toString().padStart(2, "0")}h`);    // affiche l'heure sous forme "06h", "12h", etc.
  
