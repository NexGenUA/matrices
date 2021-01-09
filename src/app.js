const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const matrixRouter = require('./resources/matrix/matrix.router');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/matrix', matrixRouter);

module.exports = app;