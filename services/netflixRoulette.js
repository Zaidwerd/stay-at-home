const fetch = require('node-fetch');

const netflixURL = 'http://netflixroulette.net/api/api.php?';

// Search Movies from Netfilx Roulette API
function searchMovies(req, res, next) {
  // Filter movies by actor
  fetch(`${netflixURL}actor=${req.query.show_cast}`)
  .then(r => r.json())
  .then((results) => {
    res.movies = results;
    // console.log(res.movies);
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { searchMovies };
