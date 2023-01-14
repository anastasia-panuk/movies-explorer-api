const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');

const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3002, DB_CONN = 'mongodb://localhost:27017/diploma', NODE_ENV } = process.env;

const app = express();

const config = dotenv.config({
  path: NODE_ENV === 'production' ? '.env' : '.env.common.env',
}).parsed;

const allowedURL = [
  'https://panuk.movie-explorer.nomoredomains.club',
  'https://api.panuk.movie-explorer.nomoredomains.club',
  'http://localhost:3002',
];

mongoose.connect(DB_CONN);

app.set('config', config);

app.use(cors({
  origin: allowedURL,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
