const router = require('express').Router();

// This is the route that serves your '/' homepage
router.get('/', (req, res) => {
  res.render('index');
});

// This route serves your `/login` form
router.get('/login', (req, res) => {
  res.render('login');
});

// This route serves your `/signup` form
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
