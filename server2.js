const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/recipesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Recipe model
const Recipe = mongoose.model('Recipe', {
  title: String,
  ingredients: [String],
  instructions: String
});

// API Key
const apiKey = ' 40db974f836a4c99af3584081fbcdc5d';

// Get all recipes
app.get('/recipes', async (req, res, next) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/recipes?apiKey=${apiKey}`);
    const recipes = response.data;
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

// Get a specific recipe
app.get('/recipes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.spoonacular.com/recipes/recipes/${id}?apiKey=${apiKey}`);
    const recipe = response.data;
    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

// Create a new recipe
app.post('/recipes', async (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  });

  try {
    const response = await axios.post(`https://api.spoonacular.com/recipes/recipes?apiKey=${apiKey}`, recipe);
    const newRecipe = response.data;
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
});

// Update a recipe
app.patch('/recipes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.patch(`https://api.spoonacular.com/recipes/recipes/${id}?apiKey=${apiKey}`, req.body);
    const updatedRecipe = response.data;
    res.json(updatedRecipe);
  } catch (err) {
    next(err);
  }
});

// Delete a recipe
app.delete('/recipes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await axios.delete(`https://api.spoonacular.com/recipes/recipes/${id}?apiKey=${apiKey}`);
    res.json({ message: 'Deleted Recipe' });
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

