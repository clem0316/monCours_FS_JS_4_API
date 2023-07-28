// PROGRAMME API :
// I - XMLHttpRequest
// II - FETCH
// III - Méthodes POST, PUT, DELETE
// IV - ASYNCHRONE
// V - JSON
// VI - Web API

// - PROJETS -
//   > Générateur de blagues (sous-dossier "joke-app")
//   > API User (sous-dossier "user-app")

// IMPORTANT : Ctrl C pour arrêter le serveur

// ================================

// I - XMLHttpRequest (ancienne méthode très peu utilisée)

// ================================

function reqListener() {
  console.log(this.responseText);
}
// Ne fonctionne pas en fonction fléchée (j'ignore pourquoi)
// le "this.responseText" permet d'ordonner la réponse sous forme de texte

let req = new XMLHttpRequest();
req.onload = reqListener;
req.open("get", "data.txt", true);
// req.open("get", "data.json", true);
// req.open("get", "https://api.blablagues.net/?rub=blagues", true);
req.send();
// - req.onload = reqListener >> Je demande, au chargement de la page, de joeur la fonction reqListener (ici qui nous affiche une réponse)
// - req.open >> le "get" pour aller chercher un document à charger, on met ensuite le document ou l'url à aller chercher ("data.txt", "data.json", une url...), et enfin "true" pour autoriser cette action
// - req.send() >> pour envoyer notre document chargé

//

// =============================

// II - FETCH

// =============================

// Exempel 1 :

fetch("monLien", "objet d'options")
  .then((reponse) => {
    // response
  })
  .catch((err) => console.log(err));

// Le fetch signifie "va chercher"
// L'objet d'option est facultatif
// Le .then permet d'attendre la réponse du lien que l'on va chercher. tant qu'il n'a pas a réponse, il ne passe pas à la suite
// La res (ou response) est forcément en rapport avec le fetch
// Le catch me permet d'attraper l'erreur. Si la requête n'a pas pu aboutir, c'est le .catch qui prend le relais. On va par exemple lui dire de console.log cette erreur ou de console.log la phrase que l'on souhaite, etc...
// Ici on a une erreur car "monLien" ne renvoie à rien

//

// Exemple 2
fetch("data.txt")
  .then((res) => res.text())
  .then((data) => console.log(data));
// Ici, le lien data.txt est un document en local. On lui demande de console.log la réponse.
// Dans le .then, on mettra toujours un paramètre dans la focntion fléchée. Ce paramètre, appelé comme on veut, fera toujours référence à la réponse précédente. Donc ici, 'res' fait référence à la réponse du fetch("data-txt")
// Ci-dessus on a donc demandé à notre réponse d'être interprétée en Texte, puis on fait un .then avec une fonction flechée pour pouvoir le console.log. On note qu'on a mis "data" comme paramètre (on pourrait l'appeler comme on veut), et comme tout .then, ce paramètre fait appel à la réponse précédente. Donc ici le paramètre data fait référence à la réponse de res.text()
// Attention au ';' qui ne se met qu'à la fin. Et surtout PAS entre les .then sinon cela mettrait fin à la fonction

//

// Exemple 3
fetch("data.json")
  .then((response) => response.json())
  .then((data1) => console.log(data1));
// Encore une fois, les paramètres peuvent être nomméd comme on veut
// Comme pour le res.text qui transformait noter contenu du doc data.txt en texte pour être lu, on va faire de même pour lire notre contenu du document data.json avec la méthode res.json
// on peut ensuite pointer des propriétés comme dans un objet classique

//

// Exemple 4
const myHeaders = new Headers();

const init = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
};
// Cette constante nous permet d'aller chercher un objet. myHeaders est un objet javascript qui comporte de sméthodes. Utilse pour paramétrer. Et le "cors" permet de gérer les permissions.

// fetch("http://facebook.com").then((res) => console.log(res));
// Dans ce cas, la requête sera bloquée car facebook empêche l'accès. Le cors est l'élément qui permet ou empêche l'accès.

fetch("data.json", init).then((res) => console.log(res));
// On a réussi, grâce l'objet init que l'on a créé, à récupérer notre contenu de "data.json"

//

// =====================================

// III - Méthodes POST, PUT, DELETE

