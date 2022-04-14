var ingredientInputEl = document.querySelector("#ingredientInput");
var recipeContainerEl = document.querySelector("#ingredientContainer");
var button = document.querySelector(".button");
var ingredientInputForm = document.querySelector("#ingredientInput-form");
var apiKey = "717fd2ea79msh05cd2674261c989p10bbf5jsnc8072009ac5c";

// variables for local storage
var storedListEl = document.querySelector(".storedList");
var storageBtnEl = document.querySelector(".storageBtn");
var mealContainerEl = document.querySelector(".matchCocktailside");

var ingredientIdCounter = 0
var ingredients = [];
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
    // Fetch recipes from endpoint
    // Use From param - start point
    // Use Size param - amount of recipes
    // Use Tags param - recipe tag(s)
    "https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&tags=" +
    ingredientInput,
    options
  ).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        // Returns result of recipes from /list endpoint

        // Store results as recipes
        var recipes = data.results;

        // Initialize empty string for our html
        var innerHtml = ``;

        // We fetched 10 (size) recipes, loop through and grab inenr data
        recipes.forEach((recipe) => {
          innerHtml += `<ul>
        <a class=waves-effect waves-light btn-large href="https://tasty.co/recipe/${recipe.slug}">${recipe.name}</a></ul>
          `;
        });
        var recipeLink = document.getElementById("recipeContainer");
        recipeLink.innerHTML = innerHtml;
        if (recipes.length === 0) {
          recipeContainerEl.textContent = "No recipes found.";
          return;
        }
      });
    }
    ingredients.push(ingredientInput);
    saveIngredient();
    ingredientIdCounter++;
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

// save ingredients function to local storage
var saveIngredient = function () {
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
};

// getRecipe();

