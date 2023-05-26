const axios = require('axios');
const { DB_APIKEY, URL_API_GEN } = process.env
const { Genre } = require("../db")


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


