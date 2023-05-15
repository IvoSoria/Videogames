const axios = require('axios');
const { DB_APIKEY, URL_API } = process.env
const {Videogame, Genre} = require("../db")


const getVideogames = async (req, res) => {

  const { name } = req.query;
  
  if (name){
    try {
      const slug = name.toLowerCase().replace(/ /g, "-");

      const dbNameVideogames = await Videogame.findAll({ where: { name : name }});

      const {data} = await axios.get(`${URL_API}?search=${slug}&key=${DB_APIKEY}`);

      const apiNameVideogames = data.results.map(videogame => ({ 
          
        name: videogame.name,
        image: videogame.image,
        description: videogame.description,
        platform: videogame.platform,
        released: videogame.released,
        rating: videogame.rating,
        created: false,
      }));

      const allNameVideogames = [...dbNameVideogames, ...apiNameVideogames];
      const results = allNameVideogames.slice(0,15);

      results.length === 0 
      ? res.status(404).send("I'm sorry if I couldn't find any video games")
      : res.status(200).json(results);


    } catch (error) {
       res.status(500).json({ error: error.message }) 
      }
    }  
  
  else {
      try {
        const databaseVideogames = await Videogame.findAll();
        
        const {data} = await axios.get(`${URL_API}?key=${DB_APIKEY}`);
        
        const apiVideogames = data.results.map(videogame => ({ 
          
          name: videogame.name,
          image: videogame.image,
          description: videogame.description,
          platform: videogame.platform,
          released: videogame.released,
          rating: videogame.rating,
          created: false,
        }));

          const allVideogames = [...databaseVideogames, ...apiVideogames]
          return res.status(200).json(allVideogames);
          
        } catch (error) {
        return res.status(400).json({ error: error.message })        
        }
  }
}



const getIdVideogame = async (req, res) => {
  const {id} = req.params;
  const source = isNaN(id) ? "db" : "api";

  try {
    if (source === "api") {     

      const {data} = await axios.get(`${URL_API}/${id}?key=${DB_APIKEY}`) 
      if(!data.id) throw new Error (`ID not found`)

      const videogame = {
        id: data.id,
        name: data.name,
        description: data.description,
        platform: data.platform,
        image: data.image,
        released: data.released,
        rating: data.rating,
        genres: data.genres.map(genre => genre.name)
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
    : res.status(500).send(error.response.data.error)        
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

