const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let meals = [];

const fetchMeals = async (userSearch) => {
  await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userSearch
  )
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

  console.log(meals);
  // ne pas oublier le await devant le fetch, sinon, le console.log se fera trop tôt
};

const mealsDisplay = () => {
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultat</h2>";
    // affichage si aucun objet ne correspond à la saisie du user
  } else {
    meals.length = 12;

    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];

        for (i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            ingredients.push(`<li>${ingredient} - ${measure}</li>`);
          }
          console.log(ingredients.join());
        }
        // Dans cette condition, on va vérifier combien il y a d'ingredients(strIngredient) dans le plat (meal). On va donc faire une boucle sur les 20 lignes d'ingrédients et vérifier celles qui contiennent du texte. En objet, on a l'habitude de mettre meal.strIngredient, mais dans notre cas, on doit mettre des crochets pour vérifier l'existence d'une valeur dans chacune des 20 lignes de 'strIngredient'
        // On y ajoute ensuite la mesure correspodnante

        return `
            <li class='card'>
                <h2>${meal.strMeal}</h2>
                <p>${meal.strArea}</p>
                <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
                <ul>${ingredients.join("")}</ul>
            </li>
             `;
        // ici on a mis des crochets après (meal), cela permet de créer plusieurs lignes. Dans notre cas, on souhaitait ajouter une conditionnelle avant cette card. Pour cela, il faut absolument mettre un RETURN devant les back ticks pour dire ce que l'on retourne, et mettre ce return sur la MEME ligne que le back tick ouvrant.
      })
      .join("");
  }
};

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});
// - Ici on récupère la valeur de ce que tape l'utilisateur.
// - Puis on exécute la fonction fetchMeals en lui injectant cette valeur en paramètre
// - Désormais, la fonction est exécutée mais pas encore affichée. Pour l'afficher, on va créer la fonction ci-dessous, qui est un événement quand on valide notre saisie.
// Note : ci-dessous, on n'applique que la fonction d'affichage, pas besoin d'exécuter la focntion de recherche, qui a déjà été exécutée lorsque l'on a saisi notre recherche (avant même de la valider, puisque le e.target.value est en temps réel)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
// On aurait pu intégrer cette fonction d'affichage dans la fonction précédente, mais le problème c'est que l'affichage, à cause du e.target.value en temps réel, aurait été créé à chaque lettre tapé dans notre input
