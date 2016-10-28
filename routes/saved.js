const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { getSaved, addSaved, deleteSaved } = require('../models/savedDB');

router.get('/', authenticate, getSaved, (req, res) => {
  res.render('saved', {
    user: res.user,
    favorites: res.saved || [],
  });
});

router.post('/', authenticate, addSaved, (req, res) => {
  res.redirect('saved');
});

router.delete('/saved/:id', deleteSaved, (req, res) => {
  res.redirect('saved');
});

module.exports = router;
