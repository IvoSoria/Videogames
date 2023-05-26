const axios = require('axios');
const { DB_APIKEY, URL_API } = process.env
const { Videogame, Genre } = require("../db")


const getVideogames = async (req, res) => {
  const { name } = req.query;

  try {
    const databaseVideogames = await Videogame.findAll(
      { include: [{ model: Genre, attributes: ['name'], through: { attributes: [] } }] })

    const modifiedVideogames = databaseVideogames.map(vg => {
      const genres = vg.genres.map(gen => gen.name);
      return {
        genres: genres, id: vg.id, name: vg.name, platform: vg.platform, released: vg.released,
        rating: vg.rating, image: vg.image, created: vg.created, description: vg.description
      };
    });

    const pagesToFetch = 5;
    const apiVideogames = [];
    const URL = "https://api.rawg.io/api/games?key=10732d7389cd48fe80aac0e9e3bfa761"
    // const URL = `${URL_API}?key=${URL_API} `

    for (let page = 1; page <= pagesToFetch; page++) {
      const { data } = await axios.get(`${URL}&page=${page}`);

      const results = data.results.map(videogame => ({

        name: videogame.name,
        id: videogame.id,
        image: videogame.background_image,
        // description: videogame.description,
        platform: videogame.platforms.map(platform => platform.platform.name),
        // released: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres.map(genre => genre.name),
        created: false,
      }));

      apiVideogames.push(...results);
    }

    const allVideogames = [...modifiedVideogames, ...apiVideogames]

    if (name) {
      const filteredVideogame = allVideogames.filter(
        game => game.name.toLowerCase().includes(name.toLowerCase()))

      return res.status(200).json(filteredVideogame.slice(0, 15));
    }
    else {
      return res.status(200).json(allVideogames);
    }

  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}


const getIdVideogame = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";

  try {
    if (source === "api") {

      const { data } = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=10732d7389cd48fe80aac0e9e3bfa761`)
      // const {data} = await axios.get(`${URL_API}/${id}?key=${DB_APIKEY}`) 
      if (!data.id) throw new Error(`ID not found`)

      const videogame = {
        name: data.name,
        id: data.id,
        image: data.background_image,
        description: data.description,
        platform: data.platforms.map(platform => platform.platform.name),
        released: data.released,
        rating: data.rating,
        genres: data.genres.map(genre => genre.name),
        created: false,
      };
      return res.status(200).json(videogame);
    }
    else {
      const bdVideogame = await Videogame.findByPk(id, {
        include: [{ model: Genre, attributes: ['name'], through: { attributes: [] } }]
      })

      if (!bdVideogame) throw new Error(`ID not found`)

      const vgBd = {
        name: bdVideogame.name,
        id: bdVideogame.id,
        image: bdVideogame.image,
        description: bdVideogame.description,
        platform: bdVideogame.platform,
        released: bdVideogame.released,
        rating: bdVideogame.rating,
        genres: bdVideogame.genres.map(genre => genre.name),
      };
      return res.status(200).json(vgBd);
    }
  } catch (error) {
    return error.message.includes('ID')
      ? res.status(404).send(error.message)
      : res.status(500).send(error)
  }
};


const postVideogame = async (req, res) => {

  try {
    const { name, description, platforms, image, released, rating, genres } = req.body;

    const createdVideogame = await Videogame.create({
      name: name,
      description: description,
      platform: platforms,
      image: image,
      released: released,
      rating: rating,
      createdInDb: true,
    });

    if (genres.length > 0) {
      await createdVideogame.addGenres(genres);
    }
    res.status(200).json(createdVideogame);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getVideogames,
  getIdVideogame,
  postVideogame,
}

