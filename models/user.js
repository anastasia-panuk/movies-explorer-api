const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');
const {
  EMAIL_VALIDATION_ERR_MESSAGE,
  AUTH_EMAIL_OR_PASSWORD_ERR_MESSAGE,
} = require('../utils/constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => EMAIL_VALIDATION_ERR_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    findUserByCredentials({ password, email }) {
      return this.findOne({ email })
        .select('+password')
        .then((userData) => {
          if (!userData) {
            throw new AuthorizationError(AUTH_EMAIL_OR_PASSWORD_ERR_MESSAGE);
          }
          return bcrypt.compare(password, userData.password)
            .then((isSuccess) => {
              if (!isSuccess) {
                throw new AuthorizationError(AUTH_EMAIL_OR_PASSWORD_ERR_MESSAGE);
              }

              const {
                password: removed,
                ...user
              } = userData.toObject();

              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
