const mongoose = require('mongoose');

const { urlRegExp } = require('../utils/constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => (urlRegExp).test(v),
      message: () => 'Некорректный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => (urlRegExp).test(v),
      message: () => 'Некорректный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => (urlRegExp).test(v),
      message: () => 'Некорректный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
