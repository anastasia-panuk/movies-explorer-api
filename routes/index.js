const router = require('express').Router();
const { NOT_FOUND_ROUTE_MESSAGE } = require('../utils/constants/constants');

const auth = require('../middlewares/auth');

const {
  login,
  createUser,
} = require('../controllers/users');
const { bodyUser, bodyAuth } = require('../validators/user');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', bodyAuth, login);
router.post('/signup', bodyUser, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ROUTE_MESSAGE));
});

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

module.exports = router;
