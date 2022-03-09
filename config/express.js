const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const helmet = require('helmet');
const routes = require('../api/routes/v1');
const cors = require('cors');
const {logs} = require('./context');
// const strategies = require('./passport');
const error = require('../api/middlewares/error');

/*
@public
Express instance
*/

const app = express();

app.use(morgan(logs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(compress());
app.use(helmet());
app.use(cors());

// app.use(passport.initialize());
// passport.use('jwt',strategies.jwt);
// passport.use('facebook',strategies.facebook);
// passport.use('google',strategies.google);

app.use('/v1',routes);


app.use(error.handler);

module.exports = app;