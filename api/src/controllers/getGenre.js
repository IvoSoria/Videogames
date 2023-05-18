const axios = require('axios');
const { DB_APIKEY, URL_API_GEN } = process.env
const { Genre } = require("../db")

// 📍 GET | /genres
// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

const getGenres = async (req, res) => {
    try {
        const { data } = await axios.get(`${URL_API_GEN}?key=${DB_APIKEY}`);

        const apiGenres = data.results.map(genre => ({
            name: genre.name,
            id: genre.id,
        }));

        const databaseGenres = await Promise.all(
            apiGenres.map(async genre => {
                const [dbGenre] = await Genre.findOrCreate({
                    where: { id: genre.id },
                    defaults: {
                        name: genre.name
                    },
                });
                return dbGenre
            })
        );

        res.status(200).json(databaseGenres);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getGenres;


