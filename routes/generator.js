const router = require('express').Router();
const { searchMovies } = require('../services/netflixRoulette');
const { searchRecipe } = require('../services/recipePuppy');
const dbService = require('../models/savedDB');

router.get('/', searchMovies, searchRecipe, (req, res) => {
  res.render('generator', {
    movies: res.movies,
    recipe: res.recipes.results,
  });
});

module.exports = router;
