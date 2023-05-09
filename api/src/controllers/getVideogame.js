

const axios = require('axios');
const URL = "https://api.rawg.io/api/games"
const { DB_APIKEY } = process.env

const getAllVideogames = async (req, res) => {
  try {
    const {data} = await axios.get(`${URL}?key=${DB_APIKEY}`);

      const videogames = data.results.map(videogame => ({ 
      name: videogame.name,
      image: videogame.image,
      // description: videogame.description,
      // platform: videogame.platform,
      // released: videogame.released,
      // rating: videogame.rating
      }));
      return res.status(200).json(videogames);

  } catch (error) {
    return res.status(500).json({ message: error })        
  }
};


const getIdVideogame = async (req, res) => {
  try {
    const {id} = req.params;
    const {data} = await axios.get(`${URL}/${id}?key=${DB_APIKEY}`);

    if(!data.id) throw new Error (`ID not found`)

    const videogame = {
      name: data.name,
      description: data.description,
      platform: data.platform,
      image: data.image,
      released: data.released,
      rating: data.rating,
      genres: data.genres.map(genre => genre.name)
    };
    return res.status(200).json(videogame);

  } catch (error) {
    return error.message.includes('ID')
    ? res.status(404).send(error.message)
    : res.status(500).send(error.response.data.error)        
  }
};
//! Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.

// 📍 GET | /videogames/name?="..."
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
// Por nombre: "https://api.rawg.io/api/games?search={game}"

const getNameVideogame = async (req, res) => {
  try {
    const {slug} = req.query;
    const {data} = await axios.get(`${URL}?search=${slug}&key=${DB_APIKEY}`);

    if(!data.slug) throw new Error (`Videogame not found`)

    const videogame = {
      name: data.name,
      description: data.description,
      platform: data.platform,
      image: data.image,
      released: data.released,
      rating: data.rating,
      genres: data.genres.map(genre => genre.name)
    };
    return res.status(200).json(videogame);

  } catch (error) {
    return error.message.includes('ID')
    ? res.status(404).send(error.message)
    : res.status(500).send(error.response.data.error)        
  }
};


module.exports = {
  getAllVideogames,
  getIdVideogame,
}