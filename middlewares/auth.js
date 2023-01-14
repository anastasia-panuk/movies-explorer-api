const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/AuthorizationError');

const { AUTH_ERR_MESSAGE } = require('../utils/constants/constants');

module.exports = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization) {
    throw new AuthorizationError(AUTH_ERR_MESSAGE);
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    const { JWT_SECRET } = req.app.get('config');
    let payload;
    try {
      payload = jwt.verify(
        token,
        JWT_SECRET,
      );
    } catch (err) {
      throw new AuthorizationError(AUTH_ERR_MESSAGE);
    }

    req.user = payload;

    next();
  }
};
