const { default: axios } = require("axios");





const getVideogame = async(id) => {

  const resp = await axios(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`);

  
  return resp.data;
};


module.exports = {
  getVideogame
};