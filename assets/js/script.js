var ingredientInputEl = document.querySelector("#ingredientInput");
var recipeContainerEl = document.querySelector("#recipeContainer");
var test = document.getElementById("recipeContainer");
var button = document.querySelector(".button");
var ingredientInputForm = document.querySelector("#ingredientInput-form");
var apiKey = "717fd2ea79msh05cd2674261c989p10bbf5jsnc8072009ac5c";
var cocktailContainerEl = document.querySelector("#cocktailContainer");
var liquorInputEl = document.querySelector("#cocktailIngredient");
var liquorInput = liquorInputEl.value.trim();
var liquorButton = document.querySelector(".button_2");
var clearBtn = document.querySelector("#clearIngredients");
// variables for local storage
var storageBtnEl = document.querySelector(".storageBtn");
var mealContainerEl = document.querySelector(".matchCocktailside");
var toastContainer = document.querySelector("#toastContainer");
var ingredientIdCounter = 0;
var ingredients = [];

// use this instead of var ingredients
function getIngredientsFromStorage() {
  var currentStorage = localStorage.getItem("ingredients");
  if (!currentStorage) {
    localStorage.setItem("ingredients", JSON.stringify([]));
    return [];
  }
  return JSON.parse(localStorage.getItem("ingredients"));
}

toastContainer.style.display = "none";
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

// function to trigger 'click' when user hits enter
liquorInputEl.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("liqBtn").click();
  }
});

liquorButton.addEventListener("click", function () {
  var liquorInput = liquorInputEl.value.trim();
  console.log(liquorInput);
  if (liquorInput == "") {
    cocktailContainerEl.innerHTML = "Please enter a search term";
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

            // We fetched 10 (size) recipes, loop through and grab inner data
            cocktailRecipes.forEach((cocktailRecipes, i) => {
              if (i < 10)
                innerHtml += `<li>
        <a class="waves-effect waves-light btn-large" href="http://www.thecocktaildb.com/drink/${cocktailRecipes.idDrink}">${cocktailRecipes.strDrink}</a></li>
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

// function to trigger 'click' when user hits enter
ingredientInputEl.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("ingredientBtn").click();
  }
});

button.addEventListener("click", function () {
  var ingredientInput = ingredientInputEl.value.trim();
  toastContainer.style.display = "none";
  if (ingredientInput == "") {
    ingredientInputEl.value = "";
    test.style.display = "none";
    toastContainer.style.display = "block";
    toastContainer.innerHTML = M.toast({
      html: "Please enter a search term",
    });
  } else {
    test.style.display = "block";
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
          if (recipes.length === 0) {
            toastContainer.innerHTML = M.toast({
              html: "Enter a different ingredient",
            });
            return;
          }
          // Initialize empty string for our html
          var innerHtml = `<ul>`;

          // We fetched 10 (size) recipes, loop through and grab inner data
          recipes.forEach((recipe) => {
            innerHtml += `<li>
              <a class="waves-effect waves-light btn tooltipped-${recipe.slug}" data-position="bottom" href="https://tasty.co/recipe/${recipe.slug}">${recipe.name}</a>
              </li>
                `;
          });
          innerHtml += "</ul>";
          var recipeLink = document.getElementById("recipeContainer");
          recipeLink.innerHTML = innerHtml;
        });
      }
      ingredientInput.id = ingredientIdCounter;
      // ingredients.push(ingredientInput);
      saveIngredient(ingredientInput);
      ingredientIdCounter++;
    });
  }
  ingredientInputEl.value = "";
});
var saveIngredient = function (ingredientInput) {
  // var currentStorage = JSON.parse(localStorage.getItem("ingredients"));

  // if (currentStorage) {
  //   console.log("if current currentStorage ", currentStorage);
  //   console.log("if current ingredients ", ingredients);
  //   var updatedList = currentStorage.concat(ingredients);
  //   console.log("if current", updatedList);
  //   localStorage.setItem("ingredients", JSON.stringify(updatedList));
  // } else {
  //   console.log("else current", ingredients);
  // getIngredientsFromStorage();
  console.log("djc", getIngredientsFromStorage());
  var updatedList = getIngredientsFromStorage().concat(ingredientInput);
  localStorage.setItem("ingredients", JSON.stringify(updatedList));
};

ingredientIdCounter++;

document
  .getElementById("showIngredients")
  .addEventListener("click", loadIngredients);
function loadIngredients() {
  // ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
  // if (!ingredients) {
  //   // ingredients = {
  //   //   // ingredients: [],
  //   // };

  // console.log("loadStorage ", ingredients);

  getIngredientsFromStorage().forEach(function (ingredients) {
    //creating the html elements which will display the ingredients
    var liTag = document.createElement("li");
    liTag.textContent = ingredients;
    var ingredientList = document.getElementById("ingredients");
    ingredientList.appendChild(liTag);
    // when the clear button is click items are removed from the list
    clearBtn.addEventListener("click", function () {
      ingredientList.removeChild(liTag);
    });
  });
}
