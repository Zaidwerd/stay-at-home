/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

// New Comment

const express         = require('express');
const logger          = require('morgan');
const path            = require('path');
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const dotEnv          = require('dotenv').config({ silent: true });
const session         = require('express-session');
const cookieParser    = require('cookie-parser');


// const netflix = require('./services/netflixRoulette');
// const recipe = require('./services/recipePuppy');

const homeRoute       = require('./routes/index');
const generatorRoute  = require('./routes/generator');
const savedRoute      = require('./routes/saved');
const authRoute       = require('./routes/auth');
const usersRoute      = require('./routes/users');
// const editRoute       = require('./routes/edit');

const app             = express();
const port            = process.env.PORT || 3000;
const SECRET          = 'tacos3000';

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET,
}));


app.use('/', homeRoute);
app.use('/generator', generatorRoute);
app.use('/saved', savedRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);
// app.use('/edit', editRoute);

app.listen(port, () => console.log('listening on port ', port));
