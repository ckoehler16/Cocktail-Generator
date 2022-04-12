var ingredientInputEl = document.querySelector("#ingredientInput");

// var ingredientInput = ingredientInputEl.value.trim();
var button = document.querySelector(".button");
var apiKey = "717fd2ea79msh05cd2674261c989p10bbf5jsnc8072009ac5c";

button.addEventListener("click", function (event) {
  event.preventDefault;
  var ingredientInput = ingredientInputEl.value.trim();
  fetch(
    fetch(
      "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=" +
        ingredientInput
    ).then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Sorry please enter a different ingredient");
      }
    })
  );
});
