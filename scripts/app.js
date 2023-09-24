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

    // Store the search query in the session storage
    sessionStorage.setItem('query', query);

    // Navigate to the results.html page
    window.location.href = 'results.html';
  });
}

// Function to fetch recipes from the API
export function getRecipes(query) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => displayRecipes(data.results))
    .catch(error => console.error('Error:', error));
}

export function displayRecipes(recipes) {
  const resultsContainer = document.querySelector('#results');
  if (resultsContainer) {
    const html = recipes.map(recipe => {
      let recipeLink = `<a href="recipe.html?id=${recipe.id}">Go to Recipe</a>`;
      return `
        <div class="recipe">
          <img src="${recipe.image}" alt="${recipe.title}">
          <h2>${recipe.title}</h2>
          ${recipeLink}
        </div>
      `;
    }).join('');
    resultsContainer.innerHTML = html;
  }
}

// Get the search query from the session storage
const query = sessionStorage.getItem('query');

// Fetch and display the recipes
if (query) {
  getRecipes(query);
}