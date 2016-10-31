const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { getSaved, addSaved, deleteSaved, getEdit, editSaved } = require('../models/savedDB');

// serves '/saved' to grab saved data
router.get('/', authenticate, getSaved, (req, res) => {
  // console.log(res.user);
  res.render('saved', {
    user: res.user,
    favorites: res.saved || [],
    results: res.results || [],
  });
});

// serves '/saved' to add object to saved collection
router.post('/', authenticate, addSaved, (req, res) => {
  res.redirect('/saved');
});

// serves '/saved' to delete object from collection
router.delete('/:id', deleteSaved, (req, res) => {
  res.redirect('/saved');
});

// serves '/edit' to grab and render saved object from collection by id
router.get('/edit/:id', getEdit, (req, res) => {
  res.render('edit', {
    obj: res.obj,
  });
});

// serves '/edit' to save edited data into database
router.put('/:id', editSaved, (req, res) => {
  res.redirect('/saved');
});

module.exports = router;
