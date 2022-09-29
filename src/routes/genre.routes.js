const { Router } = require('express');
const { getGenres } = require('../controllers/genre.controller');
const genreRouter = Router();



genreRouter.get('/', getGenres)


module.exports = {
  genreRouter
}