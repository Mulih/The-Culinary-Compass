// Select elements from the DOM
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results');

// Event listener for the search form
if(searchForm) {
  searchForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const query = searchInput.value;

  getRecipes(query);
});
}

// Function to fetch recipes from the API
function getRecipes (query) {
  const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  fetch(API_URL)
    .then(response => response.json())
    .then(data => displayRecipes(data.meals))
    .catch(error => console.error('Error:', error));
}

// Function to display recipes in the DOM
function displayRecipes (recipes) {
  if (!recipes) {
    resultsContainer.innerHTML = '<p>No recipes found.</p>';
    return;
  }
  const html = recipes.map(recipe => {
    return `
            <div class="recipe">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <h2>${recipe.strMeal}</h2>
                <p>${recipe.strInstructions}</p>
            </div>
        `;
  }).join('');
  resultsContainer.innerHTML = html;
}

module.exports = { getRecipes, displayRecipes };