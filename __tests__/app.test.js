// Importing the function in test 
const { getRecipes, displayRecipes } = require('../scripts/app.js');

describe('Tests for App', () => {
  let resultsContainer;
  let searchForm;

beforeEach(() => {
  resultsContainer = global.document.createElement('div');
  resultsContainer.id = 'results';
  global.document.body.appendChild(resultsContainer);
  });

const mockElement = {
  innerHTML: '',
  dispatchEvent: jest.fn(),
'#search-form': { addEventListener: jest.fn() },
};

global.document.querySelector = selector => {
  if (selector == '#results') {
    return resultsContainer;
  }
  return mockElement;
};
// This mock HTML will be added to the document body
beforeEach(() => {
  mockElement.innerHTML = `
    <form id="search-form"></form>
    <input id="search-input" type="text">
    <div id="results"></div>
  `;
   searchForm = document.querySelector('#search-form');
   resultsContainer = document.querySelector('#results');
});

test('getRecipes is a function', () => {
  expect(typeof getRecipes).toBe('function');
});
// Test if getRecipes correctly fetches data from the API
test('getRecipes fetches data from API', () => {
  // Mock fetch and its response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ meals: [{ strMeal: 'Test Meal' }] }),
    })
  );

  // Call getRecipes
  getRecipes('test');

  // Check if fetch was called with the correct URL
  expect(global.fetch).toHaveBeenCalledWith(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=test'
  );
});

// Test if displayRecipes correctly creates HTML
test('displayRecipes creates correct HTML', () => {
  // Mock recipes data
  const recipes = [{ strMeal: 'Test Meal', strMealThumb: 'Test Image', strInstructions: 'Test Instructions' }];

  // Call displayRecipes
  displayRecipes(recipes);

  // Check if the results container's innerHTML was set correctly
  expect(resultsContainer.innerHTML).toContain('<h2>Test Meal</h2>');
});

test('form submission triggers getRecipes', () => {
  // Create a spy on the getRecipes function
  const getRecipesSpy = jest.spyOn({ getRecipes }, 'getRecipes');

  // Trigger the submit event on the mock search form
  mockElement['#search-form'].addEventListener.mock.calls[0][1]();

  // Check if getRecipes was called
  expect(getRecipesSpy).toHaveBeenCalled();
})
});