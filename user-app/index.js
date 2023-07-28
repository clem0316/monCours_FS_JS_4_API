let userData = [];

const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));

  console.log(userData[0]);
};
fetchUser();

// On remarque que les résultats se trouvent dans "results" qui est sous forme de tableau d'objets. Donc on précise bien 'data.results' lorsque l'on veut récupérer ces infos.
// Logique un peu particulière de mélange async await avec then :
// - le console.log marche, car le JS ne passera à la ligne du console.log seulement lorsque le await sera terminé.
// - à l'intérieur du await, il y a le fetch et les .then. Donc les méthides fetch et .then se trouvent à l'intérieur d'une exécution await.
// Tips : notre console.log pointe un index[0] pour avoir accès facilement dans la console à un type d'objet et voir rapidement ses propriétés.

const userDisplay = async () => {
  await fetchUser();

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);
    // todayTimestamp = date aujourd'hui // timestamp = date inscription user
    return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
    // Math.ceil pour arrondir au dessus
    // / 8.64e7 est une règle mathématique qui permet de passer le Timestamp en nombre de jours.
  };

  document.body.innerHTML = userData
    .map(
      (user) =>
        `
        <div class="card">
        <img src=${user.picture.large} alt="photo de ${user.name.last}">
  <h3>${user.name.first}</h3>
  <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
  <em>Membre depuis : ${dayCalc(user.registered.date)} jours</em>
  </div>
  `
    )
    .join("");
};
userDisplay();

// La fonction userDisplay se découpe en 4 parties :

//  1 - await fetchUser() qui permet de récupérer le tableau users de l'API appelée dans la fonction fetchUser()

//  2 - une fonction dateParser qui permet de traiter le format de date récupéré dans notre objet. [On utilise une méthode vue dans le cours JS sur la DATA.] On appellera cette fonction dans la variable de la 'card' qui permet d'afficher la date. On passera alors en paramètre de cette fonction (user.dob.date) puisque c'est le format de cette string que nous voulions mettre sous forme de date classique.

//  3 -une fonction dayCalc qui permet de savoir depuis combien de jours l'user est membre. On va, via une methode, récupérer la date du jour et la mettre sous forme Timestamp. Il nous suffira ensuite de soustraire la date d'inscription, aussi au format TImestamp. On n'oublie pas d'intégrer la fonction dayCalc à la variable concernée dans la 'card' avec en paramètre (user.registered.date) qui est la string que l'on a essayé de transformer en nombre de jours.

//  4 - une fonction de map qui permet de créer une card pour chaque utilisateur dans le HTML

// Note sur l'async : Ici on a créé une fonction asynchrone, car pour créer l'affichage des données de nos utilisateurs sur le HTML, il faut d'abord avoir récupéré ces données. Donc on met la fonction en async, et le fetchUSer en await. Une fois les infos récupérées, plus besoin de await car le reste du code peut s'exécuter normalement.
