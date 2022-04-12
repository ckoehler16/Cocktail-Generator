var ingredientInputEL = document.querySelector("#ingredient");
console.log(ingredientInputEL);
var button = document.querySelector(".button");
var ingredient = ingredientInputEL.value.trim();

const getDrink = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    "X-RapidAPI-Key": "717fd2ea79msh05cd2674261c989p10bbf5jsnc8072009ac5c",
  },
};
// fetch(
//   "https://thecocktaildb.com/api/json/v1/1/search.php?s" +
//     ingredient +
//     "&appid=" +
//     1
// )
//   .then(function (response) {
//     if (response.status !== 200) {
//       console.log(
//         "Looks like there was a problem. Status Code: " + response.status
//       );
//       return;
//     }

// Examine the text in the response
//   response.json().then(function (data) {
//     console.log(data);
//   });
// })
// .catch(function (err) {
//   console.log("Fetch Error :-S", err);
// });
// fetch("https://thecocktaildb.com/api/json/v1/1/search.php?s=d", getDrink2)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
// fetch(
//   "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=" + ingredient,
//   getDrink
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//    .catch((err) => console.error(err));

button.addEventListener("click", function () {
  ingredient = ingredientInputEL.value.trim();
  fetch(
    "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=" +
      ingredient +
      getDrink
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
    });
});
