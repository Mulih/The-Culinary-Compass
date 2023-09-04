const express = require('express');
const mongoose = require('mongoose');
const axios =  require('axios');
const bodyParser = require('body-parser');
const apiKey = 'a31a26912771485a8c4e8fb0956c1f8c';
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://amuli:Navarro23@recipe-finder.huhcgnk.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Define a Mongoose Schema
const RecipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

app.use(bodyParser.json());

// Define Routes
app.get('/recipes', async (req, res, next) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        next(err);
    }
});

app.get('/recipes/:id', async (req, res, next) => {
    try {
        const recipe = await Recipe.findOne({_id: req.params.id});
        res.json(recipe);
    } catch (err) {
        next(err);
    }
});

app.post('/recipes', async (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    });

    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        next(err);
    }
});

app.patch('/recipes/:id', getRecipe, async (req, res, next) => {
    if (req.body.title != null) {
        res.recipe.title = req.body.title;
    }
    if (req.body.ingredients != null) {
        res.recipe.ingredients = req.body.ingredients;
    }
    if (req.body.instructions != null) {
        res.recipe.instructions = req.body.instructions;
    }
    try {
        const updatedRecipe = await res.recipe.save();
        res.json(updatedRecipe);
    } catch (err) {
        next(err);
    }
});

app.delete('/recipes/:id', getRecipe, async (req, res, next) => {
    try {
        await res.recipe.remove();
        res.json({ message: 'Deleted Recipe' });
    } catch (err) {
        next(err);
    }
});

async function getRecipe(req, res, next) {
    let recipe;
    try {
        recipe = await Recipe.findOne({_id: req.params.id});
        if (recipe == null) {
            return res.status(404).json({ message: 'Cannot find recipe' });
        }
    } catch (err) {
        return next(err);
    }

    res.recipe = recipe;
    next();
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

