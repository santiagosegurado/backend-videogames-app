const { Router } = require("express");
const { genreRouter } = require("./genre.routes");
const { videogameRouter } = require("./videogames.routes");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/genres", genreRouter);
router.use("/videogames", videogameRouter);

module.exports = router;
