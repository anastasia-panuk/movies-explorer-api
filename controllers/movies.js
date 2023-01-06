const Movie = require('../models/movies');
const HTTPError = require('../errors/HTTPError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CREATED_STATUS } = require('../utils/constants/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate([
      'owner',
    ])
    .then((movies) => res.send(movies))
    .catch(() => {
      next(new ServerError('Ошибка сервера.'));
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED_STATUS).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: 'Переданы некорректные данные при создании фильма.' }));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError('Фильм с указанным _id не найдена.');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления фильма.');
      } else {
        movie.remove()
          .then(() => res.send(movie))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        next(err);
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные фильма.'));
      } else {
        next(err);
      }
    });
};
