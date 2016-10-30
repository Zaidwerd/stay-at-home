const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { getSaved, addSaved, deleteSaved, getEdit, editSaved } = require('../models/savedDB');

router.get('/', authenticate, getSaved, (req, res) => {
  res.render('saved', {
    user: res.user,
    favorites: res.saved || [],
    results: res.results || [],
  });
});

router.post('/', authenticate, addSaved, (req, res) => {
  res.redirect('/saved');
});

router.delete('/:id', deleteSaved, (req, res) => {
  res.redirect('/saved');
});

router.get('/edit/:id', getEdit, (req, res) => {
  res.render('edit', {
    obj: res.obj,
  });
});

router.put('/:id', editSaved, (req, res) => {
  res.redirect('/saved');
});

module.exports = router;
