const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');

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
      message: () => 'Указан некорректный адрес почты',
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
            throw new AuthorizationError('Почта или пароль неверны');
          }
          return bcrypt.compare(password, userData.password)
            .then((isSuccess) => {
              if (!isSuccess) {
                throw new AuthorizationError('Почта или пароль неверны');
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
