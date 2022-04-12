var ingredientInputEl = document.querySelector("#ingredientInput");
var recipeContainerEl = document.querySelector("#ingredientContainer");
var button = document.querySelector(".button");
var ingredientInputForm = document.querySelector("#ingredientInput-form");
var apiKey = "717fd2ea79msh05cd2674261c989p10bbf5jsnc8072009ac5c";

//   var ingredientInput = ingredientInputEl.value.trim();
//   if (ingredientInput) {
//     getRecipe(ingredientInput);
//     recipeContainerEl.textContent = "";
//     ingredientInputEl.value = "";
//   } else {
//     alert("Please enter an ingredient");
//   }
//   // function to fetch the recipe
// };

button.addEventListener("click", function () {
  var ingredientInput = ingredientInputEl.value.trim();
  var options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      "X-RapidAPI-Key": "717fd2ea79msh05cd2674261c989p10bbf5jsnc8072009ac5c",
    },
  };
  fetch(
    "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=" +
      ingredientInput,
    options
  ).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        var recipeLink = document.getElementById("recipeContainer");
      });
    } else {
      alert("Error Please enter a different ingredient");
    }
  });

  // button.addEventListener("click", function (event) {
  //   var ingredientInput = ingredientInputEl.value.trim();
  //   fetch(
  //     fetch().then(function (response) {
  //       if (response.ok) {
  //         console.log(response);
  //         response.json().then(function (data) {
  //           console.log(data);
  //         });
  //       } else {
  //         alert("Sorry please enter a different ingredient");
  //       }
  //     })
  //   );
});
// getRecipe();
