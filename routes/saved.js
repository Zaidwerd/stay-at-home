const router = require('express').Router();
const dbService = require('../models/savedDB');

router.get('/', dbService.getSaved, (req, res) => {
  res.render('saved', {
    favorites: res.saved || [],
  });
});

router.post('/', dbService.addSaved, (req, res) => {
  res.redirect('saved');
});

router.delete('/saved/:id', dbService.deleteSaved, (req, res) => {
  res.redirect('saved');
});

module.exports = router;
