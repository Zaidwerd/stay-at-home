const fetch = require('node-fetch');

const recipePuppyURL = 'http://www.recipepuppy.com/api/';

function searchRecipe(req, res, next) {
  fetch(`${recipePuppyURL}?i=${req.query.ingredients}`)
  .then(r => r.json())
  .then((results) => {
    res.recipes = results;
    // console.log(res.recipes);
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { searchRecipe };
