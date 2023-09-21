// Select elements from the DOM
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results');
const apiKey = '40db974f836a4c99af3584081fbcdc5d';

// Event listener for the search form
if(searchForm) {
  searchForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const query = searchInput.value;

  getRecipes(query);
});
}
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var searchQuery
});
// Function to fetch recipes from the API
export function getRecipes(query) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => displayRecipes(data.results))
    .catch(error => console.error('Error:', error));
}

export function displayRecipes(recipes) {
  const resultsContainer = document.querySelector('#results');
  const html = recipes.map(recipe => {
    return `
      <div class="recipe">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h2>${recipe.title}</h2>
        <a href="${recipe.sourceUrl}">Go to Recipe</a>
      </div>
    `;
  }).join('');
  resultsContainer.innerHTML = html;
}