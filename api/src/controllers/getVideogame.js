const axios = require('axios');
const { DB_APIKEY, URL_API } = process.env
const {Videogame, Genre} = require("../db")


const getVideogames = async (req, res) => {

  const { name } = req.query;

      try {
        const databaseVideogames = await Videogame.findAll();
        
        // const {data} = await axios.get(`${URL_API}?key=${DB_APIKEY}&page_size=100`);
        const {data} = await axios.get(`https://api.rawg.io/api/games?key=10732d7389cd48fe80aac0e9e3bfa761&page_size=100`);
        
        const apiVideogames = data.results.map(videogame => ({ 
          
          name: videogame.name,
          id: videogame.id,
          image: videogame.background_image,
          // description: videogame.description,
          // platform: videogame.platforms.map(platform => platform.platform.name),
          // released: videogame.released,
          // rating: videogame.rating,
          genre: videogame.genres.map(genre => genre.name),
          created: false,
        }));

          const allVideogames = [...databaseVideogames, ...apiVideogames]

          if (name) {const filteredVideogame= allVideogames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))

            return res.status(200).json(filteredVideogame.slice(0,15)); 
          }
          else {
          return res.status(200).json(allVideogames);
          }

        } catch (error) {
        return res.status(400).json({ error: error.message })        
        }
  }


// 📍 GET | /videogames/:idVideogame
// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.

const getIdVideogame = async (req, res) => {
  const {id} = req.params;
  const source = isNaN(id) ? "db" : "api";

  try {
    if (source === "api") {     

      const {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=10732d7389cd48fe80aac0e9e3bfa761`) 
      // const {data} = await axios.get(`${URL_API}/${id}?key=${DB_APIKEY}`) 
      if(!data.id) throw new Error (`ID not found`)

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
    else{      
      const bdVideogame = await Videogame.findByPk(id,
        {include: {model: Genre,
           through: {attributes: [] }}});

      if(!bdVideogame) throw new Error (`ID not found`)

      return res.status(200).json(bdVideogame);
    }

  } catch (error) {
    return error.message.includes('ID')
    ? res.status(404).send(error.message)
    : res.status(500).send(error)        
  }
};

// 📍 POST | /videogames
// Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).

const postVideogame = async (req, res) => {
    
  try {
    const { name, description, platform, image, released,rating, genres } = req.body;

    const createdVideogame = await Videogame.create({
      name: name,
      description: description,
      platform: platform,
      image: image,
      released: released,
      rating: rating,
      createdInDb: true, 
    });

    if (genres.length > 0) {
      await createdVideogame.addGenres(genres);
    }

    res.status(200).json(createdVideogame);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getVideogames,
  getIdVideogame,
  postVideogame,
}

