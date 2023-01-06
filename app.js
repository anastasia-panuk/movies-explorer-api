const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const {
  INTERNAL_SERVER_ERR,
} = require('./utils/constants/constants');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');
const {
  login,
  createUser,
} = require('./controllers/users');
const { bodyUser, bodyAuth } = require('./validators/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3002, DB_CONN = 'mongodb://localhost:27017/diploma' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(DB_CONN);

app.use(requestLogger);

app.post('/signin', bodyAuth, login);
app.post('/signup', bodyUser, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const status = err.statusCode || INTERNAL_SERVER_ERR;
  const message = status === INTERNAL_SERVER_ERR ? err.message : err.message;
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
