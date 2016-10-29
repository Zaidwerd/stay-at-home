const router = require('express').Router();
const { getEdit, editSaved } = require('../models/savedDB');

router.get('/:id', getEdit, (req, res) => {
  res.render('edit', {
    obj: res.obj,
  });
});

router.put('/:id', editSaved, (req, res) => {
  res.redirect('/saved');
});

module.exports = router;
