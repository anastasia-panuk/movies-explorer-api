const { Joi, Segments, celebrate } = require('celebrate');

const { urlRegExp } = require('../utils/constants/constants');

module.exports.bodyMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    trailerLink: Joi.string().required().pattern(urlRegExp),
    image: Joi.string().required().pattern(urlRegExp),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(urlRegExp),
    movieId: Joi.number().required(),
  }),
});

module.exports.paramsMovie = celebrate({
  [Segments.PARAMS]: Joi.object({
    movieId: Joi.string().hex().length(24),
  }).required(),
});
