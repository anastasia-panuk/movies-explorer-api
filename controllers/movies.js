const Movie = require('../models/movies');
const HTTPError = require('../errors/HTTPError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  CREATED_STATUS,
  BAD_REQUEST_ERR_MESSAGE,
  NOT_FOUND_MOVIE_ERR_MESSAGE,
  CONFLICT_MOVIE_ERR_MESSAGE,
} = require('../utils/constants/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate([
      'owner',
    ])
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED_STATUS).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError(NOT_FOUND_MOVIE_ERR_MESSAGE);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(CONFLICT_MOVIE_ERR_MESSAGE);
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
        next(new BadRequestError(BAD_REQUEST_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};
