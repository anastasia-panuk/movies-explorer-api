module.exports.CREATED_STATUS = 201;

module.exports.BAD_REQUEST_ERR = 400;
module.exports.UNAUTHORIZED_ERR = 401;
module.exports.FORBIDDEN_ERR = 403;
module.exports.NOT_FOUND_ERR = 404;
module.exports.CONFLICT_ERR = 409;

module.exports.INTERNAL_SERVER_ERR = 500;

module.exports.UNIQUE_ERR = 11000;

module.exports.AUTH_ERR_MESSAGE = 'Необходима авторизация';
module.exports.AUTH_EMAIL_OR_PASSWORD_ERR_MESSAGE = 'Почта или пароль неверны';
module.exports.INTERNAL_SERVER_ERR_MESSAGE = 'Ошибка сервера';
module.exports.BAD_REQUEST_ERR_MESSAGE = 'Переданы некорректные данные';
module.exports.NOT_FOUND_USER_ERR_MESSAGE = 'Пользователь не найден';
module.exports.CONFLICT_EMAIL_ERR_MESSAGE = 'Пользователь с таким email уже зарегистрирован';
module.exports.CONFLICT_MOVIE_ERR_MESSAGE = 'Недостаточно прав для удаления фильма';
module.exports.NOT_FOUND_MOVIE_ERR_MESSAGE = 'Фильм не найден';
module.exports.NOT_FOUND_ROUTE_MESSAGE = 'Страница не найдена';

module.exports.URL_VALIDATION_ERR_MESSAGE = 'Некорректный формат ссылки';
module.exports.EMAIL_VALIDATION_ERR_MESSAGE = 'Некорректный адрес почты';

module.exports.urlRegExp = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
