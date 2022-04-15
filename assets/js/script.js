var ingredientInputEl = document.querySelector("#ingredientInput");
var recipeContainerEl = document.querySelector("#ingredientContainer");
var button = document.querySelector(".button");
var ingredientInputForm = document.querySelector("#ingredientInput-form");
var apiKey = "717fd2ea79msh05cd2674261c989p10bbf5jsnc8072009ac5c";
var cocktailContainerEl = document.querySelector("#cocktailContainer");
var liquorInputEl = document.querySelector("#cocktailIngredient");
var liquorInput = liquorInputEl.value.trim();
var liquorButton = document.querySelector(".button_2");
// variables for local storage
var storedListEl = document.querySelector(".storedList");
var storageBtnEl = document.querySelector(".storageBtn");
var mealContainerEl = document.querySelector(".matchCocktailside");

var ingredientIdCounter = 0;
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

liquorButton.addEventListener("click", function () {
  var liquorInput = liquorInputEl.value.trim();
  console.log(liquorInput);
  if (liquorInput == "") {
    recipeContainerEl.textContent = "Please enter a search term";
  } else {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "717fd2ea79msh05cd2674261c989p10bbf5jsnc8072009ac5c",
      },
    };
    fetch(
      // Fetch recipes from endpoint
      // Use From param - start point
      // Use Size param - amount of recipes
      // Use Tags param - recipe tag(s)
      "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + liquorInput,
      options
    ).then(function (response) {
      console.log(response);
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // Returns result of recipes from /list endpoint

          // Store results as recipes
          var cocktailRecipes = data.drinks;
          if (cocktailRecipes.length === 0) {
            cocktailContainerEl.textContent = "No recipes found.";
            return;
          } else {
            // Initialize empty string for our html
            var innerHtml = `<ul>`;

            // We fetched 10 (size) recipes, loop through and grab inenr data
            cocktailRecipes.forEach((cocktailRecipes, i) => {
              if (i < 10)
                innerHtml += `<li>
        <a class="waves-effect waves-light btn-large" href="http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailRecipes.strDrink}">${cocktailRecipes.strDrink}</a></li>
          `;
            });
            innerHtml += "</ul>";
            console.log(innerHtml);
            var cocktailRecipeLink =
              document.getElementById("cocktailContainer");
            cocktailRecipeLink.innerHTML = innerHtml;
          }
        });
      }
    });
  }
});

button.addEventListener("click", function () {
  var ingredientInput = ingredientInputEl.value.trim();
  if (ingredientInput == "") {
    ingredientInputEl.value = "";
    recipeContainerEl.textContent = "Please enter a search term";
  } else {
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
      "https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=" +
        ingredientInput,
      options
    ).then(function (response) {
      console.log(response);
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // Returns result of recipes from /list endpoint

          // Store results as recipes
          var recipes = data.results;

          // Initialize empty string for our html
          var innerHtml = `<ul>`;

          // We fetched 10 (size) recipes, loop through and grab inenr data
          recipes.forEach((recipe) => {
            innerHtml += `<li>
              <a class="waves-effect waves-light btn tooltipped-${recipe.slug}" data-position="bottom" href="https://tasty.co/recipe/${recipe.slug}">${recipe.name}</a>
              </li>
                `;
          });
          innerHtml += "</ul>";
          var recipeLink = document.getElementById("recipeContainer");
          recipeLink.innerHTML = innerHtml;

          if (recipes.length === 0) {
            recipeContainerEl.textContent = "No recipes found.";
            return;
          }
        });
      }
      ingredientInput.id = ingredientIdCounter;
      ingredients.push(ingredientInput);
      saveIngredient();
      ingredientIdCounter++;
    });
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

// save ingredients to local storage
var saveIngredient = function () {
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
};

ingredientIdCounter++;
// getRecipe();
