const { Genre } = require("../db");

const getGenres = async (req, res) => {
  
  try {
    const genres = await Genre.findAll();
    
    res.status(200).json({
      ok: true,
      genres
    });

  } catch (error) {
    res.status(500).send({
      ok: false,
      msg: "Something went wrong when returning the genres"
    });
  }
};

module.exports = {
  getGenres,
};
