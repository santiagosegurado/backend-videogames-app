const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { getVideogame } = require("../helpers/getVideogame");
const { getVideogamesRAWG } = require("../helpers/getVideogames");
const { getVideogamesByQuery } = require("../helpers/getVideogamesByQuery");

// POST
const createNewVideogame = async (req, res) => {
  const { genres } = req.body;

  try {
    const newGame = await Videogame.create(req.body);

    const genresFind = await Genre.findAll({
      where: {
        name: genres,
      },
    });

    newGame.addGenres(genresFind);

    res.json({
      ok: true,
      newGame,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Data Base Error",
    });
  }
};

// GET Obtener Todos
const getAllVideogame = async (req, res) => {
  const search = req.query.search;

  if (search) {
    try {
      const videogamesFind = await getVideogamesByQuery(search);

      const videogamesFindDB = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        include: Genre
      });

      const allVideogameFinds = videogamesFindDB.concat(videogamesFind);

      return res.json({
        ok: true,
        videogames: allVideogameFinds,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Data Base Error",
      });
    }
  }



  try {
    const videogameRAWG = await getVideogamesRAWG();
    const videogameDB = await Videogame.findAll({
      include: Genre
    });
    const allVideogame = videogameDB.concat(videogameRAWG);

    res.status(200).json({
      ok: true,
      videogames: allVideogame,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Data Base Error",
    });
  }
};

// Get by Id
const getVideogameById = async (req, res) => {
  const id = req.params.id;

  try {
    if (id.length < 30) {
      const videogame = await getVideogame(id);
      return res.json({
        ok: true,
        videogame,
      });
    } else if (id.length > 30) {
      const videogame = await Videogame.findByPk(id,{
        include: Genre
      });
      return res.json({
        ok: true,
        videogame,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Data Base Error",
    });
  }
};

module.exports = {
  createNewVideogame,
  getAllVideogame,
  getVideogameById,
};
