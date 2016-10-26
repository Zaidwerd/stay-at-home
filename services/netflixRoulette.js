const fetch = require('node-fetch');

const netflixURL = 'http://netflixroulette.net/api/api.php?';

function searchMovies(req, res, next) {
  fetch(`${netflixURL}actor={req.query.show_cast}`)
  .then(r => r.json())
  .then((results) => {
    res.movies = results;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { searchMovies };
