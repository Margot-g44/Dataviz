# Dataviz
1. Introduction
Ce projet a pour objectif de développer une application web qui permette de visualiser des données de façon dynamique. Ce principe peut être pris de manière très large : ainsi, il peut s’agir de construire une page web affichant un graphique « classique » reflétant l’évolution de telle ou telle donnée. Mais il peut aussi s’agir de créer une animation mettant en scène des données de façon plus originale ou ludique (voir plus bas dans les idées proposées). Nous vous encourageons à vous placer dans une démarche éco-responsable, en créant une application simple, efficace et épurée.

Contraintes générales
Langage : libre (selon le niveau choisi)
Durée de la séquence: 2 semaines
Objectifs globaux pédagogiques
Découvrir le traitement de données en temps réel
Explorer des possibilités d’animation web
Se confronter aux choix d’architecture que présente la conception de tout applicatif
Découper le projet en tâches et en domaines
Trouver un mode de travail en groupe qui permette de mobiliser toutes les apprenantes de l’équipe
Maîtriser les commandes de base git
🌱 Amorcer une démarche d’éco-conception en questionnant ses choix fonctionnels et techniques

2. Je débute
Visualiser le temps qui passe
Nous vous proposons de créer une animation simple qui dépende du temps (date, heure, durée, …). Par exemple, il pourrait s’agir de dessiner un arbre qui aurait de nouvelles feuilles toutes les X secondes, et dont la couleur dépendrait du moment de la journée.

🌱 Afin de ne pas générer d’animations infinies, nous attirons votre attention sur l’implémentation d’un critère d’arrêt (durée maximale de l’animation, nombre de feuilles ajoutées par exemple).

Pour ce niveau, le langage utilisé sera automatiquement JavaScript afin de vous permettre de faire faire tout le traitement par le navigateur

Objectifs pédagogiques
Appliquer l’asynchrone
Se familiariser avec une bibliothèque d’animation graphique JavaScript
Se poser la question de la durée de vie de son applicatif
Manipuler du CSS et du HTML
Mettre en place un environnement Web permettant de travailler en groupe sur le même projet
Créer un repo commun et utiliser les commandes de base git (git push, git pull, git commit)
🔍 Point de vigilance d’accessibilité
Lorsque vous concevez une page ou en l’occurrence votre projet dataviz & API , assurez-vous de prendre en compte les critères essentiels du Référentiel d'améloration de l'accessibilité (RGAA)

Les emojis étoile ⭐, permettent de retenir les éléments clés de chaque critère

Tout d'abord, gardez à l'esprit le critère 3.1

⭐ l'information ne doit pas être transmise uniquement par la couleur. Cela signifie que même si vous utilisez des couleurs pour indiquer des éléments importants, assurez-vous qu'il existe d'autres moyens, tels que des étiquettes ou des symboles, pour communiquer cette information.

Ensuite, vérifiez le contraste entre la couleur du texte et son arrière-plan, conformément au critère 3.2

Assurez-vous que le texte est clairement lisible, en particulier pour les personnes ayant une vision réduite. ⭐ La couleur du fond ( background ) et de votre texte doit avoir un ratio de 4.5 . Vous pouvez utiliser le site coolors.co pour tester vos ratios de couleur.

Enfin, abordez le critère 3.3

⭐ En veillant à ce que les couleurs utilisées dans les composants d'interface ou les éléments graphiques porteurs d'informations aient un contraste suffisant. Cela garantit une expérience de navigation agréable et accessible pour tous les utilisateurs, indépendamment de leurs capacités visuelles.

En respectant ces critères, vous contribuez à rendre le web plus inclusif et accessible pour toutes et tous. Bonne conception !

Étapes possibles pour se lancer
Se mettre d’accord sur l’orientation du projet : il y a quelques choix de conception à faire sur ce projet :
quelle est la donnée que vous souhaitez représenter ? L’heure actuelle, le moment de la journée, une statistique connue (toutes les X secondes il se passe telle chose dans le monde) ?
quelle forme souhaitez-vous donner à cette information ? Un paysage qui change au fur et à mesure de la journée, un dessin qui se complexifie au fur et à mesure, etc.
le dessin se fera-t-il entièrement par le code ou partirez-vous d’une image existante ?
🌱 quel est votre critère d’arrêt de l’animation ?
quelle librairie souhaitez-vous utiliser pour cela ? Des exemples (non exhaustifs) sont donnés dans les ressources du projet.
Récupérer l’heure au sein du navigateur Quelle que soit la façon dont vous l’afficherez, il s’agit dans un premier temps de récupérer l’heure actuelle au sein du navigateur.
Dessiner quelque chose à l’écran selon l’heure En utilisant la librairie de votre choix, vous pouvez dessiner ce que vous souhaitez, et décider au sein de l’équipe quel élément changera avec le temps : il s’agit donc de relier le dessin fait à l’écran avec l’heure récupérée.
Automatiser le dessin Comment faire pour que l’animation se déroule automatiquement et se mette à jour toutes les X secondes/minutes selon votre choix ? 🌱 Quand et comment votre dessin se termine-t’il ?
Gérer les rafraîchissements Que se passe-t-il si on rafraîchit la page ? Comment faire en sorte que le dessin soit conservé ? Une fois cela fait, comment offrir la possibilité de le remettre à zéro ?
 👀 Pour commencer à utiliser les commandes git dans le cadre d’un projet partagé avec votre groupe, vous avez deux choix

