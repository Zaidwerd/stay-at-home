const router = require('express').Router();
const { searchMovies } = require('../services/netflixRoulette');

router.get('/', searchMovies, (req, res) => {
  res.render('generator', {
    movies: res.movies,
  });
});

module.exports = router;
