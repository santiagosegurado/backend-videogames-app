const { Router } = require('express');
const { createNewVideogame, getAllVideogame, getVideogameById } = require('../controllers/videogame.controller');
const videogameRouter = Router();
const { body } = require('express-validator');
const { isValidNumber } = require('../helpers/isValidNumeber');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar_campos');

// Ruta POST crear
videogameRouter.post('/',[
  body("name", "Name is a required field")
      .exists({checkFalsy:true})
      .isLength({min: 2}).withMessage("The minimum number of characters is 2")
      .isLength({max:50}).withMessage("The maximum number of characters is 50"),
  body("release_date", "Release date is a required field")
      .exists({checkFalsy:true})
      .custom(isDate),
  body("rating", "Rating is a required field")
      .exists({checkFalsy:true})
      .custom(isValidNumber).withMessage("The rating must be between 1 and 100"),
  body("platforms", "Platforms is a required field")
      .isLength({min:1})
      .isArray(),
  body("genres", "Genres is a required field")
      .isLength({min:1})
      .isArray(),
  validarCampos
], createNewVideogame)

// Ruta Get obtener todos
videogameRouter.get('/', getAllVideogame);


// Ruta Get obtener por id
videogameRouter.get('/:id', getVideogameById);

module.exports = {
  videogameRouter
}
