const fetch = require('node-fetch');

const recipePuppyURL = 'http://www.recipepuppy.com/api/';

function searchRecipe(req, res, next) {
  fetch(`${recipePuppyURL}q=${req.query.ingredients}`)
  .then(r => r.json())
  .then((results) => {
    res.recipe = results;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { searchRecipe };
