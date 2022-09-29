const axios = require("axios");

const getVideogamesByQuery = async (search) => {
  const resp = await axios(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${search}`
  );

  

  return resp.data.results;
};


module.exports = {
  getVideogamesByQuery
};