[Je débute] J’utilise une interface graphique pour visualiser les commandes (par exemple GitDesktop ou SourceTree)
Utiliser les lignes de commande git
Vous trouverez ci-dessous des ressources et des exercices pour vous familiariser pas à pas avec git. Il s’agit d’un outil très important qui vous permettra de travailler en équipe à l’école et en entreprise, et vous avez toute l’année pour devenir des experts·es git 🏂

3. Je suis à l'aise
Dans ce cas de figure, la connexion à une source de données externe pourrait aussi bien se faire du côté du navigateur que du côté du serveur.

Option 1. Se connecter à une API
Choisir parmi les APIs disponibles sur Internet une source de données à laquelle se connecter, et gérer l’affichage et la mise à jour de votre visualisation en temps réel sur la base des données renvoyées par l’API.

🌱 Malgré la simplicité d’accès à de très nombreuses sources de données, il est important de rester sobre dans nos usages de ces services en tant que développeur·ses. En effet les appels à des APIs peuvent vite devenir très énergivores. Nous vous encourageons à vous limiter au strict nécessaire dans les données que vous récupérez.

Objectifs pédagogiques
Appréhender la notion d’API, et la façon d’interagir avec
Comprendre l’impact de vos choix d’architecture sur l’utilisation de votre applicatif
Faire un travail d’équipe pour rechercher et comparer les APIs possibles à utiliser pour ce projet
Travailler en équipe pour se découper les tâches à effectuer pour mener à bien le projet
🌱 Interroger les besoins et les usages, rationaliser ses appels à des services externes
Exemples
Se connecter à une API météo et dessiner un paysage plus ou moins ensoleillé en fonction des résultats
Se connecter à une API de transports et faire changer de couleur un feu de signalisation selon l’état du trafic
💡 Certaines APIs sont privées et demandent une authentification (par ex les APIs des réseaux sociaux comme Twitter et Instagram). D’autres APIs sont publiques et peuvent être appelées sans authentification. Vous pouvez prendre en considération ce paramètre dans votre choix d’API en fonction du temps que vous souhaitez dédier à la gestion de l’authentification.

Option 2. Faire du scraping de page web
Votre visualisation de données peut alternativement utiliser comme source une page web existante : il s’agit alors de comprendre la structure de cette page afin d’en extraire les données qui vous intéressent et les afficher dans votre propre visualisation de données

Objectifs pédagogiques
S’initier au scraping et trouver la meilleure stratégie pour récupérer les données qui vous intéressent
Appréhender les problématiques de retraitement des données
🌱 Récupérer le strict nécessaire dans l’ensemble des informations disponibles
Faire des choix d’architecture par rapport à l’objectif
Expliciter un découpage de tâches cohérent au sein de l’équipe
Travailler sur des briques de l’applicatif en interface et se concerter sur les échanges à mettre en place entre ces briques
Ressources niveau 2
Pour comprendre la notion d’API :

Lire la vidéo
[FR]
Introduction aux API  [FR]
Récupérer des données du serveur [FR]
Adoptez les API REST pour vos projets web [FR] - 6 premières leçons
Pour “scraper” une page web  :

A Guide to Automating & Scraping the Web with JavaScript (Chrome + Puppeteer + Node JS) [EN]
Introduction au Web Scrapping avec Javascript et Node JS [FR]
En python avec BeautifulSoup [FR]

4. Je veux aller plus loin
🌱 Option 1. Optimiser le lancement de votre application
Le temps nécessaire pour charger une page impacte non seulement l’expérience utilisateur mais aussi la consommation d’énergie. Nous vous proposons de mettre en place un stockage local des données que vous récupérez d’API(s) afin de ne pas avoir à aller les chercher à nouveau lorsque l’utilisateur·ice recharge la page de votre application par exemple.

