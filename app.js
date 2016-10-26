const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// const netflix = require('./services/netflixRoulette');
// const recipe = require('./services/recipePuppy');

const homeRoute = require('./routes/index');
const generatorRoute = require('./routes/generator');
const savedRoute = require('./routes/saved');

const app = express();
const port = process.argv[2] || process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', homeRoute);
app.use('/generator', generatorRoute);
app.use('/saved', savedRoute);

app.listen(port, () => console.log('listening on port ', port));
