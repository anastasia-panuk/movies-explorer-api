const {
  INTERNAL_SERVER_ERR,
  INTERNAL_SERVER_ERR_MESSAGE,
} = require('../utils/constants/constants');

module.exports.errorHandler = ((err, req, res, next) => {
  const status = err.statusCode || INTERNAL_SERVER_ERR;
  const message = status === INTERNAL_SERVER_ERR ? INTERNAL_SERVER_ERR_MESSAGE : err.message;
  res.status(status).send({ message });
  next();
});
