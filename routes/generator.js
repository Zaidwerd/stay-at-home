const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('generator');
});

module.exports = router;