// =====================================

//

// Equivalents avec le CRUD=>>>> create (POST), read (GET), update (PUT), Delete (DELETE)

// CONFIGURATION SIMULATION SERVER & DATABASE
//
// Dans mon terminal, dans le sous-dossier "support" de mon cours, je vais taper : npm init -y
// Cela permet de créer un package json; On appelle cela un gestionnaire de dépendances. On va s'en servir pour simuler un serveur.
// J'ai ensuite installé le server json en global avec : "sudo npm i -g json server" note : j'ai dû rajouter "sudo" toujours à cause de mes problèmes de mac
// Enfin je crée dans mon sous-dossier "support" le fichier db.json qui sera notre database
// Puis on tape la commande 'json-server --w db.json' (le --w pour 'watch')
// Désormais on peut travailler avec notre base de données db.json comme s'il s'agissait d'une base de données à distance

//

// 1 - Créer un objet (POST)

const init2 = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    pseudo: "Clement",
    message: "Bonjour tout le monde",
  }),
  mode: "cors",
  credentials: "same-origin",
};
// - NOTE 1 : le TOKEN > Il est à noter que le headers peut contenir nombreuse informations. Notamment un token d'identification. Grâce à ce token, chaque fois que le user va faire une requête, on va prendre le cookie d'identification pour pouvoir effectuer cette requête, identifier son auteur et lui envoyer une réponse en conséquence (ou même pour en gérer l'autorisation)
// - JSON.stringfy() Méthode qui permet que l'objet Javascript concerné (ici pseudo et message), soit mis au format json
// - On laisse credentials sur "same-origin"

document.getElementById("form1").addEventListener("submit", () => {
  fetch("http://localhost:3000/posts", init2).then(() =>
    console.log("data envoyée")
  );
});
// - Cette url a été récupérée dans le terminal lorsque j'ai tapé la commande "json-server --w db.json"
// - Cette url est en fait la simulation de la base de données externes que nous avons mis en place
// - On choisit de le mettre dans un événement "submit" pour que la fonction init2 ne soit exécutée QUE dans le cas de nos requêtes. Sinon ça le jouerait en boucle. (On pense à créer un <form> comprenant un input:submit dans le HTML)
// Désormais, si j'appuie sur le submit dans mon HTML, il va incrémenter la base de données de mon objet init2. Il rajoutera, dans mon db.json, autant de fois {pseudo:"Clement", message:"Bonjour tout le monde"} que je cliquerai dessus

const init2bis = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    pseudo: "Clement",
    age: "40ans",
  }),
  mode: "cors",
  credentials: "same-origin",
};

document.getElementById("form1bis").addEventListener("submit", () => {
  fetch("http://localhost:3000/users", init2bis);
});
// Ici, même principe, mais on a remplacé "posts" dans l'url par "users". Ainsi, dans notre db.json, l'objet sera créer dans le tableau "users"

//

// 3 - Supprimer un objet (DELETE)

const init3 = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "same-origin",
};

document.getElementById("form2").addEventListener("submit", () => {
  fetch("http://localhost:3000/posts/2", init3);
});
// Ci-dessus pour supprimer un objet. La différence dans l'url est qu'il faut ajouter à la fin de l'url un chiffre qui correspond à l'iD de l'objet que l'on souhaite enlever.
// Dans mon exemple, j'ai donc enlevé l'objet ayant l'iD 2 dans ma database.
// [Attention, cela prend parfois quelque ssecondes à s'afficher ou disparaître dans la db.json]

// IMPORTANT : Ctrl C pour arrêter le serveur

//

// =============================

// IV - ASYNCHRONE

// =============================

// 1 - BASIQUE
//
setTimeout(() => {
  console.log("test");
}, 2000);
// Façon très basique de faire de l'asynchrone

//

// 2 - PROMISE
//
fetch("monUrl").then((res) => res);
// La méthode then vue précédemment. Le then n'est effectué que lorsque la réponse de l'url aura été reçue.

//

// 3 - ASYNC / AWAIT
//
const fetchData = async () => {
  await fetch("monUrl");

  await console.log("coucou");
  await console.log("hello");
};
// A partir du moment où j'ai déclaré une fonction comme "async", alors partout où j'écrirai "await", le code s'arrêtera tant que cette exécution soumise au await ne sera pas terminée.
// En général, à l'intérieur d'une fonction async, on a une cascade d'exécutions, toutes en await

