const { Joi, Segments, celebrate } = require('celebrate');

module.exports.bodyUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.bodyAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.bodyMe = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});
