const router = require('express').Router();
const { searchMovies } = require('../services/netflixRoulette');
const { searchRecipe } = require('../services/recipePuppy');
const { authenticate } = require('../lib/auth');

// Serves '/generator' to search for movies and recipes
router.get('/', authenticate, searchMovies, searchRecipe, (req, res) => {
  res.render('generator', {
    user: res.user,
    movies: res.movies || [],
    recipe: res.recipes.results || [],
  });
});

module.exports = router;