La bonne gestion du cache est l’action clé lors de l’hébergement : il s’agit de paramétrer correctement le serveur web pour s’assurer que toutes les ressources (images, bibliothèques CSS et JS, etc.) conservées sur le disque dur de l’internaute (dans le cache navigateur) le seront. Vous éviterez ainsi d’utiliser inutilement de la bande passante, tout en améliorant l’expérience utilisateur.

Si vous avez de nombreuses images dans votre application, vous pouvez également vous intéresser aux techniques de lazy loading.

Option 2. Créer une API
En utilisant une base de données existante (par exemple, la liste de défibrillateurs disponibles dans des espaces publics à Paris), créer un serveur Web qui mette à disposition celle-ci via une API. Il s’agira donc de pouvoir recevoir des requêtes comprenant par exemple une localisation pour renvoyer ensuite les adresses des deux défibrillateurs les plus proches de cette localisation. Votre API pourra donc être utilisée par n’importe quel applicatif qui lui envoie des requêtes.

Option 3. Croiser les données de deux sources différentes pour les afficher
Créer un serveur qui se connecte à deux sources de données différentes et les croise pour présenter le résultat de ce croisement via une page Web. Par exemple, je cherche à acheter des fleurs d’hibiscus séchées, la page web me renvoie tous les magasins à proximité qui en vendent en les classant par prix (il s’agira alors de se connecter tour à tour à différentes sources de données pour les agréger).

Objectifs pédagogiques
Manipuler des données de sources (et potentiellement de formats) différents
Designer une API vouée à être publique
Discuter et décider ensemble du meilleur design pour votre API
Ressources niveau 3
Stockage côté client [FR]
Sauvegardez les données dans le localStorage ****[FR]
Le Lazy Loading d'images natif, sans javascript ****[FR]
Lazy Loading, des pages web plus rapides [FR]
Concevoir une API, les grands principes [FR]
Designer une API REST, en détail [FR]

5. Ressources générales
Pour se familiariser avec Git:
Tutoriel visuel de Git [EN]
Jeu open source pour apprendre à utiliser Git [EN]
Des exercices en ligne pour gagner en confiance progressivement [EN]
5 min pour comprendre les gestes quotidiens d’un développeur [FR]
Gérez du code avec Git et Github (OpenClassroom) [FR]
Cheatsheet Codecademy pour des opérations de base Git [EN]
Pour créer des visualisations de données :
Processing en version JavaScript pour dessiner à l’écran [EN] (repo archivé mais toujours accessible)
Snapsvg qui permet d’animer des images vectorielles [EN]
Inkscape pour créer des images vectorielles [FR]
D3.js pour la visualisation de données [EN]
Des idées et des exmples de code :
https://www.data-to-viz.com/
https://datavizcatalogue.com/search.html
💡 Plein de tips, de bonnes pratiques, et d'inspirations à prendre : https://blog.datawrapper.de/category/datavis-dos-and-donts/
Liste d’APIs facilement utilisables
Nous vous recommandons d’utiliser les APIs ci dessous, elles sont bien documentées et ont toujours une équipe de support qui se charge de les maintenir.

https://randomuser.me/
https://newsapi.org/
https://github.com/lukePeavey/quotable (url publique: api.quotable.io ie: https://api.quotable.io/random)
https://jsonplaceholder.typicode.com/
https://superheroapi.com/
https://pokeapi.co/docs/v2
https://world.openfoodfacts.org/data (avec la documentation https://openfoodfacts.github.io/openfoodfacts-server/api/)
https://github.com/n0shake/Public-APIs
Open Data University par Latitudes
Notre partenariat avec l'association Latitudes nous permet de vous proposer ces jeux de données accessibles pour toutes et tous qui peuvent faire l'objet de votre projet Dataviz. Ces jeux de données sont à retrouver ici : https://defis.data.gouv.fr/opendatauniversity

Autres endroits où aller chercher des données :
Une marketplace d’APIs
Une liste d’APIs ouvertes sans besoin d’inscription [EN]
Données météo avec wttr.in [EN] et surtout la documentation de l’API dans le README du dépôt GitHub [EN]
Toutes les données ouvertes officielles françaises, belges, québécoises, allemandes, de Nantes, de Paris…
Données ouvertes des transports publics en France
Données cartographiques avec OpenStreetMap [EN], et surtout la documentation de l’API [EN]
Données ouvertes de la NASA 1 [EN]
[Pour aller plus loin]
Sur les CORS :
Introduction au CORS
CORS en quelques mots
🌱 Sur la sobriété numérique :
L’API Green Score, une innovation pour les APIs Numériquement responsables