const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  paramsMovie,
  bodyMovie,
} = require('../validators/movies');

router.get('/', getMovies);
router.delete('/:movieId', paramsMovie, deleteMovie);
router.post('/', bodyMovie, createMovie);

module.exports = router;
