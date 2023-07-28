// IMPORTANT : Grâce à JSON Viewer sur chrome, je peux directement tapé l'API dans la abrre d'adresse de Chrome et voir le document JSON qui en sort. Pratique pour tester l'adresse et voir comment les données se présentent dans les objets

const header = document.getElementById("header");
const content = document.getElementById("content");

const getJoke = () => {
  fetch("https://api.blablagues.net?rub=blagues")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data.content);
      header.textContent = data.data.content.text_head;
      content.textContent =
        data.data.content.text !== ""
          ? data.data.content.text
          : data.data.content.text_hidden;
    });
};
getJoke();

// le .data.content.text_head ajouté permet d'accéder à la propriété souhaitée de l'objet
// Il est conseillé de toujours garder un console.log de notre réposne afin de voir dans notre console l'élément et ses propriétés facilement
// On a injecté dans la balise qui contient l'iD "header" notre réponse en json
// On procède pareil avec la balise dont l'Id est "content" sauf que dans ce cas on fait une fonction ternaire. Notre api permet de cacher ou non la réponse selon la blague(en fait certaines blagues ne sont pas des questions mais juste des affirmations). réponse visible = text, réponse invisible = text_hidden. Du coup on va lui dire avec la ternaire : "si la valeur de texte est différente que "", alors cela signifie que du texte existe sur la propriété 'text',donc "retourne sa valeur", sinon, "renvoie la valeur de 'text_hidden'"
// une fois la fonction fetch réussie, on l'englobe dans une grande fonction (ici on a créé getJoke())

document.body.addEventListener("click", getJoke);
// Cette fonction permet de changer de blague à chaque click sur le body
