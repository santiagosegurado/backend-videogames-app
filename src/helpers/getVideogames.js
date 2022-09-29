const axios = require('axios'); 



const getVideogamesRAWG = async () => {
  var newArray = [];

  for (let i = 0; i < 5; i++) {
    const resp = await axios.get(
      `https://api.rawg.io/api/games?key=${
        process.env.API_KEY
      }&page=${i + 1}`
    );

    newArray.push(
      resp.data.results.map((g) => ({
        id: g.id,
        name: g.name,
        img: g.background_image,
        rating: g.metacritic,
        genres: g.genres.map((g) => g.name),
        platforms: g.parent_platforms.map((p) => p.platform.name),
        release_date: g.released
      }))
    );
  }

  // const resp1 = await axios
  //   .get(`https://api.rawg.io/api/games?key=3021004ee9304d84aad08edd5c559b38`)
  //   .then((resp) => resp.data.results);

  // const resp2 = await axios
  //   .get(
  //     `https://api.rawg.io/api/games?key=3021004ee9304d84aad08edd5c559b38&page=2`
  //   )
  //   .then((resp) => resp.data.results);

  // const resp3 = await axios
  //   .get(
  //     `https://api.rawg.io/api/games?key=3021004ee9304d84aad08edd5c559b38&page=3`
  //   )
  //   .then((resp) => resp.data.results);

  // const resp4 = await axios
  //   .get(
  //     `https://api.rawg.io/api/games?key=3021004ee9304d84aad08edd5c559b38&page=4`
  //   )
  //   .then((resp) => resp.data.results);

  // const resp5 = await axios
  //   .get(
  //     `https://api.rawg.io/api/games?key=3021004ee9304d84aad08edd5c559b38&page=5`
  //   )
  //   .then((resp) => resp.data.results);

  // const respuesta = await Promise.all([resp1, resp2, resp3, resp4, resp5]);

  // const respuesta2 = respuesta.flat().map((resp) => ({
  //   id: resp.id,
  //   name: resp.name,
  //   img: resp.background_image,
  //   metacritic: resp.metacritic,
  //   genres: resp.genres.map((g) => g.name),
  //   platforms: resp.parent_platforms.map((p) => p.platform.name),
  // }));

  return newArray.flat();
};


module.exports = {
  getVideogamesRAWG
}