//

// =============================

// V - JSON

// =============================

// Signifie 'JavaScript Object Notation'
// Commence toujours par une accolade. Les index sont toujours entre guillemets ""

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let settings = JSON.stringify(data);
    // stringify => convertir en JSON
    console.log(settings);
    console.log(JSON.parse(settings));
    // Parse => transforme json en objet
  });
// - Pour rappel, la methode JSON.stringify permet de transformer notre objet en chaine de caracteres Json. Ceci étant, notre data était tout de même exploitable avant la transformation en json.
// - Mais il existe une méthode pour transformer du JSON en objet Javascript, c'est la méthode parse(). On obtient alors un objet au format classique.

//

// =============================

// VI - Web API

// =============================

// 1 - CLIENT STORAGE

//    a) Local Storage

// Pour information, un cookie peut stocker 4 ko d'informations, là où le local storage peut stocker 10 Mo. Ce qui est stocké dans le local storage n'est accessible que côté client. Ce sont mes paramètres, le mode nuit ou des options d'affichage par exemple, mais le site, lui, n'y a pas accès.

localStorage.maBoite = "Je stocke la data";
// Cela crée immédiatement une boîte que je nomme "maBoite" sur mon local storage qui stocke la phrase "Je stocke la data"

console.log(localStorage.maBoite);
// Aussi simple que ça pour afficher ce qui a été stocké dans ma bopite 'maBoite'

document.body.textContent += localStorage.maBoite;
// Toujours simplement pour afficher sur le HTML ce qui a été stocké dans la boite "maBoite" de mon local storage
// Si je referme et réouvre ma page, la phrase est toujours affichée

localStorage.removeItem("maBoite");
// Méthode pour retirer ma boite du local storage

localStorage.user = "Denis";
// Je crée et stocke une boîte user contenant la string "Denis"

//
// !! ATTENTION !! Dans le local storage, on ne peut stocker QUE des STRING ! PAS d'objet ni de tableau !!
//
// Admettons que j'ai cet objet :
const obj = {
  name: "Denis",
  age: 22,
};
// Je ne pourrai pas stocker l'objet ainsi. Mais en utilisant le stringify, alors je pourrai transformer mon objet en chaine de caractère JSON, pour pouvoir la stocker dans mon local storage. On fera ainsi :
localStorage.user2 = JSON.stringify(obj);
// Dans le local storage, mon objet prendra alors la forme {"name":"Denis","age":22}

console.log(JSON.parse(localStorage.user2));
// C'est grâce au JSON.parse(localStorage.user2) que je pourrai de nouveau récupérer cette string sous la forme d'un objet classique

//

//    b) Session Storage

sessionStorage.dataSettings = "55px";
// On va ici stocker dans le stockage session (qui se trouve juste en dessous du local storage dans l'onglet 'Appli' de l'inspecteur Chrome)c
// La différence avec le local storage est que l'information ne reste que le temps de la session. Dès lors que je ferme ma page, le session storage se vide.

sessionStorage.clear();
// Method pour vider le session storage

//

//    c) Les cookies

// Les cookies se stockent aussi dans l'onglet "Appli" d el'inspecteur, rubrique "cookies"
// je peux voir quels cookies dans ma session , en tapant dans la console de l'inspecteur, la commande console.log(cookies)
document.cookie = "username= FromScratch";
// De base, si on ne donne pas de date d'expiraiton à un cookie, il s'arrêtera à la fermeture de la session.

// bonne pratiUE
document.cookie = "pseudo=clement;path=/;max-age=45000;secure;samesite";
// Le path permet de dire sur quelle page exactement le cookie se déclenche
// Le max-age est une valeur d'existence du cookie en millisecondes. On peut aussi utiliser 'expires' puis donner en valeur une date exacte.
// 'secure' permet d'avoir un environnement sécurisé. Concernant le token d'identification, il faut mieux le laisser dans un environnement https
// 'samesite' n'autorise que les requêtes de notre site, et empêche les requêtes de sites extérieurs. Par sécurité on met donc 'samesite'
