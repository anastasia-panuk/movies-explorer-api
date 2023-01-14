const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const {
  CREATED_STATUS,
  UNIQUE_ERR,
  BAD_REQUEST_ERR_MESSAGE,
  NOT_FOUND_USER_ERR_MESSAGE,
  CONFLICT_EMAIL_ERR_MESSAGE,
} = require('../utils/constants/constants');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((userData) => {
      const { password: removed, ...user } = userData.toObject();
      res.status(CREATED_STATUS).send(user);
    })
    .catch((err) => {
      if (err.code === UNIQUE_ERR) {
        next(new ConflictError(CONFLICT_EMAIL_ERR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => User.findUserByCredentials(req.body)
  .then((user) => {
    const { JWT_SECRET } = req.app.get('config');
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.send({ token });
  })
  .catch((err) => {
    next(err);
  });

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER_ERR_MESSAGE);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER_ERR_MESSAGE);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === UNIQUE_ERR) {
        next(new ConflictError(CONFLICT_EMAIL_ERR_MESSAGE));
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};
