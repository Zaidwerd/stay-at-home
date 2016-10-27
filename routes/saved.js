const router = require('express').Router();
const dbService = require('../models/savedDB');

router.post('/', dbService.getSaved, dbService.addSaved, (req, res) => {
  res.render('saved', {
    favorites: res.saved,
  });
});

router.delete('/saved/:id', dbService.deleteSaved, (req, res) => {
  res.redirect('/saved');
})

module.exports = router